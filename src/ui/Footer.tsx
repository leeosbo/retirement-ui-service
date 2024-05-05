'use client';
import classes from './Footer.module.css';

const Footer = () => {
  const today = new Date();

  return (
    <footer className={classes.footer}>
      <div>Brought to you by Financial Advisement Incorporated</div>
      <div>
        Copyright © {today.getFullYear()} The Retirement Planning System
      </div>
    </footer>
  );
};

export default Footer;
