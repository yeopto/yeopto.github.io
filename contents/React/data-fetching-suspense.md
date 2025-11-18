---
date: '2023-08-22'
title: '[React] Suspense 너의 정체는 무엇이니?'
categories: ['React']
summary: 'React에서 data fetching 방법론을 통해 suspense를 알아보자'
thumbnail: '../image/react.png'
---

[과거 리액트 공식 문서(17버전)](https://17.reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense)에는 **Traditional Approaches vs Suspense**란 글을 찾아볼 수가 있다. 이 글은 **Suspense for Data Fetching (Experimental)** 이 챕터에 있는 글인데 제목만 봐도 17버전에선 Suspense가 실험적인 기능이었다. 지금 17버전 문서에는 **Caution**을 띄우며 React 18은 concurrency를 제공하며 릴리즈 되었다, 이 페이지는 stale한거고 broken되었고, incorrect하다는데.. 레거시니까 보지말라는 것 같다. 하지만 난 이 문서부터 읽고 글을 써보려한다.

<br>

레벨 2 인터뷰였나? 누군가가 나에게 이런 질문을 했다. "React.Lazy와 Suspense를 활용한 코드 스플리팅에 대해 설명해주세요." 그때는 이게 무슨 말이여라며 모른다고 대답했다. 레벨 2때 Recoil을 사용하며 Suspense를 사용해보긴 했었다. 그 당시 Recoil selector를 이용하여 비동기 요청을 하면 suspense에 걸려서 fallback이 뜨는데, 왜 그냥 fetch API를 사용하면 fallback이 왜 안뜨지란 의문을 가진 경험이 있다. 누군가가(다른 사람이다.) 나의 의문을 듣고 "그거 컴포넌트 render중에 Suspense가 자식 컴포넌트 비동기 요청에 대한 promise 상태를 확인할 수 있어야해서 자식 컴포넌트에서 요청 promise를 throw 해야해! 그래야 Suspense가 catch 하고 promise가 pending 상태면 내가 설정한 fallback이 뜨는거거든!"라며 지금 생각해보면 아주 명쾌한 대답을 해줬는데, 저 문장을 40%만 이해한 상태로 레벨 인터뷰에서 코드 스플리팅 질문을 받은 것이었다.

<br>

그 질문에 대해 대답을 못한 뒤, 찍먹으로 이해했던 Suspense를 어느정도로 이해하고 싶은 욕심이 생겼다. 코드 스플리팅 with Suspense와 같은 키워드로 막 알아보던 중 글들은 많은데 이해가 잘 가지 않았다. React.Lazy, 코드 스플리팅 등 처음보는 개념이 나오고 하다보니 어디서 부터 알아봐야할지 감도 못잡았던 것 같다. 그래서 Suspense부터 차근차근 알아보자하면, Suspense 기능을 제공하는 data fetching 라이브러리 및 상태관리 라이브러리들이 있으니 그걸 사용해야 Suspense를 적절하게 사용할 수 있다~, fetch API로 구현하려면 복잡할거고 unstable하다~, 아니다 생각보다 구현하는데 어렵지 않다~ 등 수많은 정보가 머리속으로는 들어오는데 정리가 되지 않았다. 내 머릿속의 Suspense 개념은 이리 저리 흩어져있었다.

<br>

레벨 3에 와서 누군가의(또 다른 누군가)의 Suspense 테코톡을 보고 이게 data fetching과 관련되어 있구나란걸 알게 되었고, 그 키워드 중심적으로 알아보니 Suspense에 대해 감을 잡을 수 있었다. 그 내용이 바로 17버전 문서에 있는 **Traditional Approaches vs Suspense**의 내용이다. 이 내용부터 알아보며 내가 머릿속으로 정리한 Suspense에 대해 서술하려한다.

<br>

> 이 내용 외의 Suspense에 대한 자세한 내용은 공식문서를 보면 자세하게 설명되어 있다. [React17](https://17.reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense), [React18](https://react.dev/reference/react/Suspense)

# Traditional Approches

말 그대로 React에서 전통적인 Data Fetching 방법을 알아보고, 이 방법들의 한계 및 문제점을 알아보자.

> 데이터 비동기 요청은 msw를 이용하여 불러왔다.

## Fetch-on-Render

먼저 코드 부터 살펴보자.

```tsx
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  todo: string;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    fetch('/todos')
      .then(response => response.json())
      .then(todos => setTodos(todos));
  }, []);

  if (todos === null) return <p>Fetching todos...</p>;

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  );

const App = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    fetch('/name')
      .then(response => response.json())
      .then(name => setName(name));
  }, []);

  if (name === null) return <p>Fetching name...</p>;

  return (
    <div>
      <h2>Simple Todo</h2>
      <div>{name}</div>
      <Todos />
    </div>
  );
};

export default App;
```

우리에게 익숙한 코드다. `useEffect`를 이용해 컴포넌트가 마운팅 된 이후에 데이터를 요청한다. App 컴포넌트가 마운트가 되어 App 컴포넌트의 `useEffect`가 실행되고, name을 요청한 Promise가 resolve 되고나서 자식 컴포넌트인 Todos 컴포넌트에서 마찬가지로 `useEffect`를 통해 todos를 fetch 해올 수 있다. 즉 fetch가 병렬적으로 일어나지 않아 waterfall 현상이 일어나는 문제가 있다.

<br>

예시와 네트워크 탭을 보면 좀 더 직관적으로 확인할 수 있다.

<br>

![fetch-on-render](../image/fetch-on-render.gif)

<br>

네트워크 탭을 보면 name이 pending 상태에서 resolve 된 후 todos를 요청하고 있고 waterfall 문제를 확인할 수 있으며, UI에서도 fetching name... -> 이름 -> fetching todos... -> todos 목록이 나오는 것을 확인할 수 있다.

<br>

만약 각자 자신의 비동기 통신을 하는 자식 컴포넌트가 많다면 이러한 특징은 느리고 불편한 UX를 제공하게 될 것이다. 이 부분이 fetch-on-render 방식의 문제점이다.

## Fetch-Then-Render

코드부터 보겠다.

```tsx
import { useEffect, useState } from 'react';

export type Todo = {
  id: number;
  todo: string;
};

const fetchName = async (): Promise<string> => {
  const response = await fetch('/name');

  return response.json();
};

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('/todos');

  return response.json();
};

const fetchAll = async () => {
  return Promise.all([fetchName(), fetchTodos()]).then(([name, todos]) => ({
    name,
    todos,
  }));
};

const promise = fetchAll();

const App = () => {
  const [name, setName] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    promise.then(data => {
      setName(data.name);
      setTodos(data.todos);
    });
  }, []);

  if (name === null) return <p>Fetching name...</p>;

  return (
    <div>
      <h2>Simple Todo</h2>
      <div>{name}</div>
      <Todos todos={todos} />
    </div>
  );
};

const Todos = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  );
};

export default App;
```

해당 방법은 컴포넌트가 렌더링 되기 전에 네트워크 요청을 한다. 컴포넌트 외부에서 `promise.All()`을 이용하여 필요한 데이터를 한번에 컴포넌트가 마운트되기 전, promise로 미리 받아놓고, 마운트된 후 useEffect를 통해 한번에 resolve 하는 식이다. 예시와 네트워크 탭을 한번 보자.

<br>

![fetch-then-render](../image/fetch-then-render.gif)

<br>

fetch-on-render 방식과는 달리 두개의 요청을 동시에 요청하면서 병렬적으로 요청하게 되었고, 네트워크 탭을 보면 waterfall 문제가 해결된 것 같다. 하지만 이것도 문제가 있다. msw 코드를 보자.

```ts
export const handlers = [
  // 할일 목록
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos), ctx.delay(900));
  }),

  rest.get('/name', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(name), ctx.delay(200));
  }),

```

name에 대한 요청은 200ms, todos에 대한 요청은 900ms의 delay를 걸어놨다. 동시에 요청하지만 `Promise.All()`을 사용했기 때문에 결국 name이 200ms 후에 resolve 되어도 todos가 아직 resolve 되지 않았기 때문에 todos가 resolve될 때까지의 700ms 동안은 렌더링도 못하고 기다려야 한다는 것이다. fetch-on-render에서는 200ms 후 900ms가 걸리기 때문에 총 1100ms가 걸렸는데, fetch-then-render에서는 900ms로 데이터를 모두 불러올 수 있어서 비동기의 장점을 살려 성능적으로 좋아졌다고 볼 수 있지만, 700ms 동안은 아무것도 안하고 기다려야 한다는 아쉬움이 있다. 예시가 200ms, 900ms라서 그렇지 극단적 예시로 1000ms, 9000ms라면 8초 동안은 데이터 요청만을 기다려야하는 것이다. 효율적이지 못 하다고 볼 수 있다.

<br>

또, 이 방식에는 다른 문제점이 있다. 비동기 작업을 부모 컴포넌트인 App 컴포넌트 한 곳에서 하여 비동기 작업의 동시성을 보장하긴 했지만, 컴포넌트간의 결합도가 증가한다. 즉, 관심사의 분리가 되지 않는 문제가 있다.

<br>

이 외에도 전통적인 data fetching 방법론들에서 단점은 두 가지 정도 더 있다. 첫 번째는 `useEffect`에서 비동기 작업을 수행함으로써 컴포넌트 자신만의 lifeCycle과 비동기 작업의 lifeCycle의 충돌로 인한 예측할 수 없는 **Race Condition** 발생, 두 번째는 데이터 요청에 대해 loading 상태, error 상태를 작성하고 분기처리를 하다보면 코드는 **명령적이게 되고 복잡해지기 쉽다**는 것이다. 이러한 문제들을 해결하기 위해 새로운 data fetching 방법론이 등장하였고, 그것이 바로 **Render as you Fetch**다.

> 비동기 작업을 useEffect에서 사용하게 됨으로써 생기는 Race Condition에 대해서는 [이곳에서](https://17.reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense) "Race Conditions with useEffect" 챕터를 통해 좀 더 자세히 알아볼 수 있다. Race Condition이라는 개념을 간단하게 짚고 넘어가고 싶으면 예전에 운영체제를 공부할 때 정리한 것이 있는데 [여기에](https://velog.io/@yeopto/WEEK0813-PintOS-Project-1-Threads#pintos-keyword) 남겨놓겠다.

> 여기서 잠깐

fetch-then-render 방식에서 컴포넌트 외부에서 render 되기 전에 비동기 요청을 하면 msw 실행 완료되기전에 요청을 해서 데이터를 못 불러오며 에러가 발생한다. 이때 msw worker가 동기적으로 실행 완료가 되도록 보장해주고, App 컴포넌트를 동적 import 해줘서 코드 스플리팅을 해주어야 msw에 요청이 제대로 가서 데이터를 받아올 수 있다.

<br>

정확한지는 모르겠으나 msw 또한 서드 파트 라이브러리이기 때문에, msw의 worker와 React App 실행이 브라우저단에서 비동기로 실행되는 것 같다.(정확하지 않음)

<br>

여튼, 설정한 코드는 다음과 같다.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { worker } from './mocks/worker';

const main = async () => {
  await worker.start();
  const { default: App } = await import('./App');
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

main();
```

이렇게 App 컴포넌트를 동적 import 해주면 문제 없이 데이터를 받아올 수 있다. 이제 Render as you Fetch에 대해 설명하겠다.

# Render as you Fetch with Suspense

이 방식은 네트워크 요청을 발생시킨 직후에 컴포넌트를 렌더링한다. 코드 부터 살펴 보자.

```tsx
// App.tsx

import { Suspense } from 'react';
import Todos from './components/Todos';
import UserName from './components/UserName';

export type Todo = {
  id: number;
  todo: string;
};

const App = () => {
  return (
    <div>
      <h2>Simple Todo</h2>
      <Suspense fallback={<div>loading userName...</div>}>
        <UserName />
      </Suspense>

      <Suspense fallback={<div>loading Todos...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
};

export default App;
```

```tsx
// UserName.tsx

import fetchData from '../api/fetchData';

const resource = fetchData<string>('/name');

const UserName = () => {
  const name = resource.read();
  return <div>{name}</div>;
};

export default UserName;
```

```tsx
// Todos.tsx

import { Todo } from '../App';
import fetchData from '../api/fetchData';

export type Props = {
  todos: Todo[];
};

const resource = fetchData<Todo[]>('/todos');

const Todos = () => {
  const todos = resource.read();

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  );
};

export default Todos;
```

그리고 결과 부터 먼저 확인해보자.

<br>

![render-as-you-fetch](../image/render-as-you-fetch.gif)

<br>

위의 이미지를 보면 `Promise.All()`을 사용하지 않아도 waterfall 문제가 발생하지 않는 것을 확인할 수 있으며, 비동기 작업의 동시성이 보장되는 것을 확인할 수 있다. UserName.tsx, Todos.tsx의 코드를 보면 알 수 있겠지만 fetch-then-render 방식과 마찬가지로 render 이전에 데이터 요청하는 것은 마찬가지다. 그럼 어떻게 Suspense를 이용하여 동시성을 보장할 수 있었을까? `fetchData()`를 확인해보자.

```ts
// fetchData

const fetchData = <T>(url: string) => {
  const promise: Promise<T> = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  return wrapPromise<T>(promise);
};

const wrapPromise = <T>(promise: Promise<T>) => {
  let status: 'pending' | 'error' | 'success' = 'pending'; // promise 인자의 상태
  let response: T | Error;

  const suspender = promise.then(
    (res: T) => {
      // promise resolve 시
      status = 'success';
      response = res;
    },
    (err: Error) => {
      // promise reject 시
      status = 'error';
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender; // pending Promise를 throw 하면 Suspense가 promise를 catch.
      case 'error':
        throw response; // 만약 ErrorBoundary를 사용했다면 promise reject 시 Error 객체를 던지게 됨으로 ErrorBoundary에서 catch.
      default:
        return response as T;
    }
  };
  return { read };
};
```

`fetchData()` 함수의 return 값인 `wrapPromise()` 함수 로직에 대해선 주석으로 적어놨다. UserName.tsx, Todos.tsx 코드를 보면 컴포넌트 외부에 `fetchData()` 로직이 있다. `fetchData()`의 return 객체의 `read()` 메서드는 `wrapPromise()` 함수 내부 로직을 클로저삼아, 함수 밖에서 프로미스의 상태를 알 수 있는 하나의 인터페이스가 된다. 이 `read()` 인터페이스를 통해 Suspense와 상호작용하여 비동기 작업의 동시성을 보장할 수 있는 것이다. API 호출이 존재하는 Suspense의 자식 컴포넌트들은(UserName, Todos) render를 할 때마다 `read()` 메서드를 통해 promise의 상태 값을 알 수 있게 되고 그로인해 Suspense에서는 자식 컴포넌트로 부터 throw된 promise를 catch 하여 fallback UI를 보여줄 수 있는 것이다.

<br>

> 그럼 어떻게 React는 특정 컴포넌트 비동기 로직의 상태 값을 계속 관찰하여 매번 fallback UI 혹은 요청한 데이터에 대한 UI를 보여줄 수 있는지에 대해 궁금할 수 있다. 이 부분은 [이 포스팅](https://maxkim-j.github.io/posts/suspense-argibraic-effect/)에 있는 "Sebastian Markbage - SynchronousAsync.js" 파트에서 간략한 코드로 컨셉을 확인할 수 있다. 이 포스팅에 Suspense와 관련된 주제인 대수적 효과에 대해서도 설명이 있는데 많이 deep한 내용이다. 관심 있는 사람은 한번 보는 것도 좋을 것 같다.

> 또, 지금 위에 작성한 fetchData() 함수와 wrapPromise() 함수가 utils의 느낌이 강한데, [kakao Entertainment FE 기술 블로그](https://fe-developers.kakaoent.com/2021/211127-211209-suspense/)에 useFetch() 라는 hook으로 추상화하여 소개한 글도 있다. 이 글을 봐도 좋을 것 같다.

<br>

이렇게 Suspense를 활용하여 data fetching을 좀 더 효율적으로 하여 렌더링을 할 수 있게 되고, Suspense의 계층구조와 fallback 렌더링으로 컴포넌트들은 더 이상 Race Condition을 신경 쓰지 않아도 된다. 또, 컴포넌트간의 관심사가 분리되어 컴포넌트 결합도가 낮아졌다. 위의 App.tsx 코드를 보면 알 수 있듯이 UI 로직이 굉장히 선언적으로 바뀌었다.

<br>

Tanstack-query나 SWR와 같은 data fetching 라이브러리를 사용하면 거기서 제공하는 API를 통해 보다 쉽게 Suspense를 사용할 수 있다고 한다. 아직 우리 프로젝트 하루스터디에서는 data fetching 라이브러리를 사용하지 않아서 사용해보지 않았다. 지금은 fetchAPI만 사용하고 있는데, 추후에 라이브러리를 도입하게 된다면 사용해보고 아니라면 위와 같은 방식을 사용하여 조금 더 선언적으로 로딩 및 에러처리를 해보고 싶긴하다.(이거 말고 할게 태산인게 함정)

<br>

# 무분별한 Suspense 사용은 좋지 않을 수 있다.

마지막으로 간단하게 무분별한 Suspense 사용은 어떤 부분에서 좋지 않을 수 있는지에 대해 설명하고 포스팅을 마치겠다.

<br>

## Render-as-you-Fetch 예시

![render-as-you-fetch](../image/render-as-you-fetch.gif)

## 새로운 예시

![suspense-one](../image/suspense-one.gif)

<br>

위의 두개의 예시를 비교했을 때 어떤 것이 UX가 더 좋아보이는가? 효율을 따진다면 Render-as-you-Fetch 예시가 더 좋을 수 있겠지만, UX적으로는 두 개의 요청을 다 받고 한번에 렌더링해주는 새로운 예시가 더 나아보인다.

<br>

두개 예시의 코드를 먼저 보자.

```tsx
// render-as-you-fetch 예시

const App = () => {
  return (
    <div>
      <h2>Simple Todo</h2>
      <Suspense fallback={<div>loading userName...</div>}>
        <UserName />
      </Suspense>

      <Suspense fallback={<div>loading Todos...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
};
```

```tsx
// 새로운 예시

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <h2>Simple Todo</h2>
        <UserName />
        <Todos />
      </Suspense>
    </div>
  );
};
```

두 코드의 차이는 Suspense를 각 API 요청하는 컴포넌트에 각각 하나씩 묶어주냐, 아님 두 컴포넌트를 하나의 Suspense로 묶어주냐의 차이다. 여기서 하고 싶은 말은 코드를 선언적으로 작성할 수 있다해서 무분별하게 Suspense를 사용하게 된다면 사용자에게 안 좋은 UX를 전달할 수 있다는 것이다. Suspense를 사용할 때 프로덕트 상황에 맞겠금 UX를 고려하여 사용하는 것이 좋다고 생각한다.

---

레벨 3 기간 동안 조금씩 공부했던 Suspense에 대해 정리해보았다. 내용이 너무 방대해서 꼭 글로 정리하고 싶었다. 글로 정리해놨으니 종종 헷갈릴 때 봐야겠다. 정말 알고 싶던 내용이었는데 글로 잘 정리해주신 분들에게 감사하다고 전하고싶다.

# Reference

- https://17.reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense
- https://react.dev/reference/react/Suspense
- https://kasterra.github.io/data-fetching-and-react-suspense/
- https://maxkim-j.github.io/posts/suspense-argibraic-effect/
- https://fe-developers.kakaoent.com/2021/211127-211209-suspense/
- https://happysisyphe.tistory.com/54
- https://velog.io/@yeopto/WEEK0813-PintOS-Project-1-Threads#pintos-keyword
- https://github.com/yeopto/react-practice/tree/main/suspense-errorboundary