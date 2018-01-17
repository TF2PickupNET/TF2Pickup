import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Icon } from 'materialize-react';

import UserItem from '../../../components/user-item';
import Date from '../../../components/date';
import Link from '../../../components/link';
import app from '../../../app';
import { assign } from '../../../../utils/functions';

class Message extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      deleteIcon: PropTypes.string.isRequired,
      userItem: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdOn: PropTypes.string.isRequired,
      user: PropTypes.shape({}).isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    canDeleteMessages: PropTypes.bool.isRequired,
  };

  static compile(str, defaultProps) {
    const [, name, props = '', content = null] = str.endsWith('/>')
      ? /<(\w+)(.+)\/>/.exec(str)
      : /^<(\w+)(.+)?>(.+)?<\/\w+>$/.exec(str);

    return {
      Component: name,
      isNotCustomComponent: /^[a-z]/.test(name),
      props: props
        .split(' ')
        .filter(prop => prop)
        .map((prop) => {
          const [, propName, delimiter, value] = prop.match(/(\w+)=("|{)(.*)("|})/);

          return { [propName]: delimiter === '{' ? JSON.parse(value) : value };
        })
        .reduce((current, prop) => assign({}, current)(prop), defaultProps),
      content,
    };
  }

  get formattedMessage() {
    return this.props.message.message
      .split(/(<\w+.*?>.*?<\/\w+>|<[A-Z]\w+.*?\/>)/)
      .map((str, index) => {
        if (str.startsWith('<') && str.endsWith('>')) {
          const {
            Component,
            isNotCustomComponent,
            props,
            content,
          } = Message.compile(str.trim(), { key: index });
          
          if (isNotCustomComponent) {
            return (
              <Component {...props}>
                {content}
              </Component>
            );
          }

          if (Component === 'Link') {
            return (
              <Link
                primary
                {...props}
              >
                {content}
              </Link>
            );
          } else if (Component === 'UserItem') {
            return (
              <UserItem
                {...props}
                className={this.props.classes.mentionUserItem}
              />
            );
          }
        }

        return str;
      });
  }

  handleDeleteClick = () => {
    app.io.emit('chat.delete-message', { messageId: this.props.message._id });
  };

  render() {
    return (
      <span className={this.props.classes.container}>
        {this.props.canDeleteMessages ? (
          <Icon
            icon="close"
            className={this.props.classes.deleteIcon}
            onClick={this.handleDeleteClick}
          />
        ) : null}

        <span className={this.props.classes.date}>
          <Date
            withoutDay
            date={this.props.message.createdOn}
          />
        </span>

        <UserItem
          user={this.props.message.user}
          className={this.props.classes.userItem}
        />:

        <span className={this.props.classes.message}>
          {this.formattedMessage}
        </span>
      </span>
    );
  }
}

Message.styles = {
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    minHeight: 20,

    '& .icon::before': {
      fontSize: 20,
      lineHeight: '1 !important',
    },
  },

  deleteIcon: { cursor: 'pointer' },

  date: {
    lineHeight: '20px',
    marginRight: 4,
  },

  userItem: {
    lineHeight: '20px',
    height: 20,
  },

  mentionUserItem: {
    composes: '$userItem',

    '& .icon::before': { display: 'none' }
  },

  message: {
    marginLeft: 4,
    lineHeight: '20px',
    flex: 1,
    wordBreak: 'break-word',
  },
};

export default injectSheet(Message.styles)(Message);
