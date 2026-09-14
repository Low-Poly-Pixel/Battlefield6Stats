import {UnstyledButton} from '@mantine/core';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

import classes from './Button.module.css';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  children: ReactNode;
  icon?: ReactNode;
  destructive?: boolean;
}

export const Button = ({children, icon, destructive = false, ...rest}: ButtonProps) => {
  return (
    <UnstyledButton type="button" className={classes.root} data-destructive={destructive} {...rest}>
      {icon ? <span className={classes.icon}>{icon}</span> : null}
      {children}
    </UnstyledButton>
  );
};
