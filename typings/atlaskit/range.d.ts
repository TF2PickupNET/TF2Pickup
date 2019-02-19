declare module '@atlaskit/range' {
  import {
    ComponentType,
    FocusEventHandler,
    ChangeEventHandler,
  } from 'react';

  interface RangeProps {
    isDisabled?: boolean,
    max?: number,
    min?: number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    step?: number,
    value: number,
    onBlur?: FocusEventHandler,
    onFocus?: FocusEventHandler,
  }

  const Range: ComponentType<RangeProps>;

  export default Range;
}
