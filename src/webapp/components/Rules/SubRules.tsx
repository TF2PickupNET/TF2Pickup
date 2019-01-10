import React from 'react';
import withStyles, { WithStyles } from 'react-jss';

const styles = { subRules: { paddingLeft: 20 } };

interface Props extends WithStyles<typeof styles> {
  rules: string[],
}

function SubRules(props: Props) {
  return (
    <ul className={props.classes.subRules}>
      {props.rules.map(rule => (
        <li key={rule}>
          {rule}
        </li>
      ))}
    </ul>
  );
}

export default withStyles(styles)(SubRules);
