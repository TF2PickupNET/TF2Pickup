import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import RulesComp from '../../components/Rules';
import DocumentTitle from '../../components/DocumentTitle';

const styles = { container: { padding: 32 } };

interface Props extends WithStyles<typeof styles> {
  path: string,
}

function Rules(props: Props) {
  return (
    <React.Fragment>
      <DocumentTitle title="Rules" />
      <div className={props.classes.container}>
        <RulesComp />
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Rules);
