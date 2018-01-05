import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import UserItem from '../../../components/user-item';
import Date from '../../../components/date';
import Link from '../../../components/link';

/**
 * Get the props for the current element.
 *
 * @param {String} str - The element as a string.
 * @param {Object} defaultProps - The default props for an element.
 * @returns {Object} - Returns the merged props.
 */
function getProps(str, defaultProps) {
  const match = str.match(/\w+=("|{).*("|})/g);

  if (!match) {
    return {};
  }

  return match[0]
    .split(' ')
    .reduce((props, prop) => {
      const [
        ,
        name,
        delimiter,
        value,
      ] = prop.match(/(\w+)=("|{)(.*)("|})/);

      return {
        ...props,
        [name]: delimiter === '{' ? JSON.parse(value) : value,
      };
    }, defaultProps);
}

const getContent = str => str.match(/<\w+.*>(.+)<\/\w+>/);

/**
 * Format the message and create the necessary react elements.
 *
 * @param {String} message - The message to format.
 * @param {String} userItemClass - The className for the UserItem.
 * @returns {String[]} - Returns the new message.
 */
function formatMessage(message, userItemClass) {
  return message
    .split(/(<[A-Z]\w+.+>.+<\/[A-Z]\w+>|<[A-Z]\w+.+ \/>)/)
    .map((str, index) => {
      if (str.startsWith('<') && str.endsWith('>')) {
        const Component = str.match(/^<(\w+)/)[1];
        const content = getContent(str);
        const props = getProps(str, { key: index });

        if (!Component) {
          return str;
        }

        if (Component === 'Link') {
          return (
            <Link
              primary
              {...props}
            >
              {content ? content[1] : content}
            </Link>
          );
        } else if (Component === 'UserItem') {
          return (
            <UserItem
              {...props}
              className={userItemClass}
            />
          );
        } else if (Component.charAt(0).toLowerCase() === Component.charAt(0)) {
          return (
            <Component {...props}>
              {content ? content[1] : null}
            </Component>
          );
        }
      }

      return str;
    });
}

/**
 * Render the message of a user.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Message(props) {
  return (
    <span className={props.classes.container}>
      <span className={props.classes.date}>
        <Date
          withoutDay
          date={props.message.createdOn}
        />
      </span>

      <UserItem
        user={props.message.user}
        className={props.classes.userItem}
      />:

      <span className={props.classes.message}>
        {formatMessage(props.message.message, props.classes.userItem)}
      </span>
    </span>
  );
}

Message.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    userItem: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.shape({
    createdOn: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

Message.styles = {
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    minHeight: 20,
  },

  date: {
    lineHeight: '20px',
    marginRight: 4,
  },

  userItem: {
    lineHeight: '20px',
    height: 20,

    '& .icon::before': { lineHeight: '1 !important' },
  },

  message: {
    marginLeft: 4,
    lineHeight: '20px',
    flex: 1,
    wordBreak: 'break-word',
  },
};

export default injectSheet(Message.styles)(Message);
