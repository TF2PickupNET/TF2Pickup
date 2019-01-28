declare module '@atlaskit/avatar' {
  import { ComponentType } from 'react';

  interface AvatarProps {
    appearance?: 'circle' | 'square',
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge',
    enableTooltip?: boolean,
    borderColor?: string,
    href?: string,
    isActive?: boolean,
    isDisabled?: boolean,
    isFocus?: boolean,
    isHover?: boolean,
    isSelected?: boolean,
    presence?: 'online' | 'busy' | 'focus' | 'offline',
    src?: string | null,
    onClick?(): void,
    className?: string,
  }

  const Avatar: ComponentType<AvatarProps>;

  export { AvatarProps };

  export default Avatar;
}
