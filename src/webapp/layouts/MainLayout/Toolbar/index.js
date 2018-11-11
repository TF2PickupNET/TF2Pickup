// @flow

import React, {
  useState,
  useCallback,
} from 'react';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';
import {
  Menu,
  Layout,
} from 'antd';

import { isString } from '../../../../utils/string';
import { SIDEBAR_WIDTH } from '../Sidebar';

import RightMenu from './RightMenu';

type Props = {
  classes: {
    header: string,
    menu: string,
    menuItem: string,
    logo: string,
  },
};

const { Header } = Layout;

const styles = {
  header: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },

  menu: {
    padding: 0,
    lineHeight: '64px',
    height: 64,
    display: 'inline',
  },

  menuItem: {
    padding: '0 32px',
    fontSize: '1.5em',
  },

  logo: {
    composes: '$menuItem',
    width: SIDEBAR_WIDTH,
    textAlign: 'center',
    fontSize: '1.8em',
  },
};

function Toolbar(props: Props) {
  const [title, setTitle] = useState();
  const handleStateChange = useCallback((state?: { title?: string }) => {
    if (state && isString(state.title)) {
      const match = state.title.match(/^(.+) \| TF2Pickup$/);

      if (match && match.length >= 2) {
        setTitle(match[1]);
      }
    }
  }, []);

  return (
    <Header className={props.classes.header}>
      <Helmet onChangeClientState={handleStateChange} />

      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        className={props.classes.menu}
      >
        <Menu.Item className={props.classes.logo}>
          TF2Pickup
        </Menu.Item>

        <Menu.Item className={props.classes.menuItem}>
          {title}
        </Menu.Item>
      </Menu>

      <RightMenu />
    </Header>
  );
}

export default injectSheet(styles)(Toolbar);
