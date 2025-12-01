---
date: '2023-02-26'
title: '[JS] this 바인딩'
categories: ['JS']
summary: 'addEventListener에서의 this 바인딩'
thumbnail: '../image/javascript.png'
---

로또 미션을 하면서 메서드로 이벤트 핸들러 함수를 만들기도 하고, 만든 것을 다른 메서드 내에서 사용했다. 이벤트 핸들러 함수 내의 this가 이벤트 핸들러 함수를 어떻게 콜백으로 던져줬냐에 따라 this 바인딩이 달라졌다. 그 부분에 대해 알아보자.

<br>

먼저 일반함수와 화살표 함수의 this 바인딩은 어떻게 되는지 알아보자.

## 일반함수에서의 this

1. 함수 실행시에는 전역 객체(브라우저에서는 window, node에서는 global)를 가리킨다.
2. 메서드 실행시에는 메서드를 소유하고 있는 객체를 가리킨다.
3. 생성자 실행시에는 새롭게 만들어진 객체를 가리킨다.

-> 일반 함수는 함수를 선언할 때 this 바인딩할 객체가 정적으로 결정되는 것이 아니다. 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 **동적**으로 결정된다.

## 화살표 함수에서의 this

-> 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 **정적**으로 결정된다. 화살표 함수의 this는 **언제나 상위 스코프의 this**를 가리킨다!

<br>

이제 코드를 보며 어떻게 실행되는지 알아보자!

## bind()를 사용하지 않고 그냥 넘겨준다면?

![no_bind](../image/no_bind_code.png)

<br>

지금 처럼 addEventListener함수에 this.handleMoneyInput 메서드를 명시적으로 바인딩 해주지 않고 그대로 던져준다면 handleMoneyInput 내의 this는 메서드 실행시에 메서드를 소유하고 있는 객체를 가리키기 때문에 addEventListener 실행시 addEventListener를 가지고 있는 form 태그로 this가 바인딩된다.

## 그냥 넘겨줄때 결과

![no_bind_result](../image/no_bind_result.png)

<br>

결과를 보면 this가 이벤트 발생한 타겟에 바인딩이 되어 form 태그에 바인딩 된 것을 확인할 수 있다. 에러메세지를 보면 at HTMLFormElement.handleMoneyInput이 있는데 handleMoneyInput의 this가 HTMLFormElement에 바인딩 되었기 때문에 HTMLFormElement에는 purchaseMoneyInputView란 프로퍼티를 읽을 수 없다고 나온다. 이걸 해결하기 위해선 this를 명시적으로 바인딩 해주면 된다.

## bind()를 사용하고 넘겼을 때

![bind](../image/bind_code.png)

<br>

## bind() 사용 후 결과 

![bind_result](../image/bind_result.png)

<br>

넘겨줄 때 handleMoneyInput에 현재의 this(LottoController)로 명시적으로 바인딩 시켜준다면 LottoController가 this로 바인딩 된 것을 확인할 수 있다.

## 화살표 함수를 사용한다면?

![arrow](../image/arrow_code.png)

<br>

화살표 함수는 호출 시 동적으로 this가 바인딩 되지않고 선언시에 정적으로 바인딩 되는데 상위 스코프의 this로 바인딩 된다고 했다.

## 화살표 함수 사용 결과

![arrow_result](../image/arrow_result.png)

<br>

LottoController가 바인딩 된 것을 확인할 수 있다. 근데 왜 상위 스코프의 this가 LottoContoller일까?

## 화살표 함수 사용했을때의 스코프

![arrow_debugger](../image/arrow_debugger.png)

<br>

상위 스코프의 this로 바인딩 해준다고 했는데 Local 스코프 바로 위에 있는 스코프를 보니 start 메서드를 기억하는 클로저가 있다. start 메서드(outer function) 안에 화살표 함수(inner function)가 있기 때문에 화살표 함수는 start메서드를 기억하는 클로저를 스코프로 가지게 된 것 같다. 그래서 화살표 함수의 Local보다 바로 위 상위 스코프인 start와 관련된 클로저를 참조하여 화살표 함수는 this를 바인딩 하였고, start 메서드의 this는 LottoController라서 화살표 함수의 this에 LottoController가 바인딩된 것 같다.

<br>

위에서 본 것처럼 화살표 함수는 일반 함수와 다르게 this 바인딩이 되기 때문에 콜백 함수로 사용할 땐 주의해서 사용해야한다고 한다. this가 항상 헷갈렸는데 이번 기회에 정리해보았다. 내가 만든 코드로 적용하고 확인해보니 좀 더 잘 이해할 수 있었던 것 같다. 끗.

## Reference

[**Poiemaweb-arrow-function**](https://poiemaweb.com/es6-arrow-function)
