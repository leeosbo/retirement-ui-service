'use client';
import { ReactNode } from 'react';
import classes from './FlexContainer.module.css';

const FlexContainer: React.FC<{ children: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className={classes.container}>
      {title != undefined && (
        <div className={classes.titleDiv}>
          <h1>{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default FlexContainer;
