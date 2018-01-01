import React from 'react';

import UserItem from '../../../components/user-item';
import Date from '../../../components/date';

export default function Message(props) {
  return (
    <span>
      <Date
        withoutDay
        date={props.message.createdOn}
      /> <UserItem user={props.message.user} />: <span>{props.message.message}</span>
    </span>
  );
}
