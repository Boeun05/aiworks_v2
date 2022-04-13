import React from 'react';
import colors from '@/utils/colors';

function Footer({ style = {}, scrollTarget, ...props }) {
  return (
    <div id="foot-layout" style={style} {...props}>
      <a
        className="mov-top"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        상단이동
      </a>
      <div className="foot-wrap">
        <div className="util">
          <ul>
            <li>
              <a href="https://www.testworks.co.kr/">회사소개</a>
            </li>
            <li>
              <a href="/page/terms_of_service">이용약관</a>
            </li>
            <li className="ul">
              <a href="/page/privacy_policy">개인정보처리방침</a>
            </li>
            <li>
              <a href="https://testworks.co.kr/DataVoucher/">데이터바우처 지원사업</a>
            </li>
            <li>
              <a href="/ICT_education_campaign/">데이터 어노테이터 교육문의</a>
            </li>
          </ul>
        </div>
        <div className="add">
          <address>
            <span className="n1">서울특별시 송파구 백제고분로 41길 40 부영빌딩 401호 주식회사 테스트웍스</span>
            <span className="n2">
              <em>상호명</em> (주)테스트웍스
            </span>
            <span className="n3">
              <em>대표자명</em> 윤석원
            </span>
            <br />
            <span className="n4">
              <em>사업자번호</em> 517-88-00087
            </span>
            <br className="mo2" />
            <span className="n5">
              <em>이메일</em> help@testworks.co.kr
            </span>
            <br className="mo" />
            <span className="n6">
              <em>고객센터</em> T 070.4454.7370
              <br className="mo" />
              (상담시간: 오후 1시30분 ~ 오후 5시30분 주말, 공휴일 제외)
            </span>
          </address>
          <p className="copy">COPYRIGHT 2019. TESTWORKS. ALL RIGHTS RESERVED</p>
        </div>
      </div>
      <style jsx>{`
        #foot-layout {
          width: 100%;
          height: 317px;
          text-align: center;
          padding: 76px 0 0 0;
          box-sizing: border-box;
          position: relative;
        }
        #foot-layout .mov-top {
          width: 40px;
          height: 40px;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/fixed_top_btn.png) no-repeat center
            center #fcd133;
          text-indent: -9999px;
          display: inline-block;
          border-radius: 50%;
          position: fixed;
          right: 40px;
          bottom: 40px;
          z-index: 10;
        }
        #foot-layout .mov-top:hover {
          background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/fixed_top_btn_hover.png);
          background-color: #ff8a00;
          transition: all 0.2s;
        }
        #foot-layout::before {
          height: 100%;
          background-color: #ffd200;
          content: '';
          margin-left: -419px;
          position: absolute;
          top: 0;
          right: 0;
          left: 50%;
        }
        #foot-layout::after {
          width: 181px;
          height: 100%;
          content: '';
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/footer_bg.png) no-repeat center center;
          margin-left: -600px;
          position: absolute;
          top: 0;
          left: 50%;
        }
        #foot-layout .foot-wrap {
          width: 1170px;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/footer_logo.png) no-repeat right top;
          text-align: right;
          padding: 62px 0 0 0;
          display: inline-block;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }
        #foot-layout .foot-wrap .util {
          display: inline-block;
        }
        #foot-layout .foot-wrap .util li {
          padding: 0 15px 0 14px;
          display: inline-block;
          float: left;
          position: relative;
        }
        #foot-layout .foot-wrap .util li:last-child {
          padding-right: 0;
        }
        #foot-layout .foot-wrap .util li::before {
          width: 1px;
          height: 14px;
          background-color: rgba(0, 0, 0, 0.3);
          content: '';
          position: absolute;
          top: 3px;
          right: 0px;
        }
        #foot-layout .foot-wrap .util li:last-child::before {
          display: none;
        }
        #foot-layout .foot-wrap .util li a {
          font-weight: 500;
          font-size: 15px;
          color: #000;
          line-height: 21px;
          position: relative;
        }
        #foot-layout .foot-wrap .util li a::after {
          width: 0;
          height: 100%;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/arrow_6x11_black_right.png) no-repeat
            center center;
          content: '';
          opacity: 0;
          position: absolute;
          top: 0;
          right: 0;
        }
        #foot-layout .foot-wrap .util li:hover a {
          padding-right: 16px;
          transition: all 0.15s ease;
        }
        #foot-layout .foot-wrap .util li:hover a::after {
          width: 6px;
          opacity: 1;
          transition: all 0.15s ease;
        }
        #foot-layout .foot-wrap .util li.ul a {
          border-bottom: 1px solid #000;
        }
        #foot-layout .foot-wrap .add {
          text-align: right;
          margin-top: 15px;
          display: inline-block;
        }
        #foot-layout .foot-wrap .add address {
          display: inline-block;
        }
        #foot-layout .foot-wrap .add span {
          font-style: normal;
          font-size: 14px;
          color: #000;
          line-height: 28px;
          margin: 0 5px;
          display: inline-block;
        }
        #foot-layout .foot-wrap .add span em {
          display: inline-block;
        }
        #foot-layout .foot-wrap .add .n3,
        #foot-layout .foot-wrap .add .n6 {
          margin-right: 0;
        }
        #foot-layout .foot-wrap .add .mo,
        #foot-layout .foot-wrap .add .mo2 {
          display: none;
        }
        #foot-layout .foot-wrap .add .copy {
          font-family: 'Roboto';
          font-weight: 400;
          font-size: 11px;
          color: #191500;
          line-height: 17px;
          margin-top: 10px;
        }
        @media (max-width: 1199px) {
          #foot-layout {
            padding: 76px 15px 0 15px;
          }
          #foot-layout::before {
            margin-left: 0;
            left: 181px;
          }
          #foot-layout::after {
            margin-left: 0;
            left: 0;
          }
          #foot-layout .foot-wrap {
            width: 100%;
          }
        }
        @media (max-width: 1023px) {
          #foot-layout {
            height: auto;
            padding-top: 66px;
            padding-bottom: 126px;
          }
          #foot-layout::before {
            left: 0;
          }
          #foot-layout::after {
            display: none;
          }
          #foot-layout .foot-wrap {
            background-image: none;
            padding: 0;
            text-align: center;
          }
          #foot-layout .foot-wrap .util li:hover a {
            padding-right: 0;
          }
          #foot-layout .foot-wrap .util li:hover a::after {
            width: 0;
          }
          #foot-layout .foot-wrap .add {
            text-align: center;
          }
          #foot-layout .foot-wrap .add address {
            max-width: 500px;
          }
          #foot-layout .foot-wrap .add .mo {
            display: inline;
          }
          #foot-layout .foot-wrap .add .copy {
            background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/footer_logo.png) no-repeat center 18px;
            background-size: 87px auto;
            padding-top: 56px;
            margin-top: 0;
          }
          #foot-layout .mov-top {
            width: 36px;
            height: 36px;
            background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/footer_go_top_btn.png);
            background-color: transparent;
            margin-right: -18px;
            border: 1px solid ${colors.white};
            box-sizing: border-box;
            position: absolute;
            right: 50%;
            bottom: 77px;
          }
          #foot-layout .mov-top:hover {
            background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/footer_go_top_btn.png);
            background-color: transparent;
          }
        }
        @media (max-width: 767px) {
          #foot-layout .foot-wrap .util ul {
            width: 360px;
            display: inline-block;
          }
          #foot-layout .foot-wrap .util li {
            float: none;
          }
          #foot-layout .foot-wrap .util li.ul::before {
            display: none;
          }
          #foot-layout .foot-wrap .util li:nth-child(-n + 3) {
            margin-bottom: 15px;
          }
          #foot-layout .foot-wrap .add .mo2 {
            display: inline;
          }
        }
        @media (max-width: 380px) {
          #foot-layout .foot-wrap .util ul {
            width: 100%;
          }
          #foot-layout .foot-wrap .util li {
            padding: 0 10px 0 10px;
          }
          #foot-layout .foot-wrap .util li a {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Footer;
