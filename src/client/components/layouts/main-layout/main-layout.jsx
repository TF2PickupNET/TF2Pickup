import React from 'react';
import { Drawer } from 'tf2pickup-components';

import MainToolbar from './main-toolbar';
import DrawerToolbar from './drawer-toolbar';

export default function MainLayout() {
  return (
    <Drawer>
      <Drawer.DrawerContent>
        <DrawerToolbar />
      </Drawer.DrawerContent>

      <Drawer.MainContent>
        <MainToolbar />
      </Drawer.MainContent>
    </Drawer>
  );
}
