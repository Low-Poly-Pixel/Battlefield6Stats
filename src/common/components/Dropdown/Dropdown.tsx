import type {ReactNode} from 'react';
import {useState} from 'react';

import type {AttachmentOption} from '@/common/data/attachments/types.ts';

import classes from './Dropdown.module.css';

interface DropdownProps {
  label: string;
  value: string | null;
  options: AttachmentOption[];
  disabled: boolean;
  open: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
}

const OptionLabel = ({pts, name}: {pts: number; name: string}) => (
  <>
    <span className={classes.pts}>{pts}pt</span>
    <span className={classes.name}>{name}</span>
  </>
);

const formatOption = (option: {pts: number; name: string}) =>
  `${String(option.pts)} points, ${option.name}`;

export const Dropdown = ({
  label,
  value,
  options,
  disabled,
  open,
  onToggle,
  onSelect,
}: DropdownProps) => {
  const selected = options.find(option => option.id === value) ?? null;
  const isOpen = open && !disabled;
  const currentContent: ReactNode = selected ? (
    <OptionLabel pts={selected.pts} name={selected.name} />
  ) : null;

  const [prevValue, setPrevValue] = useState(value);
  const [flipped, setFlipped] = useState(false);
  const [topContent, setTopContent] = useState<ReactNode>(currentContent);
  const [bottomContent, setBottomContent] = useState<ReactNode>(currentContent);

  if (value !== prevValue) {
    setPrevValue(value);

    if (flipped) setTopContent(currentContent);
    else setBottomContent(currentContent);

    setFlipped(!flipped);
  }

  return (
    <div className={classes.root}>
      <span className={classes.label}>{label}</span>
      <button
        type="button"
        className={classes.trigger}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-label={`${label}: ${selected ? formatOption(selected) : 'None selected'}`}
        data-empty={!selected}
        onClick={onToggle}
      >
        <span className={classes.triggerLabel} aria-hidden="true">
          <span className={classes.triggerLabelTrack} data-flipped={flipped}>
            <span className={classes.triggerLabelRow}>{topContent}</span>
            <span className={classes.triggerLabelRow}>{bottomContent}</span>
          </span>
        </span>
      </button>
      {isOpen ? (
        <div className={classes.panel} role="listbox">
          {options.map(option => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={option.id === value}
              className={classes.option}
              data-selected={option.id === value}
              data-unaffordable={option.unaffordable}
              disabled={option.unaffordable}
              onClick={() => {
                onSelect(option.id);
              }}
            >
              <OptionLabel pts={option.pts} name={option.name} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
