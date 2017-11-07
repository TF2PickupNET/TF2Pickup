import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import omit from 'lodash.omit';

/**
 * Render a link which will open safely the provided href in a new tab.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {JSX} props.children - Children to render inside the link.
 * @param {String} props.href - The href for the link.
 * @param {String} props.className - Additional className to be applied to the link.
 * @returns {JSX} - Returns the jsx.
 */
function Link(props) {
  return (
    <a
      {...omit(props, 'sheet')}
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
      className={`${props.classes.link} ${props.primary && props.classes.primary} ${props.className}`}
    >
      {props.children}
    </a>
  );
}

Link.propTypes = {
  classes: PropTypes.shape({ link: PropTypes.string }).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
  primary: false,
};

Link.styles = (theme) => {
  return {
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },

    primary: { color: theme.primaryBase },
  };
};

export default injectSheet(Link.styles)(Link);
