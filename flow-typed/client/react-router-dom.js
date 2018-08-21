// @flow

import {
  type ComponentType,
  type ElementConfig,
  type Node,
} from 'react';

declare module 'react-router-dom' {
  declare export class BrowserRouter extends React$Component<{|
    basename?: string,
    forceRefresh?: boolean,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: Node,
  |}> {}

  declare export class HashRouter extends React$Component<{|
    basename?: string,
    getUserConfirmation?: GetUserConfirmation,
    hashType?: 'slash' | 'noslash' | 'hashbang',
    children?: Node,
  |}> {}

  declare export class Link extends React$Component<{
    className?: string,
    to: string | LocationShape,
    replace?: boolean,
    children?: Node,
  }> {}

  declare export class NavLink extends React$Component<{
    to: string | LocationShape,
    activeClassName?: string,
    className?: string,
    activeStyle?: {},
    style?: {},
    isActive?: (match: Match, location: Location) => boolean,
    children?: Node,
    exact?: boolean,
    strict?: boolean,
  }> {}

  declare export type Location = {
    pathname: string,
    search: string,
    hash: string,
    state?: {},
    key?: string,
  };

  declare export type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: {},
  };

  declare export type HistoryAction = 'PUSH' | 'REPLACE' | 'POP';

  declare export type RouterHistory = {
    length: number,
    location: Location,
    action: HistoryAction,
    listen(
      callback: (location: Location, action: HistoryAction) => void
    ): () => void,
    push(path: string | LocationShape, state?: {}): void,
    replace(path: string | LocationShape, state?: {}): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    canGo?: (n: number) => boolean,
    block(
      callback: (location: Location, action: HistoryAction) => boolean
    ): void,
    index?: number,
    entries?: $ReadOnlyArray<Location>,
  };

  declare export type Match = {
    params: { [key: string]: ?string },
    isExact: boolean,
    path: string,
    url: string,
  };

  declare export type ContextRouter = {|
    history: RouterHistory,
    location: Location,
    match: Match,
    staticContext?: StaticRouterContext,
  |};

  declare type ContextRouterVoid = {
    history: RouterHistory | void,
    location: Location | void,
    match: Match | void,
    staticContext?: StaticRouterContext | void,
  };

  declare export type GetUserConfirmation = (
    message: string,
    callback: (confirmed: boolean) => void
  ) => void;

  declare export type StaticRouterContext = {
    url?: string,
  };

  declare export class StaticRouter extends React$Component<{|
    basename?: string,
    location?: string | Location,
    context: StaticRouterContext,
    children?: Node,
  |}> {}

  declare export class MemoryRouter extends React$Component<{|
    initialEntries?: $ReadOnlyArray<LocationShape | string>,
    initialIndex?: number,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: Node,
  |}> {}

  declare export class Router extends React$Component<{|
    history: RouterHistory,
    children?: Node,
  |}> {}

  declare export class Prompt extends React$Component<{|
    message: string | ((location: Location) => string | boolean),
    when?: boolean,
  |}> {}

  declare export class Redirect extends React$Component<{|
    to: string | LocationShape,
    push?: boolean,
    from?: string,
    exact?: boolean,
    strict?: boolean,
  |}> {}

  declare export class Route extends React$Component<{|
    component?: ComponentType<{}>,
    render?: (router: ContextRouter) => Node,
    children?: ComponentType<ContextRouter> | Node,
    path?: string,
    exact?: boolean,
    strict?: boolean,
    location?: LocationShape,
    sensitive?: boolean,
  |}> {}

  declare export class Switch extends React$Component<{|
    children?: Node,
    location?: Location,
  |}> {}

  declare export function withRouter<P: {}, Component: ComponentType<P>>(
    WrappedComponent: Component
  ): ComponentType<$Diff<ElementConfig<Component>, ContextRouterVoid>>;

  declare type MatchPathOptions = {
    path?: string,
    exact?: boolean,
    sensitive?: boolean,
    strict?: boolean,
  };

  declare export function matchPath(
    pathname: string,
    options?: MatchPathOptions | string,
    parent?: Match
  ): null | Match;

  declare export function generatePath(pattern?: string, params?: {}): string;
}
