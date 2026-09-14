import type {
  AttachmentSelections,
  Stat,
  WeaponStatsViewModel,
} from '@/common/data/attachments/types.ts';

import {getAdsMoveSpeed, getBaseAdsMoveSpeed} from './adsMoveSpeed.ts';
import {getAdsSpreadGrowth, getBaseAdsSpreadGrowth} from './adsSpreadGrowth.ts';
import {getAdsTime, getBaseAdsTime} from './adsTime.ts';
import {getBaseCollateralMultiplier, getCollateralMultiplier} from './collateralMultiplier.ts';
import {getBaseDamage, getDamage} from './damage.ts';
import {getBaseDeployTime, getDeployTime} from './deployTime.ts';
import {getBaseFireRate, getFireRate} from './fireRate.ts';
import {getBaseHeadshotMultiplier, getHeadshotMultiplier} from './headshotMultiplier.ts';
import {getBaseHealthRegenDelay, getHealthRegenDelay} from './healthRegenDelay.ts';
import {
  getBaseHipSpreadMoving,
  getBaseHipSpreadStanding,
  getHipSpreadMoving,
  getHipSpreadStanding,
} from './hipSpread.ts';
import {getBaseMagazineSize, getMagazineSize} from './magazineSize.ts';
import {getBaseMinimapSpotOnFire, getMinimapSpotOnFire} from './minimapSpotOnFire.ts';
import {getBaseMovingAccuracy, getMovingAccuracy} from './movingAccuracy.ts';
import {
  getBaseEmptyReloadTime,
  getBaseReloadTime,
  getEmptyReloadTime,
  getReloadTime,
  isEmptyReloadRedundant,
} from './reloadTime.ts';
import {getBaseSprintRecoveryTime, getSprintRecoveryTime} from './sprintRecoveryTime.ts';
import {getBaseSprintSpeed, getSprintSpeed} from './sprintSpeed.ts';
import {getBaseMuzzleVelocity, getMuzzleVelocity} from './velocity.ts';
import {getBaseWorldSpotOnFire, getWorldSpotOnFire} from './worldSpotOnFire.ts';

const EMPTY_STAT: Stat = {current: 0, base: 0};

export const getWeaponStatsViewModel = (
  weaponId: string | null,
  selections: AttachmentSelections | null,
  signatureWeapon = false,
): WeaponStatsViewModel => {
  if (!weaponId || !selections) {
    return {
      fireRate: EMPTY_STAT,
      damage: EMPTY_STAT,
      headshotMultiplier: EMPTY_STAT,
      velocity: EMPTY_STAT,
      adsSpreadGrowth: EMPTY_STAT,
      adsTime: EMPTY_STAT,
      adsMoveSpeed: EMPTY_STAT,
      sprintRecoveryTime: EMPTY_STAT,
      sprintSpeed: EMPTY_STAT,
      deployTime: EMPTY_STAT,
      reloadTime: EMPTY_STAT,
      emptyReloadTime: EMPTY_STAT,
      movingAccuracy: EMPTY_STAT,
      hipSpreadStanding: EMPTY_STAT,
      hipSpreadMoving: EMPTY_STAT,
      worldSpot: EMPTY_STAT,
      minimapSpot: EMPTY_STAT,
      healthRegenDelay: EMPTY_STAT,
      collateralMultiplier: EMPTY_STAT,
      magazineSize: EMPTY_STAT,
    };
  }

  return {
    fireRate: {current: getFireRate(weaponId, selections), base: getBaseFireRate(weaponId)},
    damage: {current: getDamage(weaponId, selections), base: getBaseDamage(weaponId)},
    headshotMultiplier: {
      current: getHeadshotMultiplier(weaponId, selections),
      base: getBaseHeadshotMultiplier(weaponId),
    },
    velocity: {
      current: getMuzzleVelocity(weaponId, selections),
      base: getBaseMuzzleVelocity(weaponId),
    },
    adsSpreadGrowth: {
      current: getAdsSpreadGrowth(weaponId, selections.barrel),
      base: getBaseAdsSpreadGrowth(weaponId),
    },
    adsTime: {
      current: getAdsTime(weaponId, selections, signatureWeapon),
      base: getBaseAdsTime(weaponId),
    },
    adsMoveSpeed: {
      current: getAdsMoveSpeed(weaponId, selections),
      base: getBaseAdsMoveSpeed(weaponId),
    },
    sprintRecoveryTime: {
      current: getSprintRecoveryTime(weaponId, selections, signatureWeapon),
      base: getBaseSprintRecoveryTime(weaponId),
    },
    sprintSpeed: {
      current: getSprintSpeed(weaponId, signatureWeapon),
      base: getBaseSprintSpeed(weaponId),
    },
    deployTime: {
      current: getDeployTime(weaponId, selections, signatureWeapon),
      base: getBaseDeployTime(weaponId),
    },
    reloadTime: {current: getReloadTime(weaponId, selections), base: getBaseReloadTime(weaponId)},
    emptyReloadTime: {
      current: getEmptyReloadTime(weaponId, selections),
      base: getBaseEmptyReloadTime(weaponId),
      disabled: isEmptyReloadRedundant(weaponId),
    },
    movingAccuracy: {
      current: getMovingAccuracy(weaponId, selections),
      base: getBaseMovingAccuracy(weaponId),
    },
    hipSpreadStanding: {
      current: getHipSpreadStanding(weaponId, selections, signatureWeapon),
      base: getBaseHipSpreadStanding(weaponId),
    },
    hipSpreadMoving: {
      current: getHipSpreadMoving(weaponId, selections, signatureWeapon),
      base: getBaseHipSpreadMoving(weaponId),
    },
    worldSpot: {current: getWorldSpotOnFire(selections), base: getBaseWorldSpotOnFire(weaponId)},
    minimapSpot: {
      current: getMinimapSpotOnFire(selections),
      base: getBaseMinimapSpotOnFire(weaponId),
    },
    healthRegenDelay: {
      current: getHealthRegenDelay(selections),
      base: getBaseHealthRegenDelay(weaponId),
    },
    collateralMultiplier: {
      current: getCollateralMultiplier(weaponId, selections),
      base: getBaseCollateralMultiplier(weaponId),
    },
    magazineSize: {
      current: getMagazineSize(weaponId, selections),
      base: getBaseMagazineSize(weaponId),
    },
  };
};
