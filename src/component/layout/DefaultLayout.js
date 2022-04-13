import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

function DefaultLayout({ children }) {
  const header = useRef();
  return (
    <div id="layout">
      <Header ref={header} />
      {children}
      <Footer scrollTarget={header} />
    </div>
  );
}

export default DefaultLayout;
