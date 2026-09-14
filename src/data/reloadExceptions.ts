export const schemaVersion = 1;

type AnimationOverride = {
  tacRldOverrideMs: number;
  displayName: string;
  recordKey: string;
};

export const reloadExceptions: Record<string, Record<string, AnimationOverride>> = {
  m240l: {
    '75Rnd': {
      tacRldOverrideMs: 7100,
      displayName: '75Rnd Belt Box',
      recordKey: 'm240l-belt-box',
    },
    '100Rnd': {
      tacRldOverrideMs: 7100,
      displayName: '100Rnd Belt Box',
      recordKey: 'm240l-belt-box',
    },
  },
  m60: {
    '50Rnd': {
      tacRldOverrideMs: 4534,
      displayName: '50Rnd Loose Belt',
      recordKey: 'm60-loose-belt',
    },
  },
  pp19: {
    '53Rnd': {
      tacRldOverrideMs: 2667,
      displayName: '53Rnd Magazine',
      recordKey: 'pp19-53-rnd',
    },
  },
  rpk74m: {
    '95Rnd': {
      tacRldOverrideMs: 2950,
      displayName: '95Rnd Drum',
      recordKey: 'rpk74m-95-rnd',
    },
  },
};

type ScreenshotException = {
  observedReloadMs: number;
  displayName: string;
  observedOn: string;
  reason: string;
};

export const screenshotExceptions: Record<string, Record<string, ScreenshotException>> = {
  pp19: {
    '20Fast': {
      observedReloadMs: 2467,
      displayName: '20Rnd Fast Mag',
      observedOn: '2026-07-20',
      reason:
        'Known in-game bug, not a modelling decision: the 20Rnd Fast Mag reads the base reload with no reload arrow. Reported to EA at https://forums.ea.com/idea/battlefield-6-bug-reports-en/incorrect-stats-for-pp-19s-20-round-fast-magazine/13472218 - do not use this card as evidence when deriving Fast-magazine rules.',
    },
  },
};

type ComposedLoadoutEvidence = {
  magazineId: string;
  ergonomicId: string;
  observedReloadMs: number;
  observedOn: string;
  evidenceReference: string;
  evidenceKind: string;
  singleAttachmentPanel: boolean;
  note: string;
};

export const composedLoadoutEvidence: Record<string, Record<string, ComposedLoadoutEvidence>> = {
  pp19: {
    '53Rnd+magCatch': {
      magazineId: '53Rnd',
      ergonomicId: 'magCatch',
      observedReloadMs: 2509,
      observedOn: '2026-08-01',
      evidenceReference: 'operator-capture:2026-08-01:pp19:53Rnd+magCatch',
      evidenceKind: 'composed-loadout',
      singleAttachmentPanel: false,
      note: 'Operator in-game capture with the 53Rnd drum and Improved Mag Catch equipped together; this is composed-loadout evidence, not a single-attachment panel.',
    },
  },
};

export const counts = {
  animationOverrideRecords: 4,
  animationOverrideEntries: 5,
  screenshotExceptionEntries: 1,
  composedLoadoutEvidenceEntries: 1,
};
