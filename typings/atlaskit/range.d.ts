declare module '@atlaskit/range' {
  import {
    ComponentType,
    FocusEventHandler,
  } from 'react';

  interface RangeProps {
    isDisabled?: boolean,
    max?: number,
    min?: number,
    onChange(val: number): void,
    step?: number,
    value: number,
    onBlur?: FocusEventHandler,
    onFocus?: FocusEventHandler,
  }

  const Range: ComponentType<RangeProps>;

  export default Range;
}
