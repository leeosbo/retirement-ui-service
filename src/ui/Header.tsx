'use client';
import { Fragment, useEffect, useState } from 'react';
import classes from './Header.module.css';
// import MobileMenu from './MobileMenu';
import NavMenu from './NavMenu';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <nav className={classes.navHome}>
          <Link href={`/`} className={`${classes.link} ${classes.homeIcon}`}>
            <i className='fa fa-home'></i>
          </Link>
        </nav>
        {<NavMenu largeScreen={true} />}
      </header>
    </Fragment>
  );
};

export default Header;
