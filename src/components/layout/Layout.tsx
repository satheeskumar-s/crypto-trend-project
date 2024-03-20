import NavBar from './navbar/NavBar';
import React, { ReactNode } from 'react';

const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className='App'>{props.children}</div>
    </>
  );
};

export default Layout;
