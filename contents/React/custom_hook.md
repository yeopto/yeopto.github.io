---
date: '2023-04-17'
title: '[React] Custom Hook을 적용해보자'
categories: ['React']
summary: '점심 뭐 먹지 미션 Custom Hook 적용기'
thumbnail: '../image/react.png'
---


# 일단 Hook의 등장배경을 알아보자

Hook이 도입되기 전에는 생명주기 메서드, 렌더링 로직, 상태 관리 등을 클래스 한 곳에 모아 컴포넌트를 만들었다.
작은 규모의 어플리케이션에서는 문제가 없었지만, 규모가 큰 애플리케이션에서는 코드의 재사용성이 떨어질 수 밖에 없다.

### 클래스 컴포넌트가 코드 재사용성이 떨어지는 이유는 이러하다.

1. 클래스 컴포넌트는 상속을 사용하여 구현하기 때문이다. 상속은 기본적으로 부모 클래스의 코드를 자식 클래스로 복사하여 재사용하는 방식으로 동작한다. 이러한 방식은 클래스간의 강한 결합성을 유발하기에 코드의 재사용성이 제한될 수 있다.
2. 클래스 컴포넌트에서는 클래스 내부에 있는 라이프사이클 메서드를 사용하여 컴포넌트의 동작을 제어한다. 라이프사이클 메서드는 컴포넌트 내부에서만 사용 가능하기때문에 다른 컴포넌트에서 재사용하기가 어렵다.

이에 대안으로 React에서는 useState, useEffect와 같은 Hook을 도입하였다.
Hook은 함수형 컴포넌트에서 상태 관리를 할 수 있게 해주고, 코드의 간결함과 재사용성을 높이는 등의 장점들이 있다.

# Custom Hook이란?

### 그럼 Hook이 도입되기 이전에는 재사용할 수 있는 코드를 분리를 어떻게 했냐?

바로 HOC를 이용하는 것이다.([Higher Order Component, 고차 컴포넌트에 대한 링크](https://velopert.com/3537)) 
<br>
딱 봐도 복잡해보인다.
<br>
HOC를 사용하면 컴포넌트의 계층 구조가 복잡해지고, 가독성이 떨어지는 문제가 있다.

<br>

이러한 문제를 우리는 `Custom Hook`으로 재사용성을 높히고 코드의 간결함을 챙길 수 있게 되었다.
<br>
`Custom Hook`이란 상태 관리 로직을 재사용 가능한 함수로 추상화한 것.
<br>
`Custom Hook`을 사용하면 여러 컴포넌트에서 동일한 로직을 사용하고 싶을때 중복 코드를 줄일 수 있다.

# 적용 예시

이번 점심 뭐 먹지? 미션을 하면서 간단한 `Custom Hook`을 적용해보았다.
<br>
Modal과 관련된 로직을 Hook으로 분리해보았다.
<br>
물론 이번 미션에서 Modal은 한 곳에서만 쓰인다.
<br>
굳이 분리할 필요가 있을까 싶지만 Modal은 여러 컴포넌트에서 쓰일 수 있다.
<br>
확장성을 고려하기도 했고, 연습도 해볼겸 `useModal`이란 `Custom Hook`을 만들었다.

 ### Restaurants.tsx
```jsx
const Restaurants = () => {
  const [restaurantId, setRestaurantId] = useState(0);
  const { category, sorting, handleCategoryChange, handleSortingChange } = useFilterOptions();
  const [isModalOpen, setIsModalOpen] = useState(false); /* 모달이 열려있는지 확인하는 boolean */

  const handleRestaurantIdChange = (restaurantId: number) => { /* id 상태값을 변경해주고 모달창을 여는 함수 */
    setRestaurantId(restaurantId);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => { /* 모달창 닫는 함수 */
    setIsModalOpen(false);
  };
  
  ...
  
  const restaurantListProps: RestaurantListProps = {
    ...,
    changeRestaurantId: handleRestaurantIdChange, /* 모달창 여는 함수를 props로 던져 줌 */
  };
  
  const modalProps: ModalProps = {
    restaurantId: restaurantId,
    handleClose: handleCloseModal, /* 모달창 닫는 함수를 props로 던져 줌 */
  };
  return (
    <>
      <RestaurantFilter {...restaurantFilterProps} />
      <RestaurantsList {...restaurantListProps} />
      {isModalOpen && <Modal {...modalProps} />}
    </>
  );
};
export default Restaurants;
```

기존 코드는 이렇다. 주석으로 처리한 부분들을 `useModal`이라는 `Custom Hook` 으로 분리해보겠다.

### useModal.tsx

```jsx
export const useModal = (isOpen: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return { isModalOpen, openModal, closeModal, toggleModal };
};```
```

`useModal`을 `Restaurants.tsx` 에 적용시켜보겠다.

### Restaurants.tsx
```jsx
import { useModal } from '../../hooks/useModal';

const Restaurants = () => {
  const [restaurantId, setRestaurantId] = useState(0);
  const { category, sorting, handleCategoryChange, handleSortingChange } = useFilterOptions();
  const { isModalOpen, openModal, closeModal } = useModal(false);

  const handleRestaurantIdChange = (restaurantId: number) => {
    setRestaurantId(restaurantId);
    openModal();
  };
  
  ...
  
  const restaurantListProps: RestaurantListProps =  {  
	 ..., 
	 changeRestaurantId: handleRestaurantIdChange,  
  };
  
  const modalProps: ModalProps = {
    restaurantId: restaurantId,
    handleClose: closeModal,
  };

  return (
    <>
      <RestaurantFilter {...restaurantFilterProps} />
      <RestaurantsList {...restaurantListProps} />
      {isModalOpen && <Modal {...modalProps} />}
    </>
  );
};
export default Restaurants;
```

이렇게 Hook으로 분리해주면 다른 컴포넌트에서도 `useModal` 하나로 모달을 열고 닫는 로직을 재사용할 수 있게 된다.

# 결론

Custom Hook을 사용하면 반복 되는 상태관리 로직을 분리할 수 있어 코드의 재사용성을 높힐 수 있다.