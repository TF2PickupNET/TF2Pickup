// @flow

import { type ComponentType } from 'react';

declare module 'react-helmet' {
  declare interface ServerState {
    base: TagMethods,
    bodyAttributes: AttributeTagMethods,
    htmlAttributes: AttributeTagMethods,
    link: TagMethods,
    meta: TagMethods,
    noscript: TagMethods,
    script: TagMethods,
    style: TagMethods,
    title: TagMethods,
  }

  declare interface ClientState {
    base: $ReadOnlyArray<{}>,
    bodyAttributes: { [key: string]: string },
    defer: boolean,
    encode: boolean,
    htmlAttributes: { [key: string]: string },
    linkTags: $ReadOnlyArray<{}>,
    metaTags: $ReadOnlyArray<{}>,
    noscriptTags: $ReadOnlyArray<{}>,
    scriptTags: $ReadOnlyArray<{}>,
    styleTags: $ReadOnlyArray<{}>,
    title?: string,
    titleAttributes: { [key: string]: string },
  }

  declare type Props = {
    encodeSpecialCharacters?: boolean,
    children?: React$Node,
    defaultTitle?: string,
    onChangeClientState?: (
      newState: ClientState,
      addedTags: $ReadOnlyArray<{}>,
      removeTags: $ReadOnlyArray<{}>,
    ) => void,
    titleTemplate?: string,
  }

  declare interface TagMethods {
    toString(): string,
    toComponent(): ComponentType<{}>,
  }

  declare interface AttributeTagMethods {
    toString(): string,
    toComponent(): {[string]: ComponentType<{}>},
  }

  declare export default class Helmet extends React$Component<Props> {
    static rewind(): ServerState,
    static renderStatic(): ServerState,
    static canUseDom(canUseDOM: boolean): void,
  }
}

