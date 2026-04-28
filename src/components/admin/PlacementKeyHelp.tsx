import { PLACEMENT_KEYS } from '@/lib/utils/constants';

export function PlacementKeyHelp() {
  return <div className="rounded-md border bg-amber-50 p-3 text-xs text-amber-900">Valid placement keys: {PLACEMENT_KEYS.join(', ')}</div>;
}
