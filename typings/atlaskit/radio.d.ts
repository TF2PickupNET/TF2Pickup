declare module '@atlaskit/radio' {
  import {
    ComponentType,
    ReactNode,
    ChangeEvent,
  } from 'react';

  interface Option {
    isDisabled?: boolean,
    isChecked?: boolean,
    label: ReactNode,
    value: string,
  }

  interface RadioGroupProps {
    value: string | null,
    isDisabled?: boolean,
    isRequired?: boolean,
    options: Option[],
    onChange(ev: ChangeEvent<HTMLInputElement>): void,
  }

  const RadioGroup: ComponentType<RadioGroupProps>;

  export { RadioGroup };
}
