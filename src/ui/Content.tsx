'use client';
import { ReactNode } from 'react';
import classes from './Content.module.css';

const Content: React.FC<{ children: ReactNode }> = (props) => {
  return <div className={classes.content}>{props.children}</div>;
};

export default Content;
