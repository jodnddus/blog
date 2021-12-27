---
title: "설문 진행 애플리케이션 만들기"
date: "2020-07-08"
description: "포켓서베이의 웹 설문 기능을 만든 경험을 공유합니다."
categories: [devlog]
comments: true
---

<!--
  * 어떤 고려사항을 바탕으로 작업을 진행했는지
  * 사용한 기술이 비즈니스에 어떻게 엮여 있는지
-->

웹 설문이 만들어지기 이전의 포켓서베이는 **카카오톡 환경에서만** 설문을 진행할 수 있었습니다. **카카오톡 환경 설문의 치명적인 단점**은 설문을 진행하기 위해서 발송 과정을 꼭 거쳐야만 한다는 것입니다. **발송 과정**은 설문을 받아볼 사람의 전화번호나 이름을 기입하고 포켓서베이 발송 API를 호출하는 과정입니다. 이런 중간 과정이 있다보니 쉽고 빠르게 설문을 공유하려는 개인 고객이 사용을 꺼려하는 케이스가 있었습니다.

이를 위한 대안으로 구글 폼, 서베이 몽키, 타입폼과같은 자체 설문 진행 애플리케이션을 만들었습니다.

# 요구사항

1. 여러 문항들을 한 페이지에 볼 수 있는 형태
2. 문항 포커싱

## 여러 문항들을 한 페이지에 볼 수 있는 형태

문항을 표시하는 형태에 대한 내용입니다.

구글 폼의 경우는 여러 문항을 한 페이지에 표시하는 형태입니다.

<img src="https://www.pocketsurvey.co.kr/static/media/webSurvey2Scroll.0469cd3b.gif" width="300" />

타입폼 같은 경우에는 한 페이지에 한 문항씩 표시되고 응답을 완료할 때마다 페이지가 전환되는 형태입니다.

<img src="https://www.pocketsurvey.co.kr/static/media/webSurvey2Card.8ed04407.gif" width="300" />

포켓서베이의 설문 진행 애플리케이션에는 전자를 채택하는 것으로 결정되었습니다.

## 문항 포커싱

문항을 표시를 페이지 단위로 했다면 이 기능을 넣을 필요는 없었을 것입니다. 여러 문항을 한번에 표시함으로 인해 사용자가 지금 어떤 문항을 보고 있는지 표시해줄 필요가 생겼습니다.

# 개발 과정

## 여러 문항들을 한 페이지에 볼 수 있는 형태

처음에는 단순하게

```JSX
<QuestionContainer>
  {scenario.contents.body.map((item, index) => {
    return switchingModules(item, index)
  })}
</QuestionContainer>
```

을 하면서 모든 문항 컴포넌트를 표시해주면 끝날 작업이라고 생각했었습니다.

하지만 포켓서베이 설문에는 `브랜칭`이라는 개념이 있습니다.

> 응답에 따라 다음 문항이 달라지는 것을 우리 개발 조직에서는 `브랜칭`이라고 소통합니다.

그렇기 때문에 모든 문항을 바로 표시하면 안되고, 브랜칭이 걸려있는 문항까지만 표시해야합니다.

브랜칭 로직에 맞게 문항을 표시하기 위해, **표시해야 할 문항들** 이라는 의미를 가지는 showingData 배열에 의존해서 문항을 띄워주는 방식으로 수정했습니다.

```JSX
<QuestionContainer>
  {scenario.contents.body.map((item, index) => {
    if (showingData[index].displaying) {
      return switchingModules(item, index)
    }
    return null;
  })}
</QuestionContainer>
```

이렇게 말이죠

showingData는 아래 함수를 통해서만 변화합니다.

```javascript
export function* setDisplayingArray(
  selectingQuestionIndex: number,
  destinationIndex: number,
  showingData: ShowingItemType[],
  body: QuestionType[]
) {
  try {
    // 기존 showingData을 복사해서 (step 1)
    const tempShowingData = cloneDeep(showingData);

    // 선택한 문항의 다음 문항부터 끝까지 안보이게 수정한 다음 (step 2)
    for (let i = selectingQuestionIndex + 1; i < showingData.length; i += 1) {
      tempShowingData[i].displaying = false;
    }

    // 브랜칭 목적지 문항부터 다음 브랜칭 문항까지 보이게 수정 (step 3)
    for (let i = destinationIndex; i < showingData.length; i += 1) {
      tempShowingData[i].displaying = true;
      if (body[i].branching) {
        break;
      }
    }

    // 적용
    yield put(webSurveyActionCreators.setShowing(tempShowingData));
  } catch (err) {
    console.error(err);
  }
}
```

위 함수를 예를 들어서 설명해보겠습니다.

1. 10개의 문항이 있는 설문에서 1, 2, 3번 문항이 표시되고 있다.
2. 2번 문항에서 5번째 선택지를 선택해서 7번 문항으로 이동한다.
3. 3번 문항부터 4, 5, 6, 7, 8, 9, 10번 문항을 안보이게 처리한다. (step 2)
4. 7번 문항부터 8, 9번 문항을 표시한다, 10번 문항은 브랜칭 문항이기에 표시에서 제외한다. (step 3)
   이런 방식으로 문항 표시 로직이 처리됩니다.

이런 로직을 통해서 **여러 문항을 한 페이지에서 볼 수 있게** 되었습니다.

## 문항 포커싱

문항 포커싱이 바뀌는 상황은 총 5개가 있습니다.

1. 문항 응답 후 다음 문항 포커싱
2. 다른 문항 클릭 시 해당 문항 포커싱
3. 키보드 화살표를 이용해서 이전, 다음 문항 포커싱
4. 스크롤 이벤트를 이용해서 화면 중간에 있는 문항 포커싱
5. 최종 응답 값 검증 후 에러가 생긴 문항 포커싱

다양한 곳에서 문항 포커싱이 바뀔 가능성이 있다고 판단해 문항 포커스를 바꾸는 함수를 따로 만들었습니다.

```javascript
export function* moveFocusWorker(questionIndex: number) {
  try {
    document.location.href = `${document.location.href}#Question-${questionIndex}`;

    // RemoveHash
    window.history.replaceState(
      "",
      document.title,
      window.location.origin + window.location.pathname + window.location.search
    );

    yield put(webSurveyActionCreators.setFocusIndex(questionIndex));
  } catch (err) {
    console.error(err);
  }
}
```

![ㅁㄴㅇㄹ](../static/images/question-move-example.gif)