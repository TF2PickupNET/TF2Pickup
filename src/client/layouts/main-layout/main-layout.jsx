import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'materialize-react';

import DrawerContent from './drawer-content';
import MainToolbar from './main-toolbar';

/**
 * The main layout for all the routes except the landing page.
 *
 * @param {Object} props - The props for the component.
 * @param {JSX} props.children - The content to render inside the layout.
 * @returns {JSX} - Returns the main layout.
 */
export default function MainLayout({ children }) {
  return (
    <Drawer>
      <Drawer.DrawerContent>
        <DrawerContent />
      </Drawer.DrawerContent>

      <Drawer.MainContent>
        <MainToolbar />

        <div>
          {children}
        </div>
      </Drawer.MainContent>
    </Drawer>
  );
}

MainLayout.propTypes = { children: PropTypes.node.isRequired };
