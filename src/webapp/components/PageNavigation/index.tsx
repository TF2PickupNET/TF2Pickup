import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';

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

interface Props extends WithStyles<typeof styles> {
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

export default withStyles(styles)(ContentNavigation);
