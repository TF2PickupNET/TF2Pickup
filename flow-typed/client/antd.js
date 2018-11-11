// @flow strict-local

import {
  type Node,
  type Element,
  type ElementType,
  type ChildrenArray,
} from 'react';

declare module 'antd' {
  declare type Gutter = number | {|
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number,
  |};

  declare type Sizes = 'large' | 'default' | 'small';
  declare type Theme = 'light' | 'dark';
  declare type Position = 'top' | 'bottom' | 'left' | 'right';

  declare export class Row extends React$Component<{|
    align?: 'top' | 'middle' | 'bottom',
    gutter?: Gutter,
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between',
    type?: 'flex',
    children: Node,
    className?: string,
  |}> {}

  declare export class Col extends React$Component<{|
    offset?: number,
    order?: number,
    pull?: number,
    push?: number,
    span?: number,
    children: Node,
    ...Gutter,
  |}> {}

  declare export class Progress extends React$Component<{|
    format?: (percent: number, successPercentage: number) => string,
    gapDegree?: number,
    gapPosition?: Position,
    percent: number,
    showInfo?: boolean,
    status?: 'success' | 'exception' | 'active',
    strokeWidth?: number,
    successPercent?: number,
    type?: 'line' | 'circle' | 'dashboard',
    width?: number,
    onTransitionEnd: () => void,
  |}> {}

