---
title: "브라우저 렌더링 과정"
date: "2021-12-21"
description: "브라우저의 렌더링 과정에 관해 공부한 내용을 기록하는 글"
categories: ["study", "web-basic"]
comments: true
---

웹 기초 지식 관련해서 브라우저의 `렌더링 과정`에 대해서 알아보았다.

> 성능을 최적화하려면 HTML, CSS 및 자바스크립트 바이트를 수신한 후 렌더링된 픽셀로 변환하기 위해 필요한 처리까지, 그 사이에 포함된 중간 단계에서 어떠한 일이 일어나는지를 파악하기만 하면 됩니다. 이러한 단계가 바로 **주요 렌더링 경로**입니다. - Web Fundamentals

# 객체 모델 생성 단계

브라우저가 페이지를 렌더링하려면 `DOM`, `CSSOM` 트리를 만들어야 한다.

## DOM(Document Object Model)

![DOM이 만들어지는 과정](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png?hl=ko)

DOM이 만들어지는 과정

각 단계는 변환, 토큰화, 렉싱, DOM 생성의 단계를 거친다.

### 변환

브라우저가 바이트로 표시된 HTML을 네트워크에서 읽어와서 개별 문자로 변환하는 과정.

### 토큰화

브라우저가 문자열 덩어리를 의미있는 고유한 토큰으로 변환하는 과정.

### 렉싱

만들어진 토큰을 객체로 변환하는 과정.

### DOM 생성

변환된 객체가 트리 데이터 구조 안에 연결되는 과정. 자연스럽게 상,하위 관계가 표현됨.

위 단계를 모두 수행하면 DOM이 만들어진다. 모든 페이지 처리에 DOM을 사용하지만 DOM은 마크업의 속성 및 관계만 표시해줄 뿐 어떻게 표시될지에 대한 것은 알려주지 않는다.

어떻게 표시되야 하는지에 대한 내용은 CSSOM의 역할이다.

## CSSOM(CSS Object Model)

![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-construction.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-construction.png?hl=ko)

HTML 파싱 과정과 유사하게 바이트로 다운로드 된 CSS 규칙들을 문자열로 바꾸고, 의미있는 토큰으로 바꾸고, 객체로 바꿔서 트리 데이터 구조에 연결시키는 과정 거쳐 CSSOM을 만들어낸다.

# 렌더링 트리 생성 단계

DOM과 CSSOM이 생성되었다면 이 두 가지를 결합해서 렌더링 트리를 만든다.

![https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko)

렌더링 트리 생성은 아래 과정을 거친다.

1. DOM 트리의 루트부터 시작해서 표시되는 모든 노드들을 순회한다.
   1. 렌더링에 관여하지 않는 태그들은 무시한다
   2. CSS를 통해서 숨겨질 수 있다. (display: none)
2. 표시되는 노드들에 맞는 CSSOM 규칙을 찾아서 적용한다.

# 레이아웃 단계

만들어진 렌더링 트리를 가로지르며 각 객체의 정확한 크기와 위치를 파악한다. 파악한 정보를 이용해서 박스 모델을 만든다.

# 페인트 단계

렌더링 트리의 각 노드를 실제 픽셀로 변환하는 작업.

# Ref

[주요 렌더링 경로 | Web | Google Developers](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=ko)

[NAVER D2](https://d2.naver.com/helloworld/59361)
