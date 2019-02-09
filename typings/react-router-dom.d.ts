declare module 'react-router-dom' {
  import {
    ComponentType,
    ReactNode,
    Component,
  } from 'react';

  const BrowserRouter: ComponentType<{
    basename?: string,
    forceRefresh?: boolean,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: ReactNode,
  }>;

  const HashRouter: ComponentType<{
    basename?: string,
    getUserConfirmation?: GetUserConfirmation,
    hashType?: 'slash' | 'noslash' | 'hashbang',
    children?: ReactNode,
  }>;

  const Link: ComponentType<{
    className?: string,
    to: string | Partial<Location>,
    replace?: boolean,
    children?: ReactNode,
  }>;

  const NavLink: ComponentType<{
    to: string | Partial<Location>,
    activeClassName?: string,
    className?: string,
    activeStyle?: Object,
    style?: Object,
    isActive?(match: Match, location: Location): boolean,
    children?: ReactNode,
    exact?: boolean,
    strict?: boolean,
  }>;

  interface Location {
    pathname: string,
    search: string,
    hash: string,
    state?: object,
    key?: string,
  }

  type HistoryAction = 'PUSH' | 'REPLACE' | 'POP';

  interface RouterHistory {
    length: number,
    location: Location,
    action: HistoryAction,
    listen(
      callback: (location: Location, action: HistoryAction) => void
    ): () => void,
    push(path: string | Location, state?: object): void,
    replace(path: string | Location, state?: object): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    canGo?(n: number): boolean,
    block(
      callback: (location: Location, action: HistoryAction) => boolean
    ): void,
    index?: number,
    entries?: Location[],
  }

  interface Match {
    params: { [key: string]: string },
    isExact: boolean,
    path: string,
    url: string,
  }

  interface ContextRouter {
    history: RouterHistory,
    location: Location,
    match: Match,
    staticContext?: StaticRouterContext,
  }

  interface ContextRouterVoid {
    history: RouterHistory | void,
    location: Location | void,
    match: Match | void,
    staticContext?: StaticRouterContext | void,
  }

  type GetUserConfirmation = (
    message: string,
    callback: (confirmed: boolean) => void
  ) => void;

  interface StaticRouterContext {
    url?: string,
  }

  const StaticRouter: ComponentType<{
    basename?: string,
    location?: string | Location,
    context: StaticRouterContext,
    children?: ReactNode,
  }>;

  const MemoryRouter: ComponentType<{
    initialEntries?: Array<Location | string>,
    initialIndex?: number,
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: ReactNode,
  }>;

  const Router: ComponentType<{
    history: RouterHistory,
    children?: ReactNode,
  }>;

  const Prompt: ComponentType<{
    message: string | ((location: Location) => string | boolean),
    when?: boolean,
  }>;

  const Redirect: ComponentType<{
    to: string | Location,
    push?: boolean,
    from?: string,
    exact?: boolean,
    strict?: boolean,
  }>;

  const Route: ComponentType<{
    component?: ComponentType<any>,
    render?(router: ContextRouter): ReactNode,
    children?: ComponentType<ContextRouter> | ReactNode,
    path?: string | string[],
    exact?: boolean,
    strict?: boolean,
    location?: Location,
    sensitive?: boolean,
  }>;

  const Switch: ComponentType<{
    children?: ReactNode,
    location?: Location,
  }>;

  function withRouter<
    Props extends object,
    Component extends ComponentType<Props>,
  >(WrappedComponent: Component): ComponentType<Exclude<Props, ContextRouterVoid>>;

  interface MatchPathOptions {
    path?: string,
    exact?: boolean,
    sensitive?: boolean,
    strict?: boolean,
  }

  function matchPath(
    pathname: string,
    options?: MatchPathOptions | string,
    parent?: Match,
  ): null | Match;

  function generatePath(pattern?: string, params?: Object): string;

  export {
    BrowserRouter,
    Router,
    Route,
    Redirect,
    Location,
    RouterHistory,
    Match,
    StaticRouter,
    MemoryRouter,
    Prompt,
    Switch,
    withRouter,
    matchPath,
    generatePath,
    Link,
    NavLink,
    HashRouter,
    ContextRouter,
  };
}
