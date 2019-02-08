import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Theme } from '@webapp/theme';
import { Row } from '@webapp/components/Grid';

import Item from './Item';
import Header from './Header';

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

export {
  Item,
  Header,
};

export default withStyles(styles)(ContentNavigation);
