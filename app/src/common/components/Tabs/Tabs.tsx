import {Tabs as MantineTabs} from '@mantine/core';
import type {ReactNode} from 'react';
import {useId} from 'react';

import classes from './Tabs.module.css';

type TabOption = {
  type: 'tab';
  value: string;
  label: string;
  icon?: ReactNode;
};

type TabDivider = {
  type: 'divider';
};

export type TabEntry = TabOption | TabDivider;

interface TabsProps {
  items: TabEntry[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Tabs = ({items, title, orientation = 'horizontal', value, defaultValue, onChange}: TabsProps) => {
  const titleId = useId();

  const handleChange = (next: string | null) => {
    if (next !== null) {
      onChange?.(next);
    }
  };

  return (
    <div className={classes.root} data-orientation={orientation}>
      {title ? (
        <span id={titleId} className={classes.title}>
          {title}
        </span>
      ) : null}
      <MantineTabs unstyled value={value} defaultValue={defaultValue} onChange={handleChange} orientation={orientation}>
        <MantineTabs.List className={classes.list} aria-labelledby={title ? titleId : undefined}>
          {items.map((item, index) =>
            item.type === 'divider' ? (
              <div key={`divider-${String(index)}`} className={classes.divider} aria-hidden="true" />
            ) : (
              <MantineTabs.Tab
                key={item.value}
                value={item.value}
                className={classes.tab}
                classNames={{tabSection: classes.icon}}
                leftSection={item.icon}
              >
                {item.label}
              </MantineTabs.Tab>
            ),
          )}
        </MantineTabs.List>
      </MantineTabs>
    </div>
  );
};