  declare export class message {
    static success(content: Node, onClose?: () => void): Promise<void>,
    static success(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static error(content: Node, onClose?: () => void): Promise<void>,
    static error(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static info(content: Node, onClose?: () => void): Promise<void>,
    static info(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static warning(content: Node, onClose?: () => void): Promise<void>,
    static warning(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static warn(content: Node, onClose?: () => void): Promise<void>,
    static warn(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static loading(content: Node, onClose?: () => void): Promise<void>,
    static loading(content: Node, duration: number, onClose?: () => void): Promise<void>,
    static destroy(): void,
    static config(options: {
      duration?: number,
      getContainer?: () => HTMLElement,
      maxCount?: number,
      top?: number,
    }): void,
  }

  declare export class Button extends React$Component<{|
    disabled?: boolean,
    ghost?: boolean,
    href?: string,
    htmlType?: string,
    icon?: string,
    loading?: boolean | { delay: number },
    shape?: 'circle',
    size?: Sizes,
    target?: string,
    type?: 'primary' | 'ghost' | 'dashed' | 'danger',
    onClick: (ev: HTMLElement) => void | Promise<void>,
    children: Node,
    className?: string,
  |}> {}

  declare export class CardGrid extends React$Component<{|
    className?: string,
    style?: {},
  |}> {}

  declare export class CardMeta extends React$Component<{|
    avatar?: Node,
    className?: string,
    description?: string,
    style?: {},
    title?: Node,
  |}> {}

  declare export class Card extends React$Component<{|
    actions?: $ReadOnlyArray<ElementType>,
    activeTabKey?: string,
    bodyStyle?: {},
    bordered?: boolean,
    cover?: Node,
    defaultActiveTabKey?: string,
    extra?: string | Node,
    loading?: boolean,
    className?: string,
    hoverable?: boolean,
    tabList?: $ReadOnlyArray<{
      key: string,
      tab: Node,
    }>,
    type?: 'inner',
    onTabChange?: (tab: string) => void | Promise<void>,
    title?: string | Node,
    children: Node,
  |}> {
    static Meta: CardMeta,
    static Grid: CardGrid,
  }

  declare type StepsStatus = 'wait' | 'process' | 'finish' | 'error';

  declare class Step extends React$Component<{|
    description?: Node,
    icon?: Node,
    status?: StepsStatus,
    title: Node,
  |}> {}

  declare export class Steps extends React$Component<{|
    current: number,
    direction?: 'horizontal' | 'vertical',
    labelPlacement?: 'horizontal' | 'vertical',
    size?: 'default' | 'small',
    status?: StepsStatus,
    progressDot?: boolean | () => Node,
    children: Node,
    className?: string,
  |}> {
    static Step: Class<Step>,
  }

  declare class RadioGroup extends React$Component<{|
    defaultValue?: string,
    disabled?: boolean,
    name?: string,
    size?: Sizes,
    value: string | null,
    children: Node,
    onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<void>,
    buttonStyle?: 'outline' | 'solid',
    options?: $ReadOnlyArray<string> | $ReadOnlyArray<{
      label: string,
      value: string,
      disabled?: boolean,
    }>,
  |}> {}

  declare export class Radio extends React$Component<{|
    autoFocus?: boolean,
    checked?: boolean,
    defaultChecked?: boolean,
    disabled?: boolean,
    value: string,
    children: Node,
    className?: string,
  |}> {
    static Group: Class<RadioGroup>,
  }

  declare export class Spin extends React$Component<{|
    delay?: number,
    indicator?: Element<ElementType>,
    size?: Sizes,
    spinning?: boolean,
    tip?: string,
    wrapperClassName?: string,
  |}> {}

  declare class Sider extends React$Component<{|
    className?: string,
    collapsed?: boolean,
    collapsedWidth?: number,
    collapsible?: boolean,
    defaultCollapsed?: boolean,
    reverseArrow?: boolean,
    theme?: Theme,
    trigger?: Element<ElementType>,
    width?: number,
    children: Node,
    onCollapse?: (collapsed: boolean) => void | Promise<void>,
  |}> {}

  declare export class Layout extends React$Component<{|
    className?: string,
    hasSider?: boolean,
    children: Node,
  |}> {
    static Sider: Class<Sider>,
    static Header: Class<Layout>,
    static Footer: Class<Layout>,
    static Content: Class<Layout>,
  }

  declare export class Avatar extends React$Component<{|
    icon?: string,
    shape?: 'circle' | 'square',
    size?: Sizes | number,
    src?: string,
    alt?: string,
    onError?: () => boolean,
    className?: string,
  |}> {}

  declare export class Divider extends React$Component<{|
    className?: string,
    dashed?: boolean,
    orientation?: 'left' | 'right' | 'center',
    type?: 'horizontal' | 'vertical',
    children?: Node,
  |}> {}

  declare class MenuItem extends React$Component<{|
    className?: string,
    disabled?: boolean,
    children: Node,
  |}> {}

  declare class MenuItemGroup extends React$Component<{|
    className?: string,
    title: string,
    children: ChildrenArray<Element<MenuItem | MenuItemGroup | Divider>>,
  |}> {}

  declare export class Menu extends React$Component<{|
    className?: string,
    defaultOpenKeys?: $ReadOnlyArray<string>,
    defaultSelectedKeys?: $ReadOnlyArray<string>,
    forceSubMenuRender?: boolean,
    inlineCollapsed?: boolean,
    inlineIndent?: number,
    mode?: 'vertical' | 'vertical-right' | 'horizontal' | 'inline',
    multiple?: boolean,
    openKeys?: $ReadOnlyArray<string>,
    selectable?: boolean,
    selectedKeys?: $ReadOnlyArray<string>,
    subMenuCloseDelay?: number,
    subMenuOpenDelay?: number,
    theme?: Theme,
    onClick?: ({
      item: Node,
      key: string,
      keyPath: string,
    }) => void | Promise<void>,
    onDeselect?: ({
      item: Node,
      key: string,
      selectedKeys: $ReadOnlyArray<string>,
    }) => void | Promise<void>,
    onOpenChange?: (openKeys: $ReadOnlyArray<string>) => void | Promise<void>,
    onSelect?: ({
      item: Node,
      key: string,
      selectedKeys: $ReadOnlyArray<string>,
    }) => void | Promise<void>,
    children: ChildrenArray<Element<MenuItem | MenuItemGroup | Divider>>,
  |}> {
    static Item: Class<MenuItem>,
    static ItemGroup: Class<MenuItemGroup>,
    static Divider: Class<Divider>,
  }

  declare export class Alert extends React$Component<{|
    afterClose?: () => void | Promise<void>,
    banner?: boolean,
    closable?: boolean,
    closeText?: Node,
    description?: Node,
    iconType?: string,
    message: Node,
    showIcon?: boolean,
    type?: 'success' | 'info' | 'warning' | 'error',
    onClose?: () => void | Promise<void>,
  |}> {}

  declare type NotificationPlacements = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

  declare type NotificationOptions = {|
    btn?: Node,
    className?: string,
    description?: Node,
    duration?: number | null,
    icon?: Node,
    key: string,
    message: Node,
    placement?: NotificationPlacements,
    onClose?: () => void | Promise<void>,
  |};

  declare export class notification {
    static success(options: NotificationOptions): void,
    static error(options: NotificationOptions): void,
    static info(options: NotificationOptions): void,
    static warning(options: NotificationOptions): void,
    static warn(options: NotificationOptions): void,
    static open(options: NotificationOptions): void,
    static close(key: string): void,
    static destroy(): void,
    static config({
      bottom?: number,
      duration?: number | null,
      getContainer?: () => HTMLElement,
      placement?: NotificationPlacements,
      top?: number,
    }): void,
  }

  declare export class Slider extends React$Component<{|
    autoFocus?: boolean,
    defaultValue?: number | [number, number],
    className?: string,
    disabled?: boolean,
    dots?: boolean,
    included?: boolean,
    max?: number,
    min?: number,
    range?: boolean,
    step?: number | null,
    tipFormatter?: (value: number) => Node | null,
    value: number | [number, number],
    vertical?: boolean,
    onAfterChange?: (value: number) => void | Promise<void>,
    onChange: (value: number) => void | Promise<void>,
    marks?: { number: Node } | {
      number: {
        style: {},
        label: Node,
      },
    },
  |}> {}

  declare export class Icon extends React$Component<{|
    spin?: boolean,
    className?: string,
    type: string,
  |}> {}

  declare export class Tag extends React$Component<{|
    afterClose?: () => void | Promise<void>,
    closable?: boolean,
    color?: string,
    children: Node,
    onClose?: () => void | Promise<void>,
    visible?: boolean,
    className?: string,
    onClick?: () => void | Promise<void>,
  |}> {}

  declare class SelectOption extends React$Component<{|
    disabled?: false,
    title?: string,
    value: string,
    children: Node,
  |}> {}

  declare export class Select extends React$Component<{|
    allowClear?: boolean,
    autoFocus?: boolean,
    defaultActiveFirstOption?: boolean,
    defaultValue?: string | $ReadOnlyArray<string>,
    disabled?: boolean,
    dropdownClassName?: string,
    dropdownMatchSelectWidth?: boolean,
    filterOption?: boolean | (value: string, option: string) => boolean,
    firstActiveValue?: string | $ReadOnlyArray<string>,
    getPopupContainer?: () => HTMLElement,
    labelInValue?: boolean,
    maxTagCount?: number,
    maxTagPlaceholder?: Node,
    mode?: 'default' | 'multiple' | 'tags',
    notFoundContent?: Node,
    optionFilterProp?: string,
    optionLabelProp?: string,
    placeholder?: Node,
    showArrow?: boolean,
    children: Node,
    showSearch?: boolean,
    size?: Sizes,
    tokenSeparators?: $ReadOnlyArray<string>,
    value?: string | $ReadOnlyArray<string>,
    onBlur?: () => void | Promise<void>,
    onChange?: (value: string) => void | Promise<void>,
    onDeselect?: (value: string) => void | Promise<void>,
    onFocus?: () => void | Promise<void>,
    onInputKeyDown?: () => void | Promise<void>,
    onMouseEnter?: () => void | Promise<void>,
    onMouseLeave?: () => void | Promise<void>,
    onPopupScroll?: () => void | Promise<void>,
    onSearch?: (input: string) => void | Promise<void>,
    onSelect?: (value: string) => void | Promise<void>,
    className?: string,
  |}> {
    static Option: Class<SelectOption>,
  }

  declare class ListItem extends React$Component<{
    children: Node,
  }> {}

  declare export class List<T> extends React$Component<{
    bordered?: boolean,
    footer?: Node,
    grid?: {
      gutter: number,
      column: number,
    },
    header?: Node,
    itemLayout?: 'horizontal' | 'vertical',
    loading?: boolean,
    loadMore?: Node,
    locale?: { emptyText?: string },
    split?: boolean,
    dataSource: $ReadOnlyArray<T>,
    renderItem: (item: T) => Node,
  }> {
    static Item: Class<ListItem>,
  }

  declare class TabPane extends React$Component<{
    forceRender?: boolean,
    tab: Node,
  }> {}

  declare export class Tabs extends React$Component<{
    activeKey: string,
    animated?: boolean | {
      inkBar?: boolean,
      tabPane?: boolean,
    },
    renderTabBar?: () => Node,
    defaultActiveKey?: string,
    hideAdd?: boolean,
    size?: Sizes,
    tabBarExtraContent?: Node,
    tabBarGutter?: number,
    className?: string,
    tabPosition?: Position,
    type?: 'line' | 'card' | 'editable-card',
    onChange?: (activeKey: string) => void,
    onEdit?: (target: string) => void,
    onNextClick?: () => void,
    onPrevClick?: () => void,
    onTabClick?: (tab: string) => void,
  }> {
    static TabPane: Class<TabPane>,
  }
}
