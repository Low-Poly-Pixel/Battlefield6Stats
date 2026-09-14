import {Divider, Group} from '@mantine/core';
import {useId} from 'react';

import classes from './Header.module.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({title, subtitle}: HeaderProps) => {
  const titleId = useId();

  return (
    <Group
      component="header"
      aria-labelledby={titleId}
      className={classes.root}
      gap="sm"
      wrap="nowrap"
    >
      <img src={`${import.meta.env.BASE_URL}favicon.ico`} alt="" className={classes.logo} />
      <Divider orientation="vertical" className={classes.divider} />
      <div className={classes.text}>
        <h1 id={titleId} className={classes.title}>
          {title}
        </h1>
        {subtitle ? <p className={classes.subtitle}>{subtitle}</p> : null}
      </div>
    </Group>
  );
};
