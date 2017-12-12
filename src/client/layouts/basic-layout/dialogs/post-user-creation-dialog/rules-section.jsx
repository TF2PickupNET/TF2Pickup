import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Button,
  Layout,
} from 'materialize-react';

import app from '../../../../app';
import RemoteMarkdown from '../../../../components/remote-markdown';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

/**
 * The section for accepting the rules.
 *
 * @class
 */
class RulesSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: '1fr auto',
      gridGap: '16px',
      flex: 1,
      overflow: 'hidden',
    },

    rules: {
      overflowY: 'scroll',

      '& ol, ul': {
        margin: 0,
        paddingLeft: 25,
      },
    },
  };

  handleAcceptRules = () => app.io.emit('user.accept-rules');

  render() {
    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.rules}>
          <RemoteMarkdown url={RULES_URL} />
        </div>

        <Layout mainAlign="center">
          <Button onPress={this.handleAcceptRules}>
            Accept Rules
          </Button>
        </Layout>
      </div>
    );
  }
}

export default injectSheet(RulesSection.styles)(RulesSection);
