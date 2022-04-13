import React from 'react';
import withHead from '@/component/hoc/WithHead';

function Company() {
  return <h1>기업</h1>;
}

export default withHead(Company, '기업', 'aiworks v2 front Company');
