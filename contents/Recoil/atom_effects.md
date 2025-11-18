---
date: '2023-05-15'
title: '[Recoil] Atom Effects를 활용하여 상태를 LocalStorage에 동기화 시키기'
categories: ['Recoil']
summary: '장바구니 미션에서 Atom Effects 사용기'
thumbnail: '../image/recoil.png'
---

장바구니 미션을 하면서 장바구니에 담겨있는 품목의 수량을 저장하기 위해 localStorage를 사용했는데, 컴포넌트 내에서 `useEffect`를 사용해 `cartList` 상태가 업데이트 되면 localStorage 데이터도 업데이트 시켜주는 방식으로 구현했었다.

<br>

`cartList`를 `Recoil Atom`으로 관리해주고 있었고, `Atom`으로 관리되고 있다면,  `Atom Effects`를 사용하여 로컬스토리지와 동기화시킬 수 있다해서 `Atom Effect`를 사용하는 방식으로 로직을 바꿨다. 그리고 동기화 된 `cartList` 상태에 관련된 로직들을 `useCartList`란 Hook으로 분리하였다.

<br>

어떻게 변경했는지 코드와 함께 이야기 해보겠다.

## Atom Effects

설명하기 전 Atom Effects에 대해 간략히 설명하겠다.

Recoil 공식 문서를 보면 다음과 같이 설명되어있다.

> Atom Effects는 부수효과를 관리하고 Recoil의 atom을 초기화 또는 동기화하기 위한 API다.

> Atom Effects는 atom 정의의 일부로 정의되므로 각 atom은 자체적인 정책들을 지정하고 구성할 수 있다.

> Atom Effects는 effects 옵션을 통해 atoms에 연결되어있다. 각 atom이 초기화 될 때 우선 순위에 따라 호출되는 atom effect 함수들의 배열을 참조할 수 있다.

설명을 보아하니 atom으로 관리하는 상태가 update될 시 effects 옵션 배열에 함수를 넣어주면 그 함수가 실행되는 것 같다.

## 기존 코드

```tsx
/* ProductItem.tsx */

const ProductItem = ({ product }: { product: Product }) => {
  const { localStorageData, internalSetLocalStorageData } = useLocalStorage<CartItem[]>(
    'cartList',
    [],
  );
  
  const [quantity, setQuantity] = useState<number>(
    localStorageData.find((data) => data.product.id === product.id)?.quantity ?? 0,
  );

  const [cartList, setCartList] = useRecoilState(cartListState);
  
  // 내부 로직 생략
  .
  .
  .
  
  useEffect(() => {
    if (quantity !== 0) {
      updateCartList();
      return;
    }
    deleteCartItem();
  }, [quantity]);

  useEffect(() => {
    internalSetLocalStorageData(cartList);
  }, [cartList]);
  
    
  return ...
```

위에 보다시피 `cartList`에 관련된 로직이 `ProductItem`내부에 있고, 컴포넌트 내부에서 `useEffect`를 사용하여 로컬스토리지 데이터를 업데이트 시켜주고있다.

<br>

이제 `Atom Effects`를 사용하여 `cartList` 상태를 로컬스토리지와 동기화 되도록 만들어보자. 

## 변경된 코드

atom을 localStorage와 동기화 시키는 코드는 다음과 같다.

```ts
/* atom.ts */

import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';
import type { CartItem } from '../types/types';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartListState = atom<CartItem[]>({
  key: 'cartLists',
  default: [],
  effects: [localStorageEffect<CartItem[]>('cartList')],
});
```

이제 `cartListState`와 로컬스토리지에서 `cartList`란 key의 value가 동기화 되었다.

<br>

기존 `ProductItem` 컴포넌트에서 `cartList`와 관련된 로직들을 Hook으로 분리해보자.
``` ts
/* useCartList.ts */

import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import type { CartItem, Product } from '../types/types';
import { cartListState } from '../store/atom';

const useCartList = (product: Product) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const existItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === product.id);

  const [quantity, setQuantity] = useState<number>(
    existItemIndex !== -1 ? cartList[existItemIndex].quantity : 0,
  );

  // 내부 로직 생략
  .
  .
  .
  
  useEffect(() => {
    if (quantity !== 0) {
      updateCartList();
      return;
    }
    deleteCartItem();
  }, [quantity]);

  return { quantity, setQuantity };
};

```

이 Hook을 `ProductItem` 컴포넌트에 사용해보자.
```ts
/* ProductItem.tsx */

import { CartIcon } from '../../assets';
import type { Product } from '../../types/types';
import { Text } from '../common/Text/Text';
import InputStepper from '../common/InputStepper/InputStepper';
import useCartList from '../../hooks/useCartList';

const ProductItem = ({ product }: { product: Product }) => {
  const { quantity, setQuantity } = useCartList(product);

  const handleOnClickToCartIcon = () => {
    setQuantity(1);
  };

  const handleSetQuantityOnInputStepper = (value: number) => {
    setQuantity(value);
  };

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smallest" weight="light" color="#333333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333333" lineHeight="33px">
            {product.price} 원
          </Text>
        </ProductTextWrapper>
        {quantity === 0 ? (
          <CartIcon
            width={25}
            height={22}
            fill="#AAAAAA"
            style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}
            onClick={handleOnClickToCartIcon}
          />
        ) : (
          <InputStepper
            size="small"
            quantity={quantity}
            setQuantity={handleSetQuantityOnInputStepper}
          />
        )}
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

```

## 정리

- `Atom Effects`를 사용한다면 Recoil로 관리되는 Atom들의 부수적인 효과들을 Atom 자체 내에서 관리할 수 있다.
- Recoil로 관리되는 상태들은 Recoil에서 제공하는 API를 최대한 활용하여 관리해보자.

## 참고

- https://recoiljs.org/ko/docs/guides/atom-effects
