---
date: '2023-03-17'
title: '[JS] Proxy Pattern'
categories: ['JS']
summary: '프록시 패턴과 built-in 객체 Proxy 사용법을 알아보자'
thumbnail: '../image/javascript.png'
---

## 설명

- 프록시 객체는 한 객체에 대한 기본 작업을 가로채고 재정의할 수 있다.
- 프록시 패턴은 객체를 직접 다루지 않고 프록시를 통해 다루는 패턴을 말한다.
- 프록시 객체엔 하나의 객체에 접근할 수 있는 getter와 setter가 있다. 프록시 객체의 getter와 setter로 객체에 접근한다.
- JavaScript에서 프록시는 built-in으로 있는 Proxy object를 사용하여 만들 수 있다.

## 예시

Proxy의 첫번째 인자는 프록시할 원본 객체(target)를 받고, 두번째 인자는 handler 객체를 받는다. 여기서 handler 객체란 프록시에 기능을 추가하는데 사용할 수 있는 처리기 객체이다.

```javascript
const person = {
  name: '엽토',
  age: 200,
};

const personProxy = new Proxy(person, {
  get: (target, property) => {
    return target[property];
  },

  set: (target, property, value) => {
    target[property] = value;
    return true;
  },
});

personProxy.name = '제레미';

console.log(personProxy.name); // 제레미
```

<br>

Reflect 객체를 사용하여 좀 더 쉽게 Proxy 객체를 만들 수 있다.

```javascript
const personProxy = new Proxy(person, {
  get: (target, property) => {
    return Reflect.get(target, property);
  },

  set: (target, property, value) => {
    return Reflect.set(target, property, value);
  },
});
```

## 어떻게 활용해볼 수 있을까?

상태(state)에 프록시 객체를 만들어서 프록시 객체 setter에 render함수를 실행시키도록하고, 상태를 프록시 setter로 변경한다면 자동으로 리렌더링 할 수 있게 만들 수 있다.

## 프록시 패턴 장점

기존 객체를 수정하지 않고 일련의 로직을 프록시를 통해 추가할 수 있기 때문에 객체지향 5원칙 중 OCP, SRP를 지킬 수 있고, 또, 유연한 코드를 만들 수 있다.

- OCP(Open Close Principle)
  - 확장에 대해서는 개방되어야하지만 변경에 대해서는 폐쇄되어야한다는 원칙 -> 프록시를 사용한다면 기존 코드를 변경하지 않고 새로운 기능을 추가할 수 있음!
- SRP(Single Responsibility Principle)
  - 하나의 클래스는 하나의 책임을 가져야한다는 원칙 -> 프록시 객체 따로, 일반 객체 따로이기에 서로 각자의 일만 수행한다.

## 레퍼런스

- [https://javascriptpatterns.vercel.app/patterns/design-patterns/proxy-pattern](https://javascriptpatterns.vercel.app/patterns/design-patterns/proxy-pattern)
- [https://dev-coco.tistory.com/177](https://dev-coco.tistory.com/177)
