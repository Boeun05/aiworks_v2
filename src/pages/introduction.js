import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Introduction() {
  return <h1>aiworks 소개</h1>;
}

export default withHead(Introduction, 'aiworks 소개', 'aiworks v2 front Introduction');
