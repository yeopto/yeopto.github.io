---
date: '2022-11-02'
title: '[우테코] 프리코스 1주차 온보딩 미션'
categories: ['우테코']
summary: '온보딩 미션을 하면서 배우고 느낀 점'
thumbnail: '../image/tech.png'
---

첫번째 미션은 코딩테스트 유형의 문제들로 구성되었다. 평소 이런 문제들을 시간내에 풀기 위해 구현에만 집중하고 풀었는데, 문제별로 기능을 분리하면서 풀려하니 익숙하지 않아서 쉽지 않았다. 하지만 기능을 먼저 분리하고 구현해보니까 로직이 더 명확해졌다. 오류가 생기면 어디서 일어나는지 파악하기가 쉬웠다. 프리코스 4주동안 코드 작성 전 설계하는 연습을 많이해서 습관을 잘 들여야겠다고 생각했다.

<br>

깃은 평소에 사용했어서 크게 어려운 점은 없었다. 하지만 커밋 메세지를 어떻게 작성할지가 큰 고민이었다. 내 커밋기록을 보는 분들이 직관적으로 이해하기 쉽도록 작성하려다보니 생각보다 어려웠다. 이 부분에서 시간을 많이 투자했다. 미션하면서 내가 중점을 두었던 것은 코드나, 커밋 메세지나 사람들이 알아보기 쉽게 직관적으로 만들어보자였다. 가독성을 위해 모든 문제는 아니지만 선언적으로 코드를 작성하도록 노력해봤다. 또 early return도 적용해보았다. 문제 2번을 예시로 들어보겠다.

```JavaScript
/* 문제 */
// 암호문을 좋아하는 괴짜 개발자 브라운이 이번에는 중복 문자를 이용한 새로운 암호를 만들었다. 
// 예를 들어 "browoanoommnaon"이라는 암호문은 다음과 같은 순서로 해독할 수 있다.

// "browoanoommnaon"
// "browoannaon"
// "browoaaon"
// "browoon"
// "brown"

// 임의의 문자열 cryptogram이 매개변수로 주어질 때, 연속하는 중복 문자들을 삭제한 결과를 return 하도록 
// solution 메서드를 완성하라.


function problem2(cryptogram) {
  const cryptogramArr = [...cryptogram];
  const stack = [];
  let checkOverword = "";

  for (let i = 0; i < cryptogramArr.length; i++) {
    if (checkOverword === cryptogramArr[i]) continue;

    if (cryptogramArr[i] === cryptogramArr[i + 1])
      checkOverword = cryptogramArr[i];
    else {
      stack.push(cryptogramArr[i]);
      checkOverword = "";
    }
  }
  const decoding = stack.join("");

  return decoding === cryptogram ? decoding : problem2(decoding);
}
```

처음엔 for문을 돌며 stack에 조건에 맞는 것을 넣어 join해주는 방식으로 짰다. 또 삼항연산자를 사용해서 함수 인자와 해독문이 같으면 해독문을 반환하고 아니면 해독문으로 재귀를 돌리는 방식이다. 이 두 부분을 바꿔보았다.

```JavaScript
function problem2(cryptogram) {
  const cryptogramArr = [...cryptogram];
  let checkOverword = "";

  const decoding = cryptogramArr
    .map((word, index) => {
      if (checkOverword === word) return null;
      if (cryptogramArr[index] === cryptogramArr[index + 1]) {
        checkOverword = cryptogramArr[index];
        return null;
      }
      checkOverword = "";
      return word;
    })
    .join("");

  if (decoding === cryptogram) return decoding;
  return problem2(decoding);
}
```
굳이 스택을 사용하지 않고 구조분해한 문자열을 map으로 순회하며 조건에 맞는 것은 null로 맵핑하고 마지막에 join 시켜주는 로직으로 바꿨다. 또, 해독문과 함수 인자가 같으면 early return 시켜주었다. 함수형 프로그래밍을 하고 싶었는데, 명령형 코드를 선언형 코드로 바꾸며 조건부분 로직들을 추상화 시키는 것이 굉장히 어려웠다. 많이 연습해봐야겠다고 느꼈다.

<br>

이 외에도 7번문제를 풀며 다중조건을 줘서 정렬해야하는데 생각대로 값이 잘 나오지 않아서 sort() 메서드 내부 동작에 대해서도 공부해서 적용시켰다. 이번 미션이 간단해 보일 수 있지만 쉽지 않았다. 아직 내가 많이 부족하다는 것을 더 실감하게 해주었고, 열심히 해야겠다는 동기부여를 심어준 의미있는 미션이라고 생각한다.