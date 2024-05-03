'use client';
import { Fragment } from 'react';
import classes from './Header.module.css';
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
        {<NavMenu />}
      </header>
    </Fragment>
  );
};

export default Header;
