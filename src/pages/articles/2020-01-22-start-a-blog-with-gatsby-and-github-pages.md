---
title: "Gatsby와 GitHub Pages를 사용하여 블로그 시작"
date: "2020-01-22T01:51:00.000Z"
layout: post
draft: true
path: "/articles/2020/01/21/start-a-blog-gatsby-and-github-pages/"
category: "Gatsby"
tags:
  - "gatsby"
  - "github"
description: ""
image: "https://hbn-assets-blog.s3.amazonaws.com/sungkwang/images/gatsby-github-pages.jpg"
---


# 서론

2020년 새롭게 블로그를 운영하기 위해서 [Gatsby](https://www.gatsbyjs.org/) 와 [Github Pages](https://pages.github.com/) 로 블로그를 운영하기로 결정했다. 사실 이 결정을 말하기 위해서는 구구절절 스토리가 있지만 이 글은 어떤 기술을 사용해서 블로그를 운영하고 있는지에 대한 내용을 소개할 것이다. 그 스토리는 관련연구라는 제목으로 다시 링크를 첨부 할 계획인다.

## 요구사항 정의

블로그를 만들기 전에 필요한 요구사항은 다음과 같다.

* PC 와 Mobile 모두 지원
* Twitter Card 와 Facebook Open Graph 지원
* SEO 지원
* Markdown 지원
* Code Highlight 지원
* RSS 지원
* Sitemap 지원
* Google Analytics 지원
* 한글 가독성 좋은 폰트 사용
* Sass 지원
* Tag 와 Category 지원

## 운영환경

* **운영체제** : MacOS
* **Node.js 버전** : 10.14.1 ([nodenv](https://github.com/nodenv/nodenv))

## Gatsby 설치

Gatsby를 사용하기 위해서 가장먼저 해야 할 일은 [Gatsby CLI](https://www.gatsbyjs.org/docs/gatsby-cli/)를 설치하는 것이다.

```
npm install -g gatsby-cli
```

## Gatsby Staters 

Gatsy는 [Gatsby Starters](https://www.gatsbyjs.org/docs/starters/)를 이용하면 Gatsby를 완벽하게 이해하지 않아도 곧 바로 시작할 수 있다. Gatsby는 다양한 Starter Library를 제공하거나 개발자들이 많은 것을 공유하고 있다. Spring Boot 프로젝트의 [Spring Boot Starters](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter) 와 비슷하다.

위에서 블로그를 운영할 때 필요한 요구사항을 정의했다. Gatsby Starter 중에서 정의한 요구사항을 지원하는 starter는 [gatsby-starter-lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen/) 이 있었다. 현재 Gatsby는 [Gatsby v2](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/)이다. 그래서 Gatsby v2를 지원하는 [gatsby-v2-starter-lumen](https://www.gatsbyjs.org/starters/GatsbyCentral/gatsby-v2-starter-lumen/)를 이용하기로 했다.

starter 를 이용하여 시작할 때는 stater의 저장소에서 코드를 받아온다. starter 로 만든 디렉토리는 이후에 GitHub 의 저장소를 사용할 것이라 디렉토리 이름을 GitHub 의 저장소의 이름과 동일하게 `blog.sungkwang.me` 로 만들었다.

```
gatsby new blog.sungkwang.me https://github.com/GatsbyCentral/gatsby-v2-starter-lumen
```

Gatsby Starters 를 사용하여 프로젝트를 생성하면 특별한 설정 없이 바로 시작할 수 있다. 생성한 프로젝트 디렉토리로 이둥 후 `gatsby develop` 명령을 사용하면 자동으로 필요한 파일들이 빌드되고 

```
gatsby develop
```

![](https://hbn-assets-blog.s3.amazonaws.com/sungkwang/images/Screen%20Shot%202020-01-22%20at%205.07.40%20PM.png)

## gatsby-config.js 수정

Gatsby starters 를 사용하여 생성된 프로젝트 안에 `gatsby-config.js` 파일이 있는데 이 파일은 어플리케이션 설정에 관련된 내용이 저장되어 있다. 기본적으로 만들어진 정보는 내가 서비스하려는 내용과 다르기 때문에 이 파일을 자신의 환경에 맞게 수정해야 한다.

