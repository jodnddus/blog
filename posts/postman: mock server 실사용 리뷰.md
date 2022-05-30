---
title: "postman: mock server 실사용 리뷰"
date: "2022-05-27"
description: "프론트엔드와 백엔드의 병행 작업을 위해 postman의 mock server기능을 사용해 보았습니다."
categories: []
comments: true
---

회사에서 기업 회원을 위한 회원가입 프로세스를 개발하고 있다.

이메일 인증 코드 발송, 사업자등록증 OCR 등등 프론트엔드에서 필요한 API가 5개가 있었는데 백엔드 개발이 끝나기도 전에 프론트엔드 개발을 마무리 지었다. 현재 가능한 모든 플로우로 직접 눌러보며 테스트를 하고 있다.

postman을 사용하기 전에는 dummy 데이터를 만들어놓고 케이스별로 바꿔가며 테스트를 했었지만, mock server를 사용하면 그런 과정 없이 실제 서버에서 응답을 주고받는 듯한 경험을 할 수 있었다.

## mock server 세팅 중 어려웠던 점

어떤 요청에 대해서 서버는 항상 같은 값을 내놓지 않을 것이다. 단순하게 성공과 실패가 있을거고, 백앤드 개발자의 재량에 따라서 경우에 따른 구체적인 응답을 줄 수도 있는 것이다.

mock server를 세팅하고 각 요청에 대한 example들을 만들 때 문득,

> 어떻게 각각의 요청에 따라서 응답을 다르게 줄 수 있는거지? 

라는 의문이 들었다.

그렇게 `postman mock server request matching`, `postman mock server return value` 이런 검색어로 구글을 떠돌다가 공식 문서에서 `x-mock-match-request-body` 라는 헤더를 발견했다.

[Matching a request body or header](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mock-with-api/#matching-a-request-body-or-header)

요청을 보낼 때 헤더에 `x-mock-match-request-body` 헤더를 true로 넘기면 request body에 있는 값과 postman에서 example로 만들어놓은 request body를 비교해서 매치된 값을 응답으로 넘겨준다는 내용이다.

## api mocking 중 개선되어야 하는 점

프로젝트 내부에서 axios instance를 만든 다음 baseUrl을 고정해놓고 사용하고 있다.

이런 환경에서 mock server로 요청을 보내려면 url과 header를 수정해야하는 상황이다. 어쩔 수 없이 임시로 수정한 다음 테스트를 돌리게 되었지만, 이런 식으로 매번 mock server로 요청을 보내기 위해 url과 header를 수정해야하는 일이 생기면 mock server를 만든 의미가 없다.

api를 호출할 때 mock server로 요청을 보내겠다는 의미를 담은 키를 넘겨서 조건에 따라 url과 header를 바꿔주는 api instance 확장 작업이 필요할 것 같다.