import {LineGraph} from '@/common/components/LineGraph/LineGraph.tsx';
import {Panel} from '@/common/components/Panel/Panel.tsx';
import {
  getDamageChartMax,
  getDamageChartRangeMax,
  getDamageChartStep,
  getDamageRangeCurve,
} from '@/common/data/attachments/stats/damageRange.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';

interface DamageRangeChartProps {
  weaponId: string;
  selections: AttachmentSelections;
}

export const DamageRangeChart = ({weaponId, selections}: DamageRangeChartProps) => (
  <Panel title="Damage Falloff">
    <LineGraph
      key={`${weaponId}-${selections.ammo}`}
      label="Body damage by range"
      data={getDamageRangeCurve(weaponId, selections)}
      damageMax={getDamageChartMax(weaponId)}
      damageStep={getDamageChartStep(weaponId)}
      rangeMax={getDamageChartRangeMax(weaponId)}
    />
  </Panel>
);
