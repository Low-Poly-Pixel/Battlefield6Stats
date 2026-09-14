import type {WeaponClassName} from './weapons.ts';

type EffectOverride = {
  adsRecoilTierMod?: number;
  hipRecoilTierMod?: number;
  hipSpreadTierMod?: number;
};

type VelocityTreatmentKind = 'subsonic-absolute' | 'subsonic-tier' | 'subsonic-tungsten-absolute';

type VelocityTreatment = {
  kind: VelocityTreatmentKind;
  subsonicVelocityMps?: number;
  subsonicVelocityTier?: number;
  displayRounding?: 'floor';
  combinesWith?: 'penetration';
};

type AmmoDamagePoint = {
  r: number;
  d: number;
};

type ProjectileOverride = {
  pellets: number;
  dmg: AmmoDamagePoint[];
};

export type Ammo = {
  id: string;
  name: string;
  hsMult?: number | 'hp';
  collateralMult: Partial<Record<WeaponClassName, number>>;
  adsRecoilTierMod?: number;
  hipRecoilTierMod?: number;
  adsMoveSpeedTierShift?: number;
  worldSpot?: number;
  minimapSpot?: number;
  suppressedMinimapSpot?: number;
  healthRegenDelayS?: number;
  adsSpreadDynOverride?: {inc: number};
};

export type WeaponAmmoEntry = {
  def: string;
  ammo: Record<string, number>;
  effectOverrides?: Record<string, EffectOverride>;
  velocityTreatments?: Record<string, VelocityTreatment>;
  projectileOverrides?: Record<string, ProjectileOverride>;
};

export const ammoCatalog: Ammo[] = [
  {
    id: 'standard',
    name: 'Standard',
    collateralMult: {
      assaultRifle: 0.75,
      carbine: 0.75,
      lmg: 0.75,
      dmr: 0.75,
      sniperRifle: 0.75,
      smg: 0.57,
      sidearm: 0.57,
    },
  },
  {
    id: 'penetration',
    name: 'Penetration',
    adsRecoilTierMod: -1,
    collateralMult: {
      assaultRifle: 1,
      carbine: 1,
      lmg: 1,
      dmr: 1,
      sniperRifle: 1,
      smg: 0.75,
      sidearm: 0.75,
    },
    hipRecoilTierMod: -1,
  },
  {
    id: 'lightweight',
    name: 'Lightweight',
    adsMoveSpeedTierShift: -1,
    collateralMult: {
      assaultRifle: 0.75,
      carbine: 0.75,
      lmg: 0.75,
      dmr: 0.75,
      sniperRifle: 0.75,
    },
  },
  {
    id: 'longRange',
    name: 'Long-Range',
    collateralMult: {
      assaultRifle: 0.75,
      carbine: 0.75,
      lmg: 0.75,
      dmr: 0.75,
      sniperRifle: 0.75,
    },
  },
  {
    id: 'hollowPt',
    name: 'Hollow Point',
    hsMult: 'hp',
    collateralMult: {
      assaultRifle: 0.67,
      carbine: 0.67,
      lmg: 0.67,
      dmr: 0.67,
      sniperRifle: 0.67,
      smg: 0.5,
      sidearm: 0.5,
    },
  },
  {
    id: 'frangible',
    name: 'Frangible',
    healthRegenDelayS: 9,
    collateralMult: {
      assaultRifle: 0.67,
      carbine: 0.67,
      lmg: 0.67,
      dmr: 0.67,
      sniperRifle: 0.67,
      smg: 0.5,
      sidearm: 0.5,
    },
  },
  {
    id: 'synthetic',
    name: 'Synthetic',
    hsMult: 1.75,
    collateralMult: {
      assaultRifle: 0.67,
      carbine: 0.67,
      lmg: 0.67,
      dmr: 0.67,
      sniperRifle: 0.67,
      smg: 0.5,
      sidearm: 0.5,
    },
  },
  {
    id: 'buckshot',
    name: '#01 BUCK',
    hsMult: 1,
    collateralMult: {
      shotgun: 0.33,
    },
  },
  {
    id: 'buckshot00',
    name: '#00 BUCK',
    hsMult: 1,
    collateralMult: {
      shotgun: 0.33,
    },
  },
  {
    id: 'flechette',
    name: 'Flechette',
    hsMult: 1,
    collateralMult: {
      shotgun: 0.57,
    },
    healthRegenDelayS: 7,
  },
  {
    id: 'slugs',
    name: 'Slugs',
    hsMult: 1.34,
    collateralMult: {
      shotgun: 0.33,
    },
    adsRecoilTierMod: -1,
    hipRecoilTierMod: -1,
    adsSpreadDynOverride: {
      inc: 0.05,
    },
  },
  {
    id: 'subsonic',
    name: 'Subsonic',
    collateralMult: {
      assaultRifle: 0.67,
      carbine: 0.67,
      lmg: 0.67,
      dmr: 0.67,
      sniperRifle: 0.67,
      smg: 0.5,
      sidearm: 0.5,
    },
    worldSpot: 27,
    minimapSpot: 64,
    suppressedMinimapSpot: 9,
  },
  {
    id: 'subsonicHp',
    name: 'Sub HP',
    hsMult: 'hp',
    collateralMult: {
      assaultRifle: 0.67,
      carbine: 0.67,
      lmg: 0.67,
      dmr: 0.67,
      sniperRifle: 0.67,
      smg: 0.5,
      sidearm: 0.5,
    },
    worldSpot: 27,
    minimapSpot: 64,
    suppressedMinimapSpot: 9,
  },
  {
    id: 'subsonicPen',
    name: 'Sub Pen',
    adsRecoilTierMod: -1,
    collateralMult: {
      assaultRifle: 1,
      carbine: 1,
      lmg: 1,
      dmr: 1,
      sniperRifle: 1,
      smg: 0.75,
      sidearm: 0.75,
    },
    worldSpot: 27,
    minimapSpot: 64,
    suppressedMinimapSpot: 9,
    hipRecoilTierMod: -1,
  },
  {
    id: 'rangePen',
    name: 'Range Pen',
    adsRecoilTierMod: -1,
    collateralMult: {
      assaultRifle: 1,
      carbine: 1,
      lmg: 1,
      dmr: 1,
      sniperRifle: 1,
      smg: 0.75,
      sidearm: 0.75,
    },
    hipRecoilTierMod: -1,
  },
];

