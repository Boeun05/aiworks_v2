import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Story() {
  return <h1>우리이야기</h1>;
}

export default withHead(Story, '우리이야기', 'aiworks v2 front Story');
