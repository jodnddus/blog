import * as React from "react";
import "./resume.scss";

const Resume = () => {
  return (
    <div class="resume-container">
      <section>
        <h2>
          안녕하세요 <b class="highlight">조웅연</b>입니다.
        </h2>
        <li class="font-regular">
          2년째 프론트엔드 파트에서 개발하고 있습니다.
        </li>
        <li class="font-regular">
          개발자 경험을 좋게 만드는 일에 흥미를 느낍니다.
        </li>
        <li class="font-regular">
          다양한 직군과 매끄러운 커뮤니케이션을 하려고 노력합니다.
        </li>
      </section>
      <section>
        <h2>기술 스택</h2>
        <div class="row tech-stack">
          <p class="tag">Javascript</p>
          <p class="tag">Typescript</p>
          <p class="tag">React</p>
          <p class="tag">Redux</p>
          <p class="tag">Redux-Saga</p>
        </div>
      </section>
      <section>
        <h2>업무 경험</h2>
        <div class="role-container">
          <div class="role-info">
            <h3 class="role-name">얼리슬로스 프론트엔드 엔지니어</h3>
            <p class="period">
              <time datetime="2019-11-18">2019.11.18</time> ~
              <time datetime="2021-12-31">2021.12.31</time>
            </p>
            <p class="desctiprion">
              카카오톡과 웹에서 진행할 수 있는 설문을 <b>제작</b>, <b>공유</b>,
              <b>분석</b>까지 도와주는 서베이 플랫폼,&nbsp;
              <a href="https://home.pocketsurvey.co.kr/" target="_blank">
                포켓서베이
              </a>
              의 프론트엔드 애플리케이션을 개발했습니다. <br /> 보다 자세한 개발
              경험에 대한 내용은&nbsp;
              <a href="https://jodnddus.blog/">블로그</a>를 참조하시면 됩니다.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2>연락처</h2>
        <li class="font-regular">
          <a href="mailto:lockhost23@gmail.com">이메일</a>
        </li>
        <li class="font-regular">
          <a href="https://jodnddus.blog/" target="_blank">
            블로그
          </a>
        </li>
      </section>
    </div>
  );
};

export default Resume;
