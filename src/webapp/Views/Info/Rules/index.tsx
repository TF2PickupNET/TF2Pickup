import React from 'react';

import RulesComp from '../../../components/Rules';
import DocumentTitle from '../../../components/DocumentTitle';
import withStyles, { WithStyles } from 'react-jss';

const styles = { container: { padding: 32 } };

type Props = WithStyles<typeof styles>;

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
