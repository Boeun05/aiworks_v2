import React from 'react';
import withHead from '@/component/hoc/WithHead';

function myProjectAchieve() {
  return <h1>마이페이지</h1>;
}

export default withHead(myProjectAchieve, '마이페이지', 'aiworks v2 front myProjectAchieve');
