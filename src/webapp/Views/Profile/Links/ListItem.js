// @flow

import React from 'react';
import { List } from 'antd';

type Props = {
  url: string,
  display: string,
};

function ListItem(props: Props) {
  return (
    <List.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.url}
      >
        {props.display}
      </a>
    </List.Item>
  );
}

export default ListItem;
