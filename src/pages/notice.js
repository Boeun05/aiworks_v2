import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Notice() {
  return <h1>공지사항</h1>;
}

export default withHead(Notice, '공지사항', 'aiworks v2 front Notice');
