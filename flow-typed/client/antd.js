// @flow strict-local

import {
  type Node,
  type ElementType,
} from 'react';

declare module 'antd' {
  declare type Gutter = number | {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    xxl?: number,
  };

  declare export class Row extends React$Component<{
    align?: 'top' | 'middle' | 'bottom',
    gutter?: Gutter,
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between',
    type?: 'flex',
  }> {}

  declare export class Col extends React$Component<{
    offset?: number,
    order?: number,
    pull?: number,
    push?: number,
    span?: number,
  } & Gutter> {}

  declare export class Progress extends React$Component<{
    format?: (percent: number, successPercentage: number) => string,
    gapDegree?: number,
    gapPosition?: 'top' | 'bottom' | 'left' | 'right',
    percent: number,
    showInfo?: boolean,
    status?: 'success' | 'exception' | 'active',
    strokeWidth?: number,
    successPercent?: number,
    type?: 'line' | 'circle' | 'dashboard',
    width?: number,
  }> {}

  declare type MessageFunc = (content: string | Node, onClose?: () => void) => Promise<void>
    | (content: string | Node, duration: number, onClose?: () => void) => Promise<void>;

  declare export class message {
    static success: MessageFunc,
    static error: MessageFunc,
    static info: MessageFunc,
    static warning: MessageFunc,
    static warn: MessageFunc,
    static loading: MessageFunc,
    static config(options: {
      duration?: number,
      getContainer?: () => HTMLElement,
      maxCount?: number,
      top?: number,
    }): void,
    static destroy(): void,
  }

  declare export class Button extends React$Component<{
    disabled?: boolean,
    ghost?: boolean,
    href?: string,
    htmlType?: string,
    icon?: string,
    loading?: boolean | { delay: number },
    shape?: 'circle',
    size?: 'small' | 'large',
    target?: string,
    type?: 'primary' | 'ghost' | 'dashed' | 'danger',
    onClick: (ev: HTMLElement) => void,
    children: Node,
  }> {}

  declare export class CardGrid extends React$Component<{
    className?: string,
    style?: {},
  }> {}

  declare export class CardMeta extends React$Component<{
    avatar?: Node,
    className?: string,
    description?: string,
    style?: {},
    title?: Node,
  }> {}

  declare export class Card extends React$Component<{
    actions?: $ReadOnlyArray<ElementType>,
    activeTabKey?: string,
    bodyStyle?: {},
    bordered?: boolean,
    cover?: Node,
    defaultActiveTabKey?: string,
    extra?: string | Node,
    loading?: boolean,
    hoverable?: boolean,
    tabList?: $ReadOnlyArray<{
      key: string,
      tab: Node,
    }>,
    type?: 'inner',
    onTabChange?: (tab: string) => void,
    title: string | Node,
    children: Node,
  }> {
    static Meta: CardMeta,
    static Grid: CardGrid,
  }
}
