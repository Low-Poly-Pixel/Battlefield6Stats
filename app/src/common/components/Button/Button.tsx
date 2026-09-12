import {UnstyledButton} from '@mantine/core';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

import classes from './Button.module.css';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  children: ReactNode;
  icon?: ReactNode;
}

export const Button = ({children, icon, ...rest}: ButtonProps) => {
  return (
    <UnstyledButton type="button" className={classes.root} {...rest}>
      {icon ? <span className={classes.icon}>{icon}</span> : null}
      {children}
    </UnstyledButton>
  );
};
