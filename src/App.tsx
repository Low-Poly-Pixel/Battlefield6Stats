import {useState} from 'react';

import classes from './App.module.css';
import {Button} from './common/components/Button/Button.tsx';
import {Dropdown} from './common/components/Dropdown/Dropdown.tsx';
import {HardwareCard} from './common/components/HardwareCard/HardwareCard.tsx';
import {Header} from './common/components/Header/Header.tsx';
import {ResetLabel} from './common/components/ResetLabel/ResetLabel.tsx';
import {Sidebar} from './common/components/Sidebar/Sidebar.tsx';
import {Tabs} from './common/components/Tabs/Tabs.tsx';
import {WeaponList} from './common/components/WeaponList/WeaponList.tsx';
import {WeaponStats} from './common/components/WeaponStats/WeaponStats.tsx';
import {getLoadoutViewModel, updateSelection} from './common/data/attachments/loadout.ts';
import {getDefaultSelections} from './common/data/attachments/selections.ts';
import {getWeaponStatsViewModel} from './common/data/attachments/stats.ts';
import type {AttachmentKey, AttachmentSelections} from './common/data/attachments/types.ts';
import {
  getWeaponImageSrc,
  getWeaponsForTab,
  type WeaponCategoryTab,
  weaponClassIcon,
  weapons,
} from './common/data/attachments/weapons.ts';
import {weaponCategoryTabs} from './common/data/weaponCategoryTabs.tsx';

const withViewTransition = (update: () => void) => {
  document.startViewTransition(update);
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState<WeaponCategoryTab>('assaultRifle');
  const [selectedWeaponId, setSelectedWeaponId] = useState<string | null>(null);
  const [selections, setSelections] = useState<AttachmentSelections | null>(null);
  const [openCategory, setOpenCategory] = useState<AttachmentKey | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const tabWeapons = getWeaponsForTab(selectedTab);
  const selectedWeapon = weapons.find(weapon => weapon.id === selectedWeaponId);
  const loadout = getLoadoutViewModel(selectedWeaponId, selections);
  const stats = getWeaponStatsViewModel(selectedWeaponId, selections);

  const handleTabChange = (value: string) => {
    withViewTransition(() => {
      setSelectedTab(value as WeaponCategoryTab);
    });
  };

  const handleSelectWeapon = (weaponId: string) => {
    withViewTransition(() => {
      setSelectedWeaponId(weaponId);
      setSelections(getDefaultSelections(weaponId));
      setOpenCategory(null);
    });
  };

  const handleToggleCategory = (key: AttachmentKey) => {
    setOpenCategory(current => (current !== key ? key : null));
  };

  const handleSelectOption = (key: AttachmentKey, optionId: string) => {
    if (!selectedWeaponId || !selections) return;

    setSelections(updateSelection(selectedWeaponId, selections, key, optionId));
    setOpenCategory(null);
  };

  const handleResetToDefaults = () => {
    if (!selectedWeaponId) return;

    setSelections(getDefaultSelections(selectedWeaponId));
    setOpenCategory(null);
    setResetTrigger(current => current + 1);
  };

  return (
    <div className={classes.root}>
      <Header title="Battlefield 6 Stats" subtitle="Weapon stats" />
      <div className={classes.body}>
        <Sidebar label="Weapon categories">
          <Tabs
            items={weaponCategoryTabs}
            columns={2}
            value={selectedTab}
            onChange={handleTabChange}
          />
          <WeaponList
            weapons={tabWeapons}
            selectedId={selectedWeaponId}
            onSelect={handleSelectWeapon}
          />
        </Sidebar>
        <main className={classes.main}>
          {selectedWeapon && loadout && (
            <div className={classes.loadout}>
              <div className={classes.mainColumn}>
                <div className={classes.weaponBox}>
                  <HardwareCard
                    title={selectedWeapon.name}
                    image={getWeaponImageSrc(selectedWeapon.id)}
                    weaponClass={weaponClassIcon(selectedWeapon.class)}
                    bordered={false}
                    pointsUsed={loadout.totalPoints}
                    pointsBudget={loadout.budget}
                  />
                </div>
                <div className={classes.attachmentBox}>
                  <div className={classes.attachmentGrid}>
                    {loadout.attachments.map(category => (
                      <Dropdown
                        key={category.key}
                        label={category.label}
                        value={category.value}
                        options={category.options}
                        disabled={category.locked || category.unavailable}
                        open={openCategory === category.key}
                        onToggle={() => {
                          handleToggleCategory(category.key);
                        }}
                        onSelect={optionId => {
                          handleSelectOption(category.key, optionId);
                        }}
                      />
                    ))}
                  </div>
                  <Button
                    destructive
                    aria-label="Reset to Defaults"
                    onClick={handleResetToDefaults}
                  >
                    <ResetLabel trigger={resetTrigger} />
                  </Button>
                </div>
              </div>
              <div className={classes.velocityBox}>
                <WeaponStats stats={stats} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
