import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';

import app from '../app';

function handleClick(url) {
  return function handleEvent() {
    return app.store.dispatch(push(url));
  };
}

function handleMouseDown(url) {
  return function handleEvent(ev) {
    if (ev.keyCode === 13) {
      app.store.dispatch(push(url));
    }
  };
}

export default function Link({
  children,
  to,
  href,
  ...props
}) {
  if (href) {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  }

  const style = {
    outline: 0,
    border: 0,
    backgroundColor: 'inherit',
    ...props.style,
  };

  return (
    <button
      style={style}
      onClick={handleClick(to)}
      onMouseDown={handleMouseDown(to)}
    >
      {children}
    </button>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  style: PropTypes.object,
};

Link.defaultProps = {
  href: '',
  to: '',
  style: {},
};
