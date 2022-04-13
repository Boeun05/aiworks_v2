import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta property="fb:app_id" content="aiworks" />
          <meta property="og:type" content="website" />
          <meta name="apple-mobile-web-app-title" content="aiworks" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta property="og:url" content="https://aiworks.co.kr" />
          <meta property="og:url" content="co.kr" />
          <meta name="title" content="aiworks" />
          <meta
            name="description"
            content="누구나 쉽게 온라인 작업을 통해 수익을 확보하고 특별한 봉사 활동에도 참여할 수 있는 데이터 수집 가공 전문 플랫폼을 이용해 보세요!"
          />
          <meta
            name="keyword"
            content="알바,부업,재택알바,재택,인공지능,ai,works,수집,가공,데이터 어노테이터, 크라우드 소싱,crowd sourcing, 부업, 그린뉴딜, 부수입"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="aiworks" />
          <meta
            property="og:description"
            content="누구나 쉽게 온라인 작업을 통해 수익을 확보하고 특별한 봉사 활동에도 참여할 수 있는 데이터 수집 가공 전문 플랫폼을 이용해 보세요!"
          />
          <meta
            property="og:keyword"
            content="알바,부업,재택알바,재택,인공지능,ai,works,수집,가공,데이터 어노테이터, 크라우드 소싱,crowd sourcing, 부업, 그린뉴딜, 부수입"
          />
          <link rel="canonical" href="//aiworks.co.kr/" />
          <meta property="image" content="https://aiworks.co.kr/weven_data/app_aiworks/common/img/seo_640_320_v2.jpg" />
          <meta property="og:image" content="https://aiworks.co.kr/weven_data/app_aiworks/common/img/seo_640_320_v2.jpg" />
          <meta property="”og:image:width”" content='”640"/' />
          <meta property="”og:image:height”" content='”320"/' />
          <meta itemProp="name" content="aiworks" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="https://aiworks.co.kr/favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="https://aiworks.co.kr/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
