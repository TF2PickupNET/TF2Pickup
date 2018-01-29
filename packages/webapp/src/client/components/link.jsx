import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import {
  getNotDeclaredProps,
  Typography,
} from 'materialize-react';

/**
 * Render a link which will open safely the provided href in a new tab.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the jsx.
 */
function Link(props) {
  return (
    <Typography
      typography="body1"
      element="a"
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
      className={classnames(
        props.classes.link,
        props.className,
      )}
      {...getNotDeclaredProps(props, Link)}
    >
      {props.children}
    </Typography>
  );
}

Link.propTypes = {
  classes: PropTypes.shape({ link: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = { className: '' };

Link.styles = {
  link: {
    display: 'inline',
    textDecoration: 'none',
  },
};

export default injectSheet(Link.styles)(Link);
