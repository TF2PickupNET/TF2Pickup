import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  RadioButtonGroup,
  RadioButton,
} from 'materialize-react';

import regions from '@tf2-pickup/configs/regions';

import app from '../../app';

export default class RegionSection extends PureComponent {
  static propTypes = { className: PropTypes.string.isRequired };

  setRegion = () => {
    const region = this.regionRadioButton.selected;

    app.io.emit('user.change-region', { region });
  };

  render() {
    return (
      <div className={this.props.className}>
        <Typography typography="title">
          Select a region
        </Typography>

        <RadioButtonGroup
          name="region"
          label=""
          defaultSelected="eu"
          ref={(element) => { this.regionRadioButton = element; }}
        >
          {Object
            .values(regions)
            .map(region => (
              <RadioButton
                key={region.name}
                name={region.name}
              >
                {region.fullName}
              </RadioButton>
            ))
          }
        </RadioButtonGroup>
      </div>
    );
  }
}
