// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Toolbar from './Toolbar';

type Props = { children: Node };

const styles = { container: { height: '100vh' } };

function MainLayout(props: Props) {
  return (
    <Layout className={props.classes.container}>
      <Toolbar />
      <Layout>
        <Sidebar />

        <MainContent>
          {props.children}
        </MainContent>
      </Layout>
    </Layout>
  );
}

export default injectSheet(styles)(MainLayout);

