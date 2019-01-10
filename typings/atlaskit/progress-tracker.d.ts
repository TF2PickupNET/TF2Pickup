declare module '@atlaskit/progress-tracker' {
  import { ComponentType } from 'react';

  type Status = 'unvisited' | 'visited' | 'current' | 'disabled';

  interface Item {
    id: string,
    label: string,
    percentageComplete: number,
    status: 'unvisited' | 'visited' | 'current' | 'disabled',
    noLink: boolean,
  }

  interface ProgressTrackerProps {
    items: Item[],
    spacing?: 'comfortable' | 'cosy' | 'compact',
    animated?: boolean,
    className?: string,
  }

  const ProgressTracker: ComponentType<ProgressTrackerProps>;

  export {
    Status,
    ProgressTracker,
  };
}
