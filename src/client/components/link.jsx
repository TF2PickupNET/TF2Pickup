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
export function Link({
  classes,
  children,
  href,
  className,
  ...props
}) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={`${classes.link} ${className}`}
      {...omit(props, 'sheet')}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  classes: PropTypes.shape({ link: PropTypes.string }).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = { className: '' };

Link.styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default injectSheet(Link.styles)(Link);
