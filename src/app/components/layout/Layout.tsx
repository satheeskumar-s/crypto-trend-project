import NavBar from './navbar/NavBar';
import React, { ReactNode } from 'react';

const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Layout;
