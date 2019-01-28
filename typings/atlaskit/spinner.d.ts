declare module '@atlaskit/spinner' {
  import { ComponentType } from 'react';

  type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

  interface SpinnerProps {
    delay?: number,
    invertColor?: boolean,
    onComplete?(): void,
    size?: Size,
    isCompleting?: boolean,
  }

  const Spinner: ComponentType<SpinnerProps>;

  export default Spinner;
}
