import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Main() {
  return <h1>main</h1>;
}

export default withHead(Main, 'aiworks', 'aiworks v2 front aiworks');
