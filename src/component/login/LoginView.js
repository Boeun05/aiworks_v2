import React from 'react';

function LoginView({ signInClick, onUserProfileHandler, snsLogin }) {
  return (
    <div id="login">
      <div className="panel">
        <div className="panel_heading">Login</div>
        <div className="panel_body">
          <form>
            <div className="form_group">
              <input className={'form_control'} placeholder="id" name="id" autoFocus onChange={onUserProfileHandler} />
            </div>
            <div className="form_group">
              <input
                className={'form_control'}
                placeholder="Password"
                name="password"
                type="password"
                onChange={onUserProfileHandler}
                onKeyPress={(e) => e.key === 'Enter' && signInClick(e)}
              />
            </div>
            <div className="checkbox">
              <label>
                <input name="remember" type="checkbox" value="Remember Me" />
                Remember Me
              </label>
            </div>
            <div className="btn btn-primary " onClick={signInClick}>
              Login
            </div>
          </form>
          <button onClick={() => snsLogin('kakao')}>카카오톡 로그인</button>
          <button onClick={() => snsLogin('naver')}>네이버 로그인</button>
        </div>
      </div>
      <style jsx>{`
        input {
          outline: #30a5ff;
        }

        body {
          font-size: 14px;
          color: #444444;
          font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        @media (min-width: 992px) {
          #login {
            margin-left: 33.33333333%;
            float: left;
            width: 33.33333333%;
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }
        }

        @media (max-width: 991px) and (min-width: 768px) {
          #login {
            margin-left: 16.66666667%;
            width: 66.66666667%;
            float: left;
          }
        }

        @media (max-width: 767px) {
          #login {
            margin-left: 8.33333333%;
            width: 83.33333333%;
            float: left;
          }
        }

        #login > .panel {
          margin-top: 60px;
          border: 0;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
        }

        #login .panel > .panel_heading {
          background: #fff;
          border-bottom: 1px solid #e9ecf2;
          color: #444444;
          font-size: 20px;
          font-weight: 300;
          letter-spacing: 0.025em;
          height: 60px;
          line-height: 38px;
          padding: 10px 15px;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
        }

        #login .panel > .panel_body {
          padding: 15px;
        }

        #login .panel .panel_body:after {
          clear: both;
          display: table;
          content: ' ';
        }

        #login .panel_body > form > .form_group {
          margin-bottom: 15px;
        }

        #login .panel_body .form_control {
          border: 1px solid #ddd;
          box-shadow: none;
          height: 46px;
          display: block;
          width: 100%;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }

        #login .panel_body .form_blue:focus {
          border: 1px solid #30a5ff;
          outline: 0;
          box-shadow: inset 0px 0px 0px 1px #30a5ff;
        }

        #login .panel_body .checkbox {
          position: relative;
          display: block;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        #login .panel_body .checkbox label {
          min-height: 20px;
          padding-left: 20px;
          margin-bottom: 0;
          font-weight: 400;
          cursor: pointer;
          display: inline-block;
          max-width: 100%;
        }

        #login .panel_body .checkbox input[type='checkbox'] {
          position: absolute;
          margin: 2px 0 0 -20px;
          line-height: normal;
          padding: 0;
        }

        #login .panel_body .btn {
          display: inline-block;
          padding: 6px 12px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.42857143;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          user-select: none;
          background-image: none;
          border: 1px solid transparent;
          border-radius: 4px;
        }

        #login .panel_body .btn-primary {
          background-color: #30a5ff;
          border-color: #30a5ff;
          color: #fff;
        }

        #login .panel_body .form_red:focus {
          box-shadow: inset 0px 0px 0px 1px #f9243f;
          border: 1px solid #f9243f;
        }
      `}</style>
    </div>
  );
}

export default LoginView;
