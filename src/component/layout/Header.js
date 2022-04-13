import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { auth } from '@/utils/auth';
import { apiHelper } from '@/utils/api';
import { cookieHelper } from '@/utils/cookie';
import colors from '@/utils/colors';
import { BsPerson } from 'react-icons/bs';

function Header({ style = {}, ...props }, ref) {
  let isMobile = useRef();
  const { isUserLoggedIn } = auth;
  const [headTopPos, setHeadTopPos] = useState('0');
  const [isUserInfoPopup, setUserInfoPopup] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loginStatus, setLoginStatus] = useState();

  const getUserLoginStatus = () => {
    setLoginStatus(isUserLoggedIn());
  };

  // const { isNoticeShown } = useSelector((state) => state.UserPageodySetDataReducer);

  const calculateHeadTopPos = () => {
    const noticeCon = document.querySelector('.notice_wrap');
    const noticeConHeight = noticeCon ? noticeCon.offsetHeight : 0;
    setHeadTopPos(`${42 + noticeConHeight}px`);
  };

  const gnbFix = async () => {
    const mainBody = document.getElementById('layout');
    const thisScrollTop = window.scrollY;
    const head = document.getElementById('top-layout');
    const isFix = mainBody.classList.contains('gnb-fix');

    if (!isMobile.current) {
      mobileClose();
      if (thisScrollTop <= 1) {
        if (isFix) {
          head.style.top = '-39px';
          mainBody.classList.remove('gnb-fix');
          head.style.top = headTopPos;
        }
      } else if (thisScrollTop > 1) {
        if (!mainBody.classList.contains('gnb-fix')) {
          if (!mainBody.classList.contains('gMoving')) {
            mainBody.classList.add('gMoving');
            head.style.top = '-39px';
            setTimeout(() => {
              mainBody.classList.add('gnb-fix');
              head.style.top = '0px';
              mainBody.classList.remove('gMoving');
            }, [500]);
          }
        }
      }
    } else {
      mainBody.classList.remove('gnb-fix');
      mainBody.classList.remove('gMoving');
      head.style.top = headTopPos;
    }
  };

  const mobileOpen = (e) => {
    e.preventDefault();
    document.getElementById('layout').style.overflow = 'hidden';
    document.getElementById('gnb-layout').classList.add('on');
  };

  const mobileClose = (e) => {
    e && e.preventDefault();
    document.getElementById('layout').style.overflow = '';
    document.getElementById('gnb-layout').classList.remove('on');
    document.querySelector('#gnb-layout .depth1 > li').classList.remove('on');
    document.querySelector('#gnb-layout .depth1 > li').removeAttribute('style');
  };

  const handleDrawerMenu = (e) => {
    if (!isMobile.current) {
      return;
    }
    e.preventDefault();

    const target = e.target;
    const targetList = target.tagName === 'SPAN' ? target.parentNode.parentNode : target.parentNode;
    const isOn = targetList.classList.contains('on');
    const onList = document.querySelector('#gnb-layout .depth1 > li.on');

    if (!isOn & isMobile.current) {
      if (onList) {
        onList.classList.add('closing');
        onList.style.height = '39px';
        onList.classList.remove('on');
        onList.classList.remove('closing');
        onList.removeAttribute('style');
      }
      targetList.classList.add('on');
      const dep2Height = targetList.querySelector('.depth2').clientHeight;
      targetList.style.height = Number(dep2Height + 70);
    } else {
      targetList.style.height = '39px';
      targetList.classList.remove('on');
      targetList.removeAttribute('style');
    }
  };

  const handleIsMobile = () => {
    isMobile.current = window.innerWidth <= 1023;
  };

  const showUserInfoPopup = () => {
    setUserInfoPopup(true);
  };
  const hideUserInfoPopup = () => {
    setUserInfoPopup(false);
  };

  const getUserInfo = async () => {
    const response = await apiHelper.get('/members/me');
    console.log(response);
    const memberData = response.data.member;
    setUserInfo({
      ...userInfo,
      login_id: memberData.login_id,
      MemberInfo: {
        ...userInfo.MemberInfo,
        name: memberData.MemberInfo.name,
      },
      MemberStatistic: {
        ...userInfo.MemberStatistic,
        member_total_point: memberData.MemberStatistic.member_total_point,
        member_total_project_cnt: memberData.MemberStatistic.member_total_project_cnt,
      },
    });
  };

  useEffect(() => {
    getUserLoginStatus();
  }, []);

  useEffect(() => {
    if (loginStatus) {
      getUserInfo();
    }
  }, [loginStatus]);

  useEffect(() => {
    handleIsMobile();
    let timer;
    window.addEventListener('resize', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(handleIsMobile, 2000);
    });
    window.addEventListener('scroll', gnbFix);
    window.addEventListener('resize', gnbFix);

    return () => {
      window.addEventListener('resize', handleIsMobile);
      window.removeEventListener('scroll', gnbFix);
      window.removeEventListener('resize', gnbFix);
    };
  }, [headTopPos]);

  // useEffect(() => {
  //   calculateHeadTopPos();
  // }, [isNoticeShown]);

  return (
    <div id="top-layout" {...props} ref={ref} style={{ ...style, top: headTopPos }}>
      <header>
        <h1 className="logo">
          <Link href="/">
            <a>aiworks</a>
          </Link>
        </h1>
        <div className="quick-menu">
          <Link className="home on" href="/">
            <a>홈</a>
          </Link>
          <Link className="proj" href="/add_project">
            <a>참여하기</a>
          </Link>
          <Link className="my" href="/my_project_achieve">
            <a>마이페이지</a>
          </Link>
          <a className="menu mo-open" href="#" onClick={mobileOpen}>
            <span>전체메뉴</span>
          </a>
        </div>
      </header>
      <div id="gnb-layout">
        <div className="util">
          {loginStatus ? (
            <Link className="mypage" href="/my_project_achieve">
              <a>마이페이지</a>
            </Link>
          ) : (
            <Link className="login" href="/login">
              <a>로그인/회원가입</a>
            </Link>
          )}
          <Link className="" href="/company">
            <a>기업</a>
          </Link>
          <span className="user-icon" onMouseOver={showUserInfoPopup}>
            <BsPerson style={{ fontSize: '30px' }}></BsPerson>
          </span>
          {isUserInfoPopup && (
            <div className="user-info-popup" style={{}} onMouseLeave={hideUserInfoPopup}>
              {userInfo ? (
                <>
                  <BsPerson style={{ fontSize: '30px' }}></BsPerson>
                  <div>{userInfo.login_id}</div>
                  <div>{userInfo.MemberInfo.name}</div>
                  <div>포인트 {`${userInfo.MemberStatistic.member_total_point || 0} P`}</div>
                  <div>프로젝트 {`${userInfo.MemberStatistic.member_total_project_cnt || 0}건`}</div>
                  <Link href="/my_project_achieve">
                    <a>정보수정</a>
                  </Link>
                  로그아웃
                </>
              ) : (
                <>
                  <BsPerson style={{ fontSize: '30px' }}></BsPerson>
                  로그인 후 내 정보를 확인하세요
                  <Link href="/login">
                    <a>로그인하기</a>
                  </Link>
                  <Link href="/signup">
                    <a>회원가입</a>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <nav className="gnb-wrap">
          <ul className="depth1">
            <li>
              <Link href="/add_project" onClick={handleDrawerMenu}>
                <a>
                  <span>참여하기</span>
                </a>
              </Link>
              <ul className="depth2">
                <li>
                  <Link href="/add_project">
                    <a>프로젝트</a>
                  </Link>
                </li>
                <li>
                  <Link href="/recruitment">
                    <a>작업자모집</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/donate">
                <a>
                  <span>기부하기</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://aiworksacademy.co.kr/" target="_blank" rel="noreferrer">
                <a>
                  <span>aiworks 아카데미</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/participate" onClick={handleDrawerMenu}>
                <a>
                  <span>이용하기</span>
                </a>
              </Link>
              <ul className="depth2">
                <li>
                  <Link href="/participate">
                    <a>이용안내</a>
                  </Link>
                </li>
                <li>
                  <Link href="/notice">
                    <a>공지사항</a>
                  </Link>
                </li>
                <li>
                  <Link href="/event">
                    <a>이벤트</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a>자주하는질문</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/introduction" onClick={handleDrawerMenu}>
                <a>
                  <span>aiworks 이야기</span>
                </a>
              </Link>
              <ul className="depth2">
                <li>
                  <Link href="/introduction">
                    <a>aiworks 소개</a>
                  </Link>
                </li>
                <li>
                  <Link href="/story">
                    <a>우리이야기</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact_us">
                    <a>기업 문의</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <a className="mo-close" href="#" onClick={mobileClose}>
          닫기
        </a>
        <span className="mo-bg" onClick={mobileClose}></span>
      </div>
      <style jsx>{`
        #top-layout {
          width: 100%;
          padding: 0 60px;
          box-sizing: border-box;
          position: absolute;
          top: 42px;
          left: 0;
          z-index: 9;
          -webkit-transition: top 0.5s;
          transition: top 0.5s;
        }
        #top-layout header {
          display: flex;
          justify-content: space-between;
        }
        #top-layout header h1 {
          margin: 0 0;
        }
        #top-layout header .logo {
          width: 166px;
          height: 39px;
        }
        #top-layout header .logo a {
          width: 100%;
          height: 100%;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/logo.png) no-repeat center center;
          text-indent: -9999px;
          display: inline-block;
        }
        #top-layout header .quick-menu {
          display: none;
        }
        .gnb-fix #top-layout {
          position: fixed;
        }
        .gnb-fix #top-layout::before {
          width: 100%;
          height: 100%;
          background-color: #fff;
          content: '';
          opacity: 0.9;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .gnb-fix #top-layout header {
          padding: 11px 0;
        }
        .gnb-fix #top-layout header .logo {
          width: 117px;
          height: 28px;
        }
        .gnb-fix #top-layout header .logo a {
          background-size: contain;
        }
        .sub #top-layout header .logo a {
          background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/logo_sub.png);
        }
        .sub.gnb-fix #top-layout header .logo a {
          background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/logo.png);
        }
        #gnb-layout {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 60px;
        }
        #gnb-layout ul {
          margin: 0 0;
        }
        #gnb-layout .util {
          padding: 3px 0;
          display: inline-block;
          float: right;
        }
        #gnb-layout .util a {
          width: 120px;
          font-weight: 400;
          font-size: 15px;
          color: #2f2f2f;
          text-align: center;
          line-height: 31px;
          display: inline-block;
          float: left;
          border: 1px solid rgba(35, 35, 35, 0.3);
          border-radius: 16px;
          cursor: pointer;
        }
        #gnb-layout .util a + a {
          margin-left: 14px;
        }
        #gnb-layout .util a:hover {
          background-color: #fff;
          border-color: #fff;
          transition: all 0.2s;
        }
        #gnb-layout .util .user-icon {
          position: relative;
        }

        #gnb-layout .util .user-info-popup {
          position: absolute;
          width: 300px;
          height: 300px;
          background-color: ${colors.gray[5]};
        }

        #gnb-layout .gnb-wrap {
          margin-right: 50px;
          display: inline-block;
          float: left;
        }
        #gnb-layout .depth1 {
          display: inline-block;
        }
        #gnb-layout .depth1 > li {
          display: inline-block;
          float: left;
          position: relative;
          -webkit-transition: height 0.5s;
          transition: height 0.5s;
        }
        #gnb-layout .depth1 > li + li {
          margin-left: 30px;
        }
        #gnb-layout .depth1 > li > a {
          display: table;
        }
        #gnb-layout .depth1 > li > a span {
          height: 39px;
          font-weight: 500;
          font-size: 16px;
          color: #2f2f2f;
          line-height: 20px;
          display: table-cell;
          vertical-align: middle;
        }
        #gnb-layout .depth1 > li:hover > ul {
          display: inline-block;
        }
        #gnb-layout .depth2 {
          width: 126px;
          padding: 27px 0 18px 0;
          margin-left: -63px;
          display: none;
          position: absolute;
          top: 39px;
          left: 50%;
          z-index: 1;
        }
        #gnb-layout .depth2::before {
          width: 100%;
          background-color: #fff;
          content: '';
          border-radius: 10px;
          position: absolute;
          top: 10px;
          bottom: 0;
          left: 0;
          z-index: -1;
        }
        #gnb-layout .depth2::after {
          content: '';
          margin-left: -10px;
          display: inline-block;
          border-bottom: 10px solid #fff;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          top: 0;
          left: 50%;
        }
        #gnb-layout .depth2 > li {
          width: 100%;
          padding: 4px 0;
          display: inline-block;
          float: left;
        }
        #gnb-layout .depth2 > li + li {
          margin-top: 7px;
        }
        #gnb-layout .depth2 > li > a {
          width: 100%;
          font-weight: 500;
          font-size: 14px;
          color: #6f6b6d;
          text-align: center;
          line-height: 20px;
          display: inline-block;
        }
        #gnb-layout .depth2 > li > a:hover {
          color: #2f2f2f;
        }
        #gnb-layout .mo-close,
        #gnb-layout .mo-bg {
          display: none;
        }
        .gnb-fix #gnb-layout {
          top: 11px;
        }
        .gnb-fix #gnb-layout .util {
          padding: 0;
        }
        .gnb-fix #gnb-layout .util a {
          width: auto;
          font-weight: 300;
          font-size: 15px;
          color: #000;
          line-height: 28px;
          border: 0;
        }
        .gnb-fix #gnb-layout .util a::after {
          width: 0;
          height: 28px;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/arrow_6x11_black_right.png) no-repeat
            center center;
          content: '';
          display: inline-block;
          vertical-align: top;
          opacity: 0;
          transition: all 0.15s ease;
        }
        .gnb-fix #gnb-layout .util a:hover {
          background-color: transparent;
        }
        .gnb-fix #gnb-layout .util a:hover::after {
          width: 6px;
          margin-left: 10px;
          opacity: 1;
        }
        .gnb-fix #gnb-layout .util a + a {
          margin-left: 29px;
          position: relative;
        }
        .gnb-fix #gnb-layout .util a + a::before {
          width: 1px;
          height: 14px;
          background-color: #000;
          content: '';
          margin-top: -7px;
          opacity: 0.15;
          position: absolute;
          top: 50%;
          left: -15px;
        }
        .gnb-fix #gnb-layout .gnb-wrap {
          margin-right: 35px;
        }
        .gnb-fix #gnb-layout .depth1 > li > a span {
          height: 28px;
          font-weight: 400;
          font-size: 15px;
          color: #444;
          line-height: 28px;
        }
        .gnb-fix #gnb-layout .depth1 > li > a:hover span {
          color: #ff8a00;
        }
        .gnb-fix #gnb-layout .depth1 > li + li {
          margin-left: 35px;
        }
        .gnb-fix #gnb-layout .depth1 > li:hover > ul {
          display: none;
        }
        .sub #gnb-layout .depth1 > li > a span {
          color: #fff;
        }
        .sub #gnb-layout .util a {
          color: #fff;
          border-color: #fff;
        }
        .sub.gnb-fix #gnb-layout .util a {
          color: #000;
        }
        .sub.gnb-fix #gnb-layout .depth1 > li > a span {
          color: #444;
        }
        .sub.gnb-fix #gnb-layout .depth1 > li > a:hover span {
          color: #ff8a00;
        }
        .sub #gnb-layout .depth1 > li.active > a {
          position: relative;
        }
        .sub #gnb-layout .depth1 > li.active > a::before {
          width: 100%;
          height: 2px;
          background-color: #fff;
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
        }
        .sub #gnb-layout .depth1 > li.active:hover > a::before {
          display: none;
        }
        .sub #gnb-layout .depth2::before {
          background-color: transparent;
          opacity: 1;
          box-sizing: border-box;
          border: 2px solid #fff;
          border-top: 0;
          border-radius: 0 0 10px 10px;
          top: 16px;
        }
        .sub #gnb-layout .depth2::after {
          width: 100%;
          height: 16px;
          background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/gnb_2depth_menu_line.png) no-repeat
            center center;
          margin: 0;
          border: 0;
          opacity: 1;
          left: 0;
        }
        .sub #gnb-layout .depth2 > li > a {
          color: #fff;
          opacity: 0.6;
        }
        .sub #gnb-layout .depth2 > li.on > a,
        .sub #gnb-layout .depth2 > li > a:hover {
          opacity: 1;
        }
        .sub.gnb-fix #gnb-layout .depth1 > li.active > a::before {
          display: none;
        }
        @media (max-width: 1600px) {
          #top-layout {
            padding: 0 15px;
          }
          #gnb-layout {
            right: 15px;
          }
        }
        @media (max-width: 1023px) {
          body {
            padding-bottom: 58px;
            box-sizing: border-box;
          }
          #top-layout header .quick-menu {
            width: 100%;
            background-color: #7c4def;
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
          }
          #top-layout header .quick-menu a {
            height: 58px;
            background: no-repeat center 10px;
            background-size: auto 18px;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 25px;
            padding: 28px 0 5px 0;
            opacity: 0.3;
            box-sizing: border-box;
            flex: 1;
            position: relative;
          }
          #top-layout header .quick-menu a.home {
            background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/quick_ico_home.png);
          }
          #top-layout header .quick-menu a.proj {
            background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/quick_ico_proj.png);
          }
          #top-layout header .quick-menu a.my {
            background-image: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/quick_ico_my.png);
          }
          #top-layout header .quick-menu a.menu span {
            width: 26px;
            height: 16px;
            margin-left: -13px;
            display: inline-block;
            box-sizing: border-box;
            border-top: 2px solid #9d79f3;
            border-bottom: 2px solid #9d79f3;
            position: absolute;
            top: 11px;
            left: 50%;
          }
          #top-layout header .quick-menu a.menu span::after {
            width: 100%;
            height: 2px;
            background-color: #9d79f3;
            content: '';
            margin: -1px 0 0 -13px;
            position: absolute;
            top: 50%;
            left: 50%;
          }
          #top-layout header .quick-menu a.on,
          #top-layout header .quick-menu a:hover,
          #top-layout header .quick-menu a:focus {
            opacity: 1;
          }
          #gnb-layout {
            display: none;
          }
          #gnb-layout.on {
            width: 100%;
            height: 100%;
            display: inline-block;
            overflow-y: auto;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 9;
          }
          #gnb-layout.on .mo-bg {
            width: 100%;
            height: 100%;
            background-color: #000;
            display: inline-block;
            opacity: 0.6;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
          }
          #gnb-layout.on .mo-close {
            width: 29px;
            height: 29px;
            background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/menu_ico_close.png) no-repeat center
              center;
            background-size: contain;
            text-indent: -9999px;
            display: inline-block;
            position: absolute;
            top: 32px;
            right: 36px;
          }
          #gnb-layout.on .util {
            position: absolute;
            top: 93px;
            right: 36px;
            z-index: 1;
          }
          #gnb-layout.on .util a {
            width: auto;
            font-size: 13px;
            color: #fff;
            line-height: 19px;
            border: 0;
          }
          #gnb-layout.on .util a + a {
            margin-left: 26px;
          }
          #gnb-layout.on .util a:hover {
            background-color: transparent;
          }
          #gnb-layout.on .gnb-wrap {
            width: 428px;
            min-height: 100%;
            background-color: #000;
            padding: 142px 40px 80px 40px;
            margin: 0;
            box-sizing: border-box;
            float: right;
            position: relative;
          }
          #gnb-layout.on .gnb-wrap::before {
            width: 117px;
            height: 27px;
            background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/logo_sub.png) no-repeat center center;
            background-size: 117px 27px;
            content: '';
            position: absolute;
            top: 32px;
            left: 36px;
          }
          #gnb-layout.on .depth1 {
            width: 100%;
          }
          #gnb-layout.on .depth1 > li {
            width: 100%;
          }
          #gnb-layout.on .depth1 > li + li {
            margin-left: 0;
            margin-top: 42px;
          }
          #gnb-layout.on .depth1 > li > a {
            width: 100%;
            background: url(https://boaiworkscdn.azureedge.net/aiworks/weven_data/app_aiworks/react/assets/images/common/mo/gnb_ico_down.png) no-repeat right
              center;
            background-size: 16px 9px;
            padding-right: 20px;
            display: inline-block;
            box-sizing: border-box;
            position: relative;
          }
          #gnb-layout.on .depth1 > li > a::after {
            width: 0;
            height: 3px;
            background-color: #ffde00;
            content: '';
            margin-top: -1px;
            position: absolute;
            top: 50%;
            right: 0;
          }
          #gnb-layout.on .depth1 > li > a span {
            height: auto;
            background-color: #000;
            font-size: 20px;
            color: #fff;
            line-height: 26px;
            padding-right: 27px;
            display: inline-block;
            position: relative;
            z-index: 1;
          }
          #gnb-layout.on .depth1 > li:hover > ul {
            display: none;
          }
          #gnb-layout.on .depth2::before,
          #gnb-layout.on .depth2::after {
            display: none;
          }
          #gnb-layout.on .depth1 > li > ul {
            width: 100%;
            padding: 0;
            margin: 20px 0 50px 0;
            position: relative;
            top: auto;
            left: auto;
            transition: all 0.5s;
          }
          #gnb-layout.on .depth1 > li.on > ul {
            display: inline-block;
          }
          #gnb-layout.on .depth1 > li.on > a {
            background-image: none;
          }
          #gnb-layout.on .depth1 > li.on > a span {
            color: #ffde00;
          }
          #gnb-layout.on .depth1 > li.on > a::after {
            width: 100%;
            transition: all 0.5s;
          }
          #gnb-layout.on .depth1 > li.on.closing > a::after {
            width: 0;
            transition: all 0.5s;
          }
          #gnb-layout.on .depth2 > li {
            padding: 0;
          }
          #gnb-layout.on .depth2 > li > a {
            font-size: 18px;
            color: #fff;
            text-align: left;
            line-height: 29px;
          }
          .sub #gnb-layout.on .depth1 > li.active > a::before {
            display: none;
          }
          .sub #gnb-layout.on .depth2 > li > a {
            opacity: 1;
          }
          .sub #gnb-layout.on .depth2 > li.on > a {
            color: #ffde00;
          }
        }
        @media (max-width: 480px) {
          #top-layout header .logo {
            width: 130px;
            height: 30px;
          }
          #top-layout header .logo a {
            background-size: contain;
          }
          #gnb-layout.on .mo-close {
            width: 22px;
            height: 22px;
          }
          #gnb-layout.on .util a {
            font-size: 11px;
          }
          #gnb-layout.on .gnb-wrap {
            width: 90%;
          }
          #gnb-layout.on .depth1 > li {
            padding: 0 7px 0 7px;
          }
          #gnb-layout.on .depth1 > li + li {
            margin-top: 30px;
          }
          #gnb-layout.on .depth1 > li > a span {
            font-size: 15px;
          }
          #gnb-layout.on .depth2 > li > a {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default forwardRef(Header);
