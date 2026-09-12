import {UnstyledButton} from '@mantine/core';
import type {ReactNode} from 'react';
import {useId, useState} from 'react';

import classes from './Sidebar.module.css';

interface SidebarProps {
  label: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CaretIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
    className={classes.caret}
  >
    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
  </svg>
);

export const Sidebar = ({label, children, open, defaultOpen = true, onOpenChange}: SidebarProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const contentId = useId();
  const isOpen = open ?? uncontrolledOpen;

  const handleToggle = () => {
    const next = !isOpen;

    if (open === undefined) {
      setUncontrolledOpen(next);
    }

    onOpenChange?.(next);
  };

  return (
    <nav aria-label={label} className={classes.root} data-open={isOpen}>
      <UnstyledButton
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className={classes.toggle}
        onClick={handleToggle}
      >
        <CaretIcon />
      </UnstyledButton>
      <div id={contentId} className={classes.content} inert={!isOpen}>
        {children}
      </div>
    </nav>
  );
};
