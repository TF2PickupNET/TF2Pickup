// @flow

import React from 'react';
import { Mention } from 'antd';

import { type User } from '../../../../types/User';

type Props = { mention: User };

export default function Suggestion(props: Props) {
  return (
    <Mention.Nav
      key={props.mention.id}
      value={props.mention.id}
    >
      {props.mention.name}
    </Mention.Nav>
  );
}
