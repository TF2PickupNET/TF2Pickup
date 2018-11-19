// @flow

import React from 'react';

type Props = {
  date: Date,
  withDay: boolean,
  className: string,
  locale: string | void,
  timeZone: string | void,
};

function DateDisplay(props: Props) {
  return (
    <span className={props.className}>
      {props.withDay && props.date.toLocaleDateString(props.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: props.timeZone,
      })}

      {props.withDay && ' | '}

      {props.date.toLocaleTimeString(props.locale, {
        timeZone: props.timeZone,
        hour: 'numeric',
        minute: 'numeric',
      })}
    </span>
  );
}

DateDisplay.displayName = 'Date';

DateDisplay.defaultProps = {
  className: '',
  withDay: false,
  // eslint-disable-next-line no-undefined
  locale: undefined,
  // eslint-disable-next-line no-undefined
  timeZone: undefined,
};

export default DateDisplay;
