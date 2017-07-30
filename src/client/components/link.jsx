import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

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
      {...props}
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
