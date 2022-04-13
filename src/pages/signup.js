import React from 'react';
import withHead from '@/component/hoc/WithHead';
import SignupView from '@/component/signup/SignupView';

function Signup() {
  return <SignupView />;
}

export default withHead(Signup, '회원가입', 'aiworks v2 front signup');
