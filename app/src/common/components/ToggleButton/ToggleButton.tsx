import {UnstyledButton} from '@mantine/core';
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import {useState} from 'react';

import classes from './ToggleButton.module.css';

interface ToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'onClick'> {
  children: ReactNode;
  icon?: ReactNode;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}
export const ToggleButton = ({
  children,
  icon,
  pressed,
  defaultPressed = false,
  onPressedChange,
  ...rest
}: ToggleButtonProps) => {
  const [uncontrolledPressed, setUncontrolledPressed] = useState<boolean>(defaultPressed);
  const isPressed = pressed ?? uncontrolledPressed;

  const handleClick = () => {
    const next = !isPressed;

    if (pressed === undefined) {
      setUncontrolledPressed(next);
    }

    onPressedChange?.(next);
  };

  return (
    <UnstyledButton type="button" aria-pressed={isPressed} className={classes.root} onClick={handleClick} {...rest}>
      {icon ? <span className={classes.icon}>{icon}</span> : null}
      {children}
    </UnstyledButton>
  );
};
