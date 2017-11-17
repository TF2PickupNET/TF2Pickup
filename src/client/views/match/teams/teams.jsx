import React from 'react';
import injectSheet from 'react-jss';

import {
  mapObject,
  pipe,
  flatten, capitalize,
} from '../../../../utils/functions';
import * as Icons from '../../../icons';

function Teams(props) {
  const classes = pipe(
    mapObject((players, className) => players.map(() => className)),
    Object.values,
    flatten,
  )(props.teams.red);

  return (
    <div className={props.classes.teamContainer}>
      <div />

      <div
        className={props.classes.classesContainer}
        style={{ gridTemplateRows: '48px '.repeat(classes.length + 1) }}
      >
        <span />

        {classes.map((className, index) => {
          const Icon = Icons[capitalize(className)];

          return (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`${className}${index}`}>
              <Icon color={props.theme.iconColor} />
            </span>
          );
        })}
      </div>

      <div />
    </div>
  );
}

Teams.styles = () => {
  return {
    teamContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 48px 1fr',
      gridGap: '12px',
    },

    classesContainer: {
      display: 'grid',
      gridTemplateColumns: '48px',
      gridGap: '8px',
    },
  };
};

export default injectSheet(Teams.styles)(Teams);
