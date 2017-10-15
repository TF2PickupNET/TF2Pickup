import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import Aux from 'react-aux';
import { Card } from 'materialize-react';

import MarkdownView from '../../components/markdown-view';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

/**
 * The view for the rules page.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    rules: {
      width: '100%',
      maxWidth: 1000,
    },
  }

  render() {
    return (
      <Aux>
        <Helmet>
          <title>Rules</title>
        </Helmet>
        <div className={this.props.classes.container}>
          <Card className={this.props.classes.rules}>
            <MarkdownView url={RULES_URL} />
          </Card>
        </div>
      </Aux>
    );
  }
}

export default injectSheet(View.styles)(View);
