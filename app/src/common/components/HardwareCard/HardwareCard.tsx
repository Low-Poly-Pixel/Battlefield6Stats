import type {ComponentPropsWithoutRef, KeyboardEvent} from 'react';
import {useId} from 'react';

import classes from './HardwareCard.module.css';

export type WeaponClass = 'assault' | 'engineer' | 'support' | 'recon';

const CLASS_ICON_SRC: Record<WeaponClass, string> = {
  assault: '/img/classes/assault.svg',
  engineer: '/img/classes/engineer.svg',
  support: '/img/classes/support.svg',
  recon: '/img/classes/recon.svg',
};

const CORNER_CLASSES = [
  classes.cornerTopLeft,
  classes.cornerTopRight,
  classes.cornerBottomLeft,
  classes.cornerBottomRight,
];

type InteractiveProps = Pick<
  ComponentPropsWithoutRef<'article'>,
  'role' | 'tabIndex' | 'aria-pressed' | 'onClick' | 'onKeyDown'
>;

interface HardwareCardProps {
  title: string;
  image: string;
  weaponClass?: WeaponClass;
  selected?: boolean;
  onSelect?: () => void;
}

export const HardwareCard = ({title, image, weaponClass, selected = false, onSelect}: HardwareCardProps) => {
  const titleId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onSelect?.();
  };

  const interactiveProps: InteractiveProps = onSelect
    ? {role: 'button', tabIndex: 0, 'aria-pressed': selected, onClick: onSelect, onKeyDown: handleKeyDown}
    : {};

  return (
    <div className={classes.wrapper} data-selected={selected}>
      <article aria-labelledby={titleId} className={classes.root} {...interactiveProps}>
        <img src={image} alt="" className={classes.image} />
        {weaponClass ? <img src={CLASS_ICON_SRC[weaponClass]} alt="" className={classes.classIcon} /> : null}
        <div className={classes.text}>
          <h3 id={titleId} className={classes.title}>
            {title}
          </h3>
        </div>
      </article>
      <div className={classes.frame} aria-hidden="true">
        {CORNER_CLASSES.map(cornerClass => (
          <span key={cornerClass} className={`${classes.corner} ${cornerClass}`} />
        ))}
      </div>
    </div>
  );
};