export const weaponAmmo: Partial<Record<string, WeaponAmmoEntry>> = {
  m433: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  b36a4: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
    },
  },
  sor556: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
    },
  },
  ak4d: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  tr7: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  kord6p67: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  nvo228e: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  l85a3: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
    },
  },
  vcr2: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  m16a4: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  m4a1: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  m277: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
    },
  },
  ak205: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 25,
    },
  },
  m417a2: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
      subsonic: 10,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-absolute',
        subsonicVelocityMps: 273,
      },
      subsonicHp: {
        kind: 'subsonic-absolute',
        subsonicVelocityMps: 273,
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  grtbc: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  qbz192: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 25,
    },
  },
  sg553r: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
      subsonic: 10,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  sor300sc: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
      subsonicHp: 30,
      subsonic: 10,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  sgx: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      subsonic: 15,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  pw5a3: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      subsonic: 15,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  pw7a2: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      subsonicPen: 10,
    },
    velocityTreatments: {
      subsonicPen: {
        kind: 'subsonic-tungsten-absolute',
        subsonicVelocityMps: 341,
        combinesWith: 'penetration',
      },
    },
  },
  umg40: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 25,
      subsonic: 10,
      subsonicHp: 25,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  usg90: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      subsonic: 10,
      subsonicHp: 25,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-absolute',
        subsonicVelocityMps: 265,
      },
      subsonicHp: {
        kind: 'subsonic-absolute',
        subsonicVelocityMps: 265,
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  kv9: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      subsonic: 15,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  scw10: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 20,
      frangible: 20,
      subsonic: 15,
      subsonicHp: 35,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  sl9: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      subsonic: 10,
      subsonicHp: 25,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  cz3a1: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      subsonic: 15,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 2,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  pp19: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      subsonic: 10,
      subsonicHp: 25,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 3,
        displayRounding: 'floor',
      },
    },
    effectOverrides: {
      subsonic: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
      subsonicHp: {
        adsRecoilTierMod: 1,
        hipRecoilTierMod: 1,
      },
    },
  },
  l110: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
    },
  },
  drsiar: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      lightweight: 10,
    },
  },
  m60: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  rpkm: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
      synthetic: 30,
    },
  },
  m123k: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
    },
  },
  m250: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
    },
  },
  kts100: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
      lightweight: 10,
    },
  },
  m240l: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  m121a2: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  rpk74m: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
    },
  },
  m39emr: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      longRange: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  lmr27: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      hollowPt: 20,
      frangible: 20,
      synthetic: 30,
    },
  },
  svk86: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  svdm: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      hollowPt: 20,
      frangible: 20,
    },
  },
  grtcps: {
    def: 'hollowPt',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 20,
      frangible: 20,
      synthetic: 30,
    },
  },
  m2010esr: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      frangible: 20,
    },
  },
  sv98: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      frangible: 20,
    },
  },
  psr: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      frangible: 20,
    },
  },
  interdictor: {
    def: 'standard',
    ammo: {
      standard: 5,
      frangible: 20,
      longRange: 10,
      penetration: 5,
    },
  },
  l115: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      longRange: 10,
      frangible: 20,
    },
  },
  miniscout: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
    },
  },
  m87a1: {
    def: 'buckshot',
    ammo: {
      buckshot: 10,
      buckshot00: 20,
      flechette: 30,
      slugs: 40,
    },
    effectOverrides: {
      buckshot: {
        hipSpreadTierMod: -9,
      },
      buckshot00: {
        hipSpreadTierMod: -9,
      },
      flechette: {
        hipSpreadTierMod: -9,
      },
    },
    projectileOverrides: {
      buckshot00: {
        pellets: 8,
        dmg: [
          {
            r: 0,
            d: 16.8,
          },
          {
            r: 11,
            d: 16.8,
          },
          {
            r: 12,
            d: 14.4,
          },
          {
            r: 18,
            d: 14.4,
          },
          {
            r: 19,
            d: 11.2,
          },
          {
            r: 33,
            d: 11.2,
          },
          {
            r: 34,
            d: 7.6,
          },
        ],
      },
      slugs: {
        pellets: 1,
        dmg: [
          {
            r: 0,
            d: 100,
          },
          {
            r: 8,
            d: 100,
          },
          {
            r: 9,
            d: 100,
          },
          {
            r: 15,
            d: 100,
          },
          {
            r: 15,
            d: 75,
          },
          {
            r: 36,
            d: 75,
          },
          {
            r: 36,
            d: 50,
          },
          {
            r: 75,
            d: 50,
          },
          {
            r: 75,
            d: 42.9,
          },
        ],
      },
    },
  },
  m1014: {
    def: 'buckshot',
    ammo: {
      buckshot: 10,
      buckshot00: 20,
      flechette: 30,
      slugs: 40,
    },
    effectOverrides: {
      buckshot: {
        hipSpreadTierMod: -9,
      },
      buckshot00: {
        hipSpreadTierMod: -9,
      },
      flechette: {
        hipSpreadTierMod: -9,
      },
    },
    projectileOverrides: {
      buckshot00: {
        pellets: 8,
        dmg: [
          {
            r: 0,
            d: 14.4,
          },
          {
            r: 11,
            d: 14.4,
          },
          {
            r: 12,
            d: 10,
          },
          {
            r: 18,
            d: 10,
          },
          {
            r: 19,
            d: 6.2,
          },
          {
            r: 24,
            d: 6.2,
          },
          {
            r: 25,
            d: 4.6,
          },
        ],
      },
      slugs: {
        pellets: 1,
        dmg: [
          {
            r: 0,
            d: 100,
          },
          {
            r: 9,
            d: 100,
          },
          {
            r: 9,
            d: 75,
          },
          {
            r: 15,
            d: 75,
          },
          {
            r: 15,
            d: 50,
          },
          {
            r: 36,
            d: 50,
          },
          {
            r: 36,
            d: 42.9,
          },
          {
            r: 75,
            d: 42.9,
          },
          {
            r: 75,
            d: 30,
          },
        ],
      },
    },
  },
  ks18k: {
    def: 'buckshot',
    ammo: {
      buckshot: 10,
      buckshot00: 20,
      flechette: 30,
      slugs: 40,
    },
    effectOverrides: {
      buckshot: {
        hipSpreadTierMod: -9,
      },
      buckshot00: {
        hipSpreadTierMod: -9,
      },
      flechette: {
        hipSpreadTierMod: -9,
      },
    },
    projectileOverrides: {
      buckshot00: {
        pellets: 8,
        dmg: [
          {
            r: 0,
            d: 10,
          },
          {
            r: 18,
            d: 10,
          },
          {
            r: 19,
            d: 5.6,
          },
          {
            r: 24,
            d: 5.6,
          },
          {
            r: 25,
            d: 4,
          },
        ],
      },
      slugs: {
        pellets: 1,
        dmg: [
          {
            r: 0,
            d: 75,
          },
          {
            r: 9,
            d: 75,
          },
          {
            r: 9,
            d: 50,
          },
          {
            r: 15,
            d: 50,
          },
          {
            r: 15,
            d: 42.9,
          },
          {
            r: 36,
            d: 42.9,
          },
          {
            r: 36,
            d: 37.5,
          },
          {
            r: 75,
            d: 37.5,
          },
          {
            r: 75,
            d: 27.3,
          },
        ],
      },
    },
  },
  db12: {
    def: 'buckshot',
    ammo: {
      buckshot: 10,
      buckshot00: 20,
      flechette: 30,
      slugs: 40,
    },
    effectOverrides: {
      buckshot: {
        hipSpreadTierMod: -9,
      },
      buckshot00: {
        hipSpreadTierMod: -9,
      },
      flechette: {
        hipSpreadTierMod: -9,
      },
    },
    projectileOverrides: {
      buckshot00: {
        pellets: 8,
        dmg: [
          {
            r: 0,
            d: 11.2,
          },
          {
            r: 18,
            d: 11.2,
          },
          {
            r: 19,
            d: 6.6,
          },
          {
            r: 24,
            d: 6.6,
          },
          {
            r: 25,
            d: 5,
          },
        ],
      },
      slugs: {
        pellets: 1,
        dmg: [
          {
            r: 0,
            d: 75,
          },
          {
            r: 9,
            d: 75,
          },
          {
            r: 9,
            d: 50,
          },
          {
            r: 15,
            d: 50,
          },
          {
            r: 15,
            d: 42.9,
          },
          {
            r: 36,
            d: 42.9,
          },
          {
            r: 36,
            d: 37.5,
          },
          {
            r: 75,
            d: 37.5,
          },
          {
            r: 75,
            d: 30,
          },
        ],
      },
    },
  },
  p18: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
      hollowPt: 15,
      subsonic: 10,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
    },
  },
  es57: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
      hollowPt: 15,
      subsonic: 10,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
    },
  },
  m45a1: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
      hollowPt: 15,
    },
  },
  m44: {
    def: 'standard',
    ammo: {
      standard: 5,
      hollowPt: 20,
      penetration: 5,
      frangible: 20,
    },
  },
  ggh22: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
      hollowPt: 15,
      subsonic: 10,
      subsonicHp: 30,
    },
    velocityTreatments: {
      subsonic: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
      subsonicHp: {
        kind: 'subsonic-tier',
        subsonicVelocityTier: 1,
        displayRounding: 'floor',
      },
    },
  },
  m357trait: {
    def: 'standard',
    ammo: {
      standard: 5,
      hollowPt: 20,
    },
  },
  vz61: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      frangible: 20,
      hollowPt: 15,
      synthetic: 25,
    },
  },
  brod3: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
    },
  },
  ef88: {
    def: 'standard',
    ammo: {
      standard: 5,
      penetration: 5,
      lightweight: 10,
      hollowPt: 15,
      frangible: 20,
      synthetic: 20,
    },
  },
  vssm: {
    def: 'rangePen',
    ammo: {
      penetration: 5,
      rangePen: 10,
      longRange: 10,
      frangible: 20,
    },
  },
};
