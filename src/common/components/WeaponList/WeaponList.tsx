import {HardwareCard} from '@/common/components/HardwareCard/HardwareCard.tsx';
import type {Weapon} from '@/common/data/attachments/weapons';
import {getWeaponImageSrc, weaponClassIcon} from '@/common/data/attachments/weapons';

import classes from './WeaponList.module.css';

interface WeaponListProps {
  weapons: Weapon[];
  selectedId: string | null;
  onSelect: (weaponId: string) => void;
}

export const WeaponList = ({weapons, selectedId, onSelect}: WeaponListProps) => (
  <div className={classes.root}>
    {weapons.map(weapon => (
      <HardwareCard
        key={weapon.id}
        title={weapon.name}
        image={getWeaponImageSrc(weapon.id)}
        weaponClass={weaponClassIcon(weapon.class)}
        selected={weapon.id === selectedId}
        onSelect={() => {
          onSelect(weapon.id);
        }}
      />
    ))}
  </div>
);
