import React, { useMemo } from 'react';

type Props = {
  date: number | Date,
  withDay?: boolean,
  className?: string,
  locale?: string,
  timeZone?: string,
  divider?: string,
};

function DateDisplay(props: Props) {
  const date = useMemo(() => new Date(props.date), [props.date]);

  return (
    <span className={props.className}>
      {props.withDay && date.toLocaleDateString(props.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: props.timeZone,
      })}

      {props.withDay && props.divider}

      {date.toLocaleTimeString(props.locale, {
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
  divider: ' | ',
};

export default DateDisplay;
