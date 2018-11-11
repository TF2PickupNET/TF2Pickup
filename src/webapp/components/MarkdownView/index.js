// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import injectSheet from 'react-jss';
import {
  Spin,
  message,
} from 'antd';
import Markdown from 'react-markdown';
import axios from 'axios';

import useIsMounted from '../../utils/use-is-mounted';

type Props = {
  url: string,
  className: string,
  classes: { container: string },
};

const styles = { container: { overflow: 'scroll' } };
const cache = new Map();

function MarkdownView(props: Props) {
  const [content, setContent] = useState<string | null>(null);
  const isMounted = useIsMounted();

  useEffect(async () => {
    const cachedContent = cache.get(props.url);

    if (cachedContent) {
      setContent(cachedContent);
    } else {
      try {
        const { data } = await axios.get(props.url);

        cache.set(props.url, data);

        if (isMounted.current) {
          setContent(data);
        }
      } catch (error) {
        message.error(`Couldn't load markdown content: ${error.mesasge}`);
      }
    }
  }, [props.url]);

  if (content === null) {
    return (
      <Spin delay={150} />
    );
  }

  return (
    <Markdown
      source={content}
      className={`${props.classes.container} ${props.className}`}
    />
  );
}

MarkdownView.defaultProps = { className: '' };

export default injectSheet(styles)(MarkdownView);
