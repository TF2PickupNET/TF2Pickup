import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  ExpansionPanel,
  RadioButtonGroup,
  RadioButton,
  Button,
  Divider,
  Label,
} from 'materialize-react';
import regions from '@tf2-pickup/configs/regions';

import app from '../../app';

class RegionSetting extends PureComponent {
  static styles = {
    headerPart: {
      flexBasis: '40%',
      flexShrink: 0,
    },
  };

  state = {
    expanded: false,
    region: this.props.region,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.region !== this.props.region) {
      this.setState({ region: nextProps.region });
    }
  }

  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        region: this.props.region,
      };
    });
  };

  handleRegionChange = (region) => {
    this.setState({ region });
  };

  handleSave = () => {
    app.io.emit(
      'user.change-region',
      { region: this.state.region },
      () => this.handleChange(),
    );
  };

  renderRadioButtons() {
    return Object
      .values(regions)
      .map(region => (
        <Label key={region.name}>
          <RadioButton name={region.name} />

          {region.fullName}
        </Label>
      ));
  }

  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleChange}
      >
        <ExpansionPanel.Summary>
          <span className={this.props.classes.headerPart}>
            Region:
          </span>

          <span className={this.props.classes.headerPart}>
            {regions[this.props.region].fullName}
          </span>
        </ExpansionPanel.Summary>

        <ExpansionPanel.Details>
          <RadioButtonGroup
            selected={this.state.region}
            onChange={this.handleRegionChange}
          >
            {this.renderRadioButtons()}
          </RadioButtonGroup>
        </ExpansionPanel.Details>

        <Divider />

        <ExpansionPanel.Actions>
          <Button onPress={this.handleChange}>
            Cancel
          </Button>

          <Button
            disabled={this.state.region === this.props.region}
            onPress={this.handleSave}
          >
            Save
          </Button>
        </ExpansionPanel.Actions>
      </ExpansionPanel>
    );
  }
}

export default connect(
  (state) => {
    return { region: state.user.settings.region };
  },
)(injectSheet(RegionSetting.styles)(RegionSetting));
