---
title: "자바스크립트 엔진 동작 과정"
date: "2021-12-21"
description: "자바스크립트 엔진의 동작 과정에 대해서 공부한 내용을 기록하는 글"
categories: ["study"]
comments: true
---

평소에 프론트엔드 관련 공부는 비중 있게 했지만, 웹 기초 관련해서는 소홀하게 했던 것 같다. 당분간은 웹 기초 지식들을 갈고닦으려고 한다. 그 첫 번째 주제는 `자바스크립트 엔진의 동작 과정`이다.

# 자바스크립트 엔진이 하는 일

자바스크립트 엔진은 자바스크립트 코드를 실행하는 일을 한다. 보통은 인터프리터 방식으로 작동되지만, 프로그램을 실행하는 시점에 기계어로 컴파일하는 JIT 컴파일을 할 수도 있다.

자바스크립트가 광범위하게 사용되기 때문에 자바스크립트 엔진 또한 여러 곳에서 사용할 수 있다. 그렇지만 대체적으로 브라우저에서 사용된다.

# 자바스크립트 엔진 구조

동작 과정을 알려면 어떤 요소들이 구성되어 있는지 알아야 한다.

![자바스크립트 엔진의 구성 요소 from. 캡틴판교님의 글](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-structure.png)

###### 자바스크립트 엔진의 구성 요소 from. [캡틴판교님의 글](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)

## 메모리 힙 (Memory Heap)

변수나 함수 저장, 호출 등의 작업이 일어날 때 필요한 메모리 자원을 **할당, 사용, 해제**할 수 있게 만드는 공간이다.

## 콜 스택 (Call Stack)

자바스크립트 코드를 읽어 내려가면서 수행해야 하는 작업들을 쌓아 저장하고, 작업을 수행하는 공간이다.

자바스크립트는 단 하나의 콜 스택을 사용한다. 그렇기 때문에 한 번에 하나의 작업을 수행할 수밖에 없다. 이러한 방식을 `Run to Completion` 이라고 한다.

### 스택 오버플로우 (stack overflow)

콜 스택은 공간이다. 이 공간은 한정된 사이즈가 있는데, 만약 이 사이즈보다 많은 양의 작업이 저장된다면 `스택 오버플로우` 에러가 발생한다.

# 자바스크립트는 한 번에 한 작업을 수행한다?

> 자바스크립트는 단 하나의 콜 스택을 사용한다. 그렇기 때문에 한 번에 하나의 작업을 수행할 수 밖에 없다. 이러한 방식을 `Run to Completion` 이라고 한다.

이게 무슨 말일까? 당장 우리가 브라우저를 켜서 아무 웹 사이트만 들어가 보아도 여러 작업이 **동시**에 수행되는 것을 확인할 수 있는데 말이다. 자바스크립트는 어떻게 하나의 콜 스택을 가지고 어떻게 `동시성`을 지원할까?

## 숨겨진 진실

동시성을 지원하는 방법에 대해 설명하기 전에 브라우저 환경에 대한 이야기를 하려고 한다. 그러면 자연스럽게 어떻게 동시성을 지원하는지 답을 알게 되기 때문이다.

![[https://meetup.toast.com/posts/89](https://meetup.toast.com/posts/89) 에서 가져온 브라우저 환경을 표현한 사진](https://image.toast.com/aaaadh/real/2018/techblog/b1493856379d11e69c16a9a4cf841567.png)

###### [https://meetup.toast.com/posts/89](https://meetup.toast.com/posts/89) 에서 가져온 브라우저 환경을 표현한 사진

이 사진을 보면, 평소에 비동기 호출을 할 때 사용하는 함수들은 자바스크립트 엔진이 아닌 Web APIs 영역에 있는 것을 볼 수 있다. 또한 태스크 큐, 이벤트 루프 같은 장치들도 자바스크립트 엔진 **바깥 영역**에 구현되어 있다.

자바스크립트가 구동되는 환경에서는 보통 여러 개의 스레드가 사용된다. 동시성을 구현하려면 그 환경과 자바스크립트 엔진이 연동이 되어야 하는데 그것을 도와주는 것이 바로 바깥 영역에 있는 `이벤트 루프` , `태스크 큐` 이다.

결국, 자바스크립트는 어떻게 하나의 콜 스택을 가지고 어떻게 `동시성`을 지원할까? 라는 물음에 대한 답은 `이벤트 루프` 와 `태스크 큐` 에 있는 것이다.

## 그래서 이벤트 루프랑 태스크 큐가 어떤 일을 하는데?

![**Philip Roberts님의 [발표 자료](https://vimeo.com/96425312)에 있던 사진**](https://miro.medium.com/max/752/1*7GXoHZiIUhlKuKGT22gHmA.png)

###### Philip Roberts님의 [발표 자료](https://vimeo.com/96425312)에 있던 사진

### 태스크 큐

콜백 함수들이 큐 형태로 대기하는 공간이다.

### 이벤트 루프

이벤트 루프는 자바스크립트 엔진의 콜 스택이 비워질 때, 태스크 큐에서 콜백 함수를 꺼내와서 실행하는 역할을 한다.

### 전체적인 흐름

1. 콜 스택에 있는 작업을 처리하다가, 비동기 작업을 발견하면 Web APIs로 위임한다.
2. 비동기 작업이 완료되면 콜백 함수가 태스크 큐에 쌓인다.
3. 콜 스택에 아무것도 없을 때 이벤트 루프가 콜백 함수를 콜 스택으로 전달한다.
4. 콜 스택으로 이동한 콜백 함수가 실행하고 없어진다.

## 결론

결과적으로 말하자면, 비동기 작업을 요청하더라도, 그것이 콜 스택으로 바로 올라가는 것이 아니라 태스크 큐에서 대기하다가 이벤트 루프를 통해서 콜 스택으로 저장되는 것이기 때문에 `동시성`을 지원할 수 있게 되는 것이다.

# Ref

[자바스크립트와 이벤트 루프 : NHN Cloud Meetup](https://meetup.toast.com/posts/89)

[javascript 동작 원리](https://velog.io/@namezin/javascript-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC#3-%EB%9F%B0%ED%83%80%EC%9E%84)

[자바스크립트의 동작원리: 엔진, 런타임, 호출 스택](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)

[Philip Roberts: Help, I'm stuck in an event-loop.](https://vimeo.com/96425312)

[Concurrency model and the event loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#event_loop)
