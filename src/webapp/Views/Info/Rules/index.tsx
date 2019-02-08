import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import RulesComp from '@webapp/components/Rules';
import DocumentTitle from '@webapp/components/DocumentTitle';

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
