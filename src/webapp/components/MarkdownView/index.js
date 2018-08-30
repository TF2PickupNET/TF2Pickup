// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  Spin,
  message,
} from 'antd';
import Markdown from 'react-markdown';
import axios from 'axios';

import { isString } from '../../../utils';

type Props = {
  url: string,
  className: string,
  classes: { container: string },
};
type State = { content: string | void };

const styles = { container: { overflow: 'scroll' } };
const cache = new Map();

class MarkdownView extends React.PureComponent<Props, State> {
  static defaultProps = { className: '' };

  state = { content: cache.get(this.props.url) };

  async componentDidMount() {
    if (!cache.has(this.props.url)) {
      const { data } = await axios.get(this.props.url);

      cache.set(this.props.url, data);

      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ content: data });
    }
  }

  async fetchContent() {
    try {
      const { data } = await axios.get(this.props.url);

      cache.set(this.props.url, data);

      this.setState({ content: data });
    } catch (error) {
      message.error(`Couldn't load markdown content: ${error.mesasge}`);
    }
  }

  render() {
    if (isString(this.state.content)) {
      return (
        <Markdown
          source={this.state.content}
          className={`${this.props.classes.container} ${this.props.className}`}
        />
      );
    }

    return (
      <Spin delay={150} />
    );
  }
}

export default injectSheet(styles)(MarkdownView);
