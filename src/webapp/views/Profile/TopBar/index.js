// @flow

import React from 'react';

import Roles from './Roles';
import Name from './Name';

type Props = { userId: string };

const styles = {
  topBar: {
    display: 'grid',
    gridTemplateRows: '256px',
    gridTemplateColumns: '256px 1fr',
    width: '100%',
  },
};

export default function TopBar(props: Props) {
  return (
    <div>
      <div>
        <Name userId={props.userId} />

        <Roles userId={props.userId} />
      </div>
    </div>
  );
}
