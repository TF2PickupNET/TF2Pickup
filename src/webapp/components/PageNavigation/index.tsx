import React, { ReactNode } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Container } from '@webapp/components/Grid';
import theme from '@webapp/theme';

import Item from './Item';
import Header from './Header';

const styles = {
  contentNavigation: {
    width: 256,
    height: '100vh',
    backgroundColor: theme.pageNavigation.backgroundColor,
  },
};

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

function PageNavigation(props: Props) {
  return (
    <Container
      dir="column"
      className={props.classes.contentNavigation}
    >
      {props.children}
    </Container>
  );
}

export {
  Item,
  Header,
};

export default withStyles(styles)(PageNavigation);
