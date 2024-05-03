'use client';
import { ReactNode, useContext } from 'react';
import classes from './Content.module.css';
import { PageContext } from '@/store/page-context';

const Content: React.FC<{ children: ReactNode }> = (props) => {
  const { title } = useContext(PageContext);
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {props.children}
    </div>
  );
};

export default Content;
