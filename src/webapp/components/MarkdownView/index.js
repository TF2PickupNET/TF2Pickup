// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  Row,
  Spin,
} from 'antd';
import Markdown from 'react-markdown';
import axios from 'axios';

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

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={`${this.props.classes.container} ${this.props.className}`}
      >
        {typeof this.state.content === 'string'
          ? <Markdown source={this.state.content} />
          : <Spin />}
      </Row>
    );
  }
}

export default injectSheet(styles)(MarkdownView);
