import React from 'react';

import RulesComp from '../../../components/Rules';
import DocumentTitle from "../../../components/DocumentTitle";

export default function Rules() {
  return (
    <React.Fragment>
      <DocumentTitle title="Rules" />
      <div>
        <RulesComp />
      </div>
    </React.Fragment>
  );
}
