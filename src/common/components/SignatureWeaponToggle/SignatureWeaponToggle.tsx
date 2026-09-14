import type {CSSProperties} from 'react';

import {CLASS_ICON_SRC, weaponClassIcon} from '@/common/data/attachments/weapons.ts';
import type {WeaponClassName} from '@/data/weapons.ts';

import classes from './SignatureWeaponToggle.module.css';

interface SignatureWeaponToggleProps {
  weaponClass: WeaponClassName;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const SignatureWeaponToggle = ({
  weaponClass,
  checked,
  onChange,
}: SignatureWeaponToggleProps) => {
  const icon = weaponClassIcon(weaponClass);

  if (!icon) return null;

  const iconStyle = {'--icon-src': `url(${CLASS_ICON_SRC[icon]})`} as CSSProperties;

  return (
    <label className={classes.root}>
      <span className={classes.icon} style={iconStyle} />
      <span className={classes.label}>Signature Weapon Buff</span>
      <input
        type="checkbox"
        className={classes.checkbox}
        checked={checked}
        onChange={event => {
          onChange(event.target.checked);
        }}
      />
    </label>
  );
};
