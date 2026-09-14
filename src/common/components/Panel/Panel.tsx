import type {ReactNode} from 'react';
import {useId} from 'react';

import classes from './Panel.module.css';

interface PanelProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export const Panel = ({title, children, subtitle}: PanelProps) => {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className={classes.root}>
      <div className={classes.header}>
        <h3 id={titleId} className={classes.title}>
          {title}
        </h3>
        {subtitle ? <p className={classes.subtitle}>{subtitle}</p> : null}
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};
