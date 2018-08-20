// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

type Props = {
  children: Node,
  classes: { container: string },
};

const styles = {
  container: {
    padding: 24,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
};

function MainContent(props: Props) {
  return (
    <Layout className={props.classes.container}>
      {props.children}
    </Layout>
  );
}

export default injectSheet(styles)(MainContent);
