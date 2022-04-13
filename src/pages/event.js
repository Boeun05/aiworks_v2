import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Event() {
  return <h1>이벤트</h1>;
}

export default withHead(Event, '이벤트', 'aiworks v2 front Event');
