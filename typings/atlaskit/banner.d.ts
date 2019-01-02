declare module '@atlaskit/banner' {
  import {
    ComponentType,
    ReactNode,
  } from 'react';

  interface BannerProps {
    appearance?: 'warning' | 'error' | 'announcement',
    children: ReactNode,
    icon?: ReactNode,
    isOpen: boolean,
  }

  const Banner: ComponentType<BannerProps>;

  export default Banner;
}
