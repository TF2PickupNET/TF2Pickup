declare module '@atlaskit/badge' {
  import {
    ComponentType,

  } from 'react';

  interface BadgeProps {
    appearance?: 'added' | 'default' | 'important' | 'primary' | 'primaryInverted' | 'removed',
    children: number | string,
    max?: number,
  }

  const Badge: ComponentType<BadgeProps>;

  export default Badge;
}
