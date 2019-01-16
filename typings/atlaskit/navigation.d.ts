declare module '@atlaskit/navigation-next' {
  import {
    ComponentType,
    MouseEventHandler,
    ReactNode,
  } from 'react';
  import { AvatarProps } from '@atlaskit/avatar';

  interface ItemBeforeAfterProps {
    isActive?: boolean,
    isDragging?: boolean,
    isHover?: boolean,
    isSelected?: boolean,
    isFocused?: boolean,
    spacing?: 'compact' | 'default',
    label: string,
  }

  interface ItemProps {
    after?: ComponentType<ItemBeforeAfterProps>,
    before?: ComponentType<ItemBeforeAfterProps>,
    href?: string,
    id?: string,
    index?: number,
    isDragging?: boolean,
    isSelected?: boolean,
    onClick?: MouseEventHandler,
    spacing?: 'compact' | 'default',
    subText?: ReactNode,
    target?: string,
    text: ReactNode,
    component?: ComponentType<ItemProps>,
    styles?(styles: Record<string, object>): Record<string, object>,
  }

  interface SectionProps {
    id?: string,
    parentId?: string,
    children(props: { className: string }): ReactNode,
    alwaysShowScrollHint?: boolean,
  }

  interface GroupHeadingProps {
    after?: ComponentType<{}>,
    children: ReactNode,
  }

  interface GlobalItemProps {
    href?: string,
    id?: string,
    index?: number,
    icon: ComponentType<any> | (() => string),
    isSelected?: boolean,
    label?: string,
    onClick?: MouseEventHandler,
    size?: 'large' | 'small',
    target?: string,
    tooltip?: ReactNode,
  }

  interface GlobalNavProps {
    itemComponent?: ComponentType<GlobalItemProps>,
    primaryItems: GlobalItemProps[],
    secondaryItems: GlobalItemProps[],
  }

  interface ItemAvatar extends AvatarProps {
    itemState: ItemBeforeAfterProps,
  }

  const MenuSection: ComponentType<SectionProps>;
  const HeaderSection: ComponentType<SectionProps>;
  const Item: ComponentType<ItemProps>;
  const ContainerHeader: ComponentType<ItemProps>;
  const Separator: ComponentType<{}>;
  const GroupHeading: ComponentType<GroupHeadingProps>;
  const GlobalNav: ComponentType<GlobalNavProps>;
  const ItemAvatar: ComponentType<ItemAvatar>;

  export {
    ItemProps,
    Item,
    ContainerHeader,
    Separator,
    MenuSection,
    SectionProps,
    HeaderSection,
    GroupHeading,
    GlobalNav,
    ItemAvatar,
    ItemBeforeAfterProps,
    GlobalItemProps,
  };
}
