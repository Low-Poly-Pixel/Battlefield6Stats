import type {ComponentPropsWithoutRef, KeyboardEvent} from 'react';
import {useId} from 'react';

import classes from './HardwareCard.module.css';

export type WeaponClass = 'assault' | 'engineer' | 'support' | 'recon';

const CLASS_ICON_SRC: Record<WeaponClass, string> = {
  assault: `${import.meta.env.BASE_URL}img/classes/assault.svg`,
  engineer: `${import.meta.env.BASE_URL}img/classes/engineer.svg`,
  support: `${import.meta.env.BASE_URL}img/classes/support.svg`,
  recon: `${import.meta.env.BASE_URL}img/classes/recon.svg`,
};

type InteractiveProps = Pick<
  ComponentPropsWithoutRef<'article'>,
  'role' | 'tabIndex' | 'aria-pressed' | 'onClick' | 'onKeyDown'
>;

interface HardwareCardProps {
  title: string;
  image: string;
  weaponClass?: WeaponClass;
  selected?: boolean;
  bordered?: boolean;
  onSelect?: () => void;
  pointsUsed?: number;
  pointsBudget?: number;
}

export const HardwareCard = ({
  title,
  image,
  weaponClass,
  selected = false,
  bordered = true,
  onSelect,
  pointsUsed,
  pointsBudget,
}: HardwareCardProps) => {
  const titleId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onSelect?.();
  };

  const interactiveProps: InteractiveProps = onSelect
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-pressed': selected,
        onClick: onSelect,
        onKeyDown: handleKeyDown,
      }
    : {};

  return (
    <div className={classes.wrapper} data-selected={selected} data-bordered={bordered}>
      <article aria-labelledby={titleId} className={classes.root} {...interactiveProps}>
        <img src={image} alt="" className={classes.image} />
        {weaponClass ? (
          <img src={CLASS_ICON_SRC[weaponClass]} alt="" className={classes.classIcon} />
        ) : null}
        {pointsUsed !== undefined && pointsBudget !== undefined ? (
          <span className={classes.points}>
            {pointsUsed}/{pointsBudget}
          </span>
        ) : null}
        <div className={classes.text}>
          <h3 id={titleId} className={classes.title}>
            {title}
          </h3>
        </div>
      </article>
    </div>
  );
};
