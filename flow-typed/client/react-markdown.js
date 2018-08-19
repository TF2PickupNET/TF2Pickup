// @flow

import {
  type Node,
  type ComponentType,
} from 'react';

declare module 'react-markdown' {
  declare type NodeTypes = 'root'
    | 'text'
    | 'break'
    | 'paragraph'
    | 'emphasis'
    | 'strong'
    | 'thematicBreak'
    | 'blockquote'
    | 'delete'
    | 'link'
    | 'image'
    | 'linkReference'
    | 'imageReference'
    | 'table'
    | 'tableHead'
    | 'tableBody'
    | 'tableRow'
    | 'tableCell'
    | 'list'
    | 'listItem'
    | 'definition'
    | 'heading'
    | 'inlineCode'
    | 'code'
    | 'html';

  declare type Props = {
    source: string,
    className?: string,
    escapeHtml?: boolean,
    skipHtml?: boolean,
    sourcePos?: boolean,
    rawSourcePos?: boolean,
    allowedTypes?: $ReadOnlyArray<NodeTypes>,
    disallowedTypes?: $ReadOnlyArray<NodeTypes>,
    unwrapDisallowed?: boolean,
    allowNode?: () => boolean,
    transformLinkUri?: (uri: string) => string,
    transformImageUri?: (uri: string) => string,
    renderers?: {
      text: (text: string) => Node,
      [key: NodeTypes]: ComponentType<{}> | string,
    },
  };

  declare export default class Markdown extends React$Component<Props> {}
}
