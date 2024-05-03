import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const SiteLayout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Fragment>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Fragment>
  );
};

export default SiteLayout;
