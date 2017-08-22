import React from 'react';
import { Toolbar } from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import { Logo } from '../../icons';

/**
 * A component to render the content of the sidebar.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component provided by Jss.
 * @returns {JSX} - Returns the sidebar content.
 */
export function DrawerContent({ classes }) {
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} />
      </Toolbar>

      <div>
        Some other content
      </div>
    </div>
  );
}

DrawerContent.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

DrawerContent.styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: { height: 48 },
};

export default injectSheet(DrawerContent.styles)(DrawerContent);
