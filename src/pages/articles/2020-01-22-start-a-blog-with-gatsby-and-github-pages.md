---
title: "Gatsby와 GitHub Pages로 블로그 시작"
date: "2020-01-22T01:51:00.000Z"
layout: post
draft: false
path: "/articles/2020/01/21/start-a-blog-gatsby-and-github-pages/"
category: "Gatsby"
tags:
  - "gatsby"
  - "github"
description: "
2020년 새롭게 블로그를 운영하기 위해서 Gatsby와 Github Pages로 블로그를 운영하기로 결정했다. 이 글은 어떤 기술을 사용해서 블로그를 운영하고 있는지에 대한 내용을 소개할 것이다."
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

서버가 실행되면 두가지 URL 정보를 확인할 수 있다. 

* http://localhost:8000/
* http://localhost:8000/___graphql

Gatsby는 내부적으로 [GraphQL](https://graphql.org/)를 사용하여 데이터를 가져오는데 Gatsby 자체적으로 GraphQL 에 Query를 할 수 있는 인터페이스를 제공하고 있다. GraphQL 인터페이스에서 query를 직접 작성해서 데이터를 가져오는 결과를 확인할 수 있어 이후에 React 로 컴포넌트를 만들 때나 Gatsby의 컴포넌트와 레이아웃을 수정할 수 있다.


```graphql
query MyQuery {
  allMarkdownRemark(limit: 10) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          description
          path
        }
      }
    }
  }
}

```

![](https://hbn-assets-blog.s3.amazonaws.com/sungkwang/images/Screen%20Shot%202020-01-23%20at%203.09.51%20PM.png)

## gatsby-config.js 수정

Gatsby starters 를 사용하여 생성된 프로젝트 안에 `gatsby-config.js` 파일이 있는데 이 파일은 어플리케이션 설정에 관련된 내용이 저장되어 있다. 기본적으로 만들어진 정보는 내가 서비스하려는 내용과 다르기 때문에 이 파일을 자신의 환경에 맞게 수정해야 한다.

크게 수정해야할 항목은 다음과 같다.

* **url**: 사이트가 운영될 실제 URL로 수정
* **title**: 사이트 타이틀 수정
* **subtitle**: 사이트 설명 수정
* **author.name**: 이름 수정
* **author.email**: 이메일 주소 수정
* **author.twitter**: Twitter 계정 수정 
* **author.github**: GitHub 계정 수정
* **plugins.gatsby-plugin-google-analytics**: Google Analytics TrackingID 수정 

```js
...
const url = 'https://blog.sungkwang.me';
module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: "SungKwang's Blog",
    subtitle:
      "I'm a full stack developer",
    copyright: 'SungKwang © All rights reserved.',
    disqusShortname: '',
    menu: [
      {
        label: 'Articles',
        path: '/',
      },
      {
        label: 'About me',
        path: '/about/',
      },
      {
        label: 'Contact me',
        path: '/contact/',
      },
    ],
    author: {
      name: 'SungKwang Song',
      email: 'tech@sungkwang.me',
      telegram: '#',
      twitter: 'sungkwangsong',
      github: 'sungkwangsong',
      rss: '#',
      vk: '#',
    },
  },
  ...
  plugins: [
    ...
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-120131969-3' },
    },
    ...
  ]
```

## 프로필 사진 수정

`gatsby-starter-lumen` 의 starter 에서 프로필 사진은 `src/pages/photo.jpg` 로 저장이 되어 있다. 개인적으로 프로필 사진을 수정하고 싶을 경우 자신의 프로필 사진을 이 경로에 저장하면 된다. 만약 다른 이름으로 수정하고 싶을 경우는 다음과 같이 진행한다. 

만약 프로필 사진을 `src/pages/profile.png` 로 저장했다고 한다면 `src/components/Sidebar/index.jsx` 파일에서 프로필 사진을 임포트하는 부분을 수정한다.

```js
import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Menu from '../Menu'
import Links from '../Links'
// import profilePic from '../../pages/photo.jpg'
import profilePic from '../../pages/profile.png'
import './style.scss'

class Sidebar extends React.Component {
  ...
```

`gatsby develop` 로 서버를 시작하면 소스코드를 고치고난 뒤 직접 서버를 재시작할 필요가 없다. 자동으로 코드를 반영해서 재시작하기 때문에 브라우저에서 바로 확인이 가능하다.

![](https://hbn-assets-blog.s3.amazonaws.com/sungkwang/images/Screen%20Shot%202020-01-23%20at%201.53.46%20PM.png)

## GitHub Repository 생성

Getsby를 사용하여 개인 사이트를 운영할 때 다양한 방법이 존재한다. 자신이 직접 서버를 구축하기도 하고 [Netlify](https://www.netlify.com/)를 사용하기도 한다. 기본적으로 [GitHub Pages](https://pages.github.com/)를 사용해서 블로그를 운영했기 때문에 Github Pages를 선택했다.

GitHub Pages로 사이트를 운영하기 위해서는 우선 GitHub 에 저장소를 만들어야 한다. 이 블로그는 https://github.com/sungkwangsong/blog.sungkwang.me/ 로 저장소를 만들었다.

GitHub Pages는 `gh-pages`라는 브랜치의 코드로 사이트가 운영되기 때문에 소스코드는 `master` 에 존재하고 배포할 때만 `gh-pages` 로 빌드된 파일을 올려야 한다. **gatsby-v2-starter-lumen**는 이미 `package.json` 스크립트 안에 `deploy` 코드가 포함되어 있기 때문에 특별히 다른 코드 작성을 하지 않고도 쉽게 `npm run deploy` GitHub Pages 로 코드를 배포할 수 있다.

처음 Gatsby Starters 를 이용하여 만든 디렉토리를 GitHub 저장소를 Clone 받아서 그 안으로 모두 넣어주거나 생성된 저장소에서 `git remote add` 를 사용하여 저장소 주소를 추가한다. 

```
git remote add origin https://github.com/sungkwangsong/blog.sungkwang.me.git
```

GitHub 저장소가 **git remote** 로 추가되면 `master` 로 소스코드를 `push` 한다.

```
git push -u origin master
```

이제 실제 GitHub Pages 로 운영하기 위한 빌드 코드를 배포할 차례이다. 먼저 `gatsby build` 로 코드를 빌드한다.

```
gatsby build
```

빌드가 끝나면 배포를 위한 코드가 `public` 디렉토리 안에 모두 빌드된다. 이후 `npm run deploy` 명령어를 사용하여 저장소의 `gh-pages` 브랜치로 빌드된 코드를 배포한다.

```
npm run deploy
```

`package.json` 을 열어서 `deploy` 스크립트를 확인하면 다음과 같다.

```json
"scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "deploy": "gatsby build --prefix-paths && gh-pages -d public"
  },
  
```

## 커스텀 도메인을 위한 CNAME 적용

만약 개인적으로 사이트 도메인을 가지고 있다면 빌드 후 `public` 디렉토리 안에 `CNAME` 파일을 추가해야한다. CNAME 파일 안에는 도메인을 추가하고 저장해야한다. GitHub Pages 에 도메인을 적용하는 방법은 다음 링크에서 확인 할 수 있다. 
[Configuring a custom domain for your GitHub Page site](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)

```
blog.sunagkwang.me
```

하지만 빌드할 때마다 `public` 디렉토리는 삭제된 후 빌드된 코드가 생성되기 때문에 항상 deploy를 할 때 CNAME을 넣어주는 일은 힘든일이다. Gatsby는 다양한 plugins 이 이미 존재하고 있다. [gatsby-plugin-cname](https://www.gatsbyjs.org/packages/gatsby-plugin-cname/)는 GatsBy 가 빌드 될 때 자동으로 `siteUrl` 값을 가지고 CNAME 파일을 생성해주는 플러그인이다. 

플러그인을 사용해보자. 먼저 플러그인을 설치한다.

```
npm install --save gatsby-plugin-cname
```

gatsby-plugin-name 을 설치한 후에 `gatsby-config.js` 파일을 열어서 `plugins` 설정하는 곳에 다음과 같이 플러그인을 추가한다.


```js
...
  plugins: [
    'gatsby-plugin-cname', //추가되는 부분 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
...

```

이제 `gatsby build` 로 빌드할 때 자동으로 `CNAME` 파일 까지 생성하기 때문에 빌드 후 `npm run deploy` 를 하면 GitHub Pages 에 배포되어 도메인으로 접속이 가능하다.

https://blog.sungkwang.me/ 


## 결론

블로그를 새로 시작하면서 **Gatsby**를 선택한 이유 중에는 [React](https://reactjs.org/)를 제대로 학습하기 위한 것도 있다. React를 시작하면서 그 많은 책을 보면서도 왜 Raact를 사용하면 좋은지 체감할 수 없었기 때문에 실제 React로 만든 서비스를 운영하면서 React 코드를 적용해보고 싶었다. Gatsby는 이런 나의 요구사항을 잘 반영하고 있었다. 처음 React를 시작하는 사람들에게 Gatsby를 추천하고 싶은 이유이다. 

Gatsby를 공식문서로 시작하면 어쩌면 어려울 수 있다. 생각보다 설정도 많고 무엇보다 React 에 대한 사전지식이 필요하기 때문인데 Gatsby Starters를 이용하면 바로 Gatsby를 시작할 수 있는데 Staters는 대부분 완벽한 구조를 가지고 있고 `gatsby-config.js` 수정으로만 서비스를 바로 사용할 수 있다.

## 향후과제

Gatsby Starters 는 말 그래도 Gatsby를 시작할 때 빠르게 시작할 수 있는 도구이다. 자신이 원하는 구조와 스타일을 위해서 기본 코드를 수정해서 적용하면 되는데 GraphQL 을 확인하면서 React로 코드를 작성하면 된다. 앞으로 이 블로그를 운영하면서 수정한 부분도 함께 포스팅할 예정이다.

## 참고

* **Gatsby Starters**, https://www.gatsbyjs.org/docs/starters/
* **Gatsby Starters Library**, https://www.gatsbyjs.org/starters/?v=2
* **How Gatsby Works with GitHub Pages**, https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/
* **gatsby-plugin-cname**, https://www.gatsbyjs.org/packages/gatsby-plugin-cname/
* **Configuring a custom domain for your GitHub Pages site**, https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site
* **Introduction to GraphQL**, https://graphql.org/learn/
