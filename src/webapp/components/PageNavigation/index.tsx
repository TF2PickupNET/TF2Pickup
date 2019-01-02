import React, { ReactNode } from 'react';
import injectSheet, { Classes } from 'react-jss';

import { Theme } from '../../theme';
import { Row } from '../Grid';

import Item from './Item';

function styles(theme: Theme) {
  return {
    contentNavigation: {
      width: 256,
      backgroundColor: theme.pageNavigation.backgroundColor,
    },
  };
}

interface Props extends Classes<typeof styles> {
  children: ReactNode,
}

function ContentNavigation(props: Props) {
  return (
    <Row
      dir="column"
      className={props.classes.contentNavigation}
    >
      {props.children}
    </Row>
  );
}

export { Item };

export default injectSheet<Props>(styles)(ContentNavigation);
