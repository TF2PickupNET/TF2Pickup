import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

/**
 * Render a link which will open safely the provided href in a new tab.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the jsx.
 */
function Link(props) {
  return (
    <a
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
      className={classnames(
        props.classes.link,
        props.primary && props.classes.primary,
        props.className,
      )}
    >
      {props.children}
    </a>
  );
}

Link.propTypes = {
  classes: PropTypes.shape({
    link: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
  }).isRequired,
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
      display: 'inline',
      textDecoration: 'none',
      color: 'inherit',
    },

    primary: { color: theme.primaryBase },
  };
};

export default injectSheet(Link.styles)(Link);
