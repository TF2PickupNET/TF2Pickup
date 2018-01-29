import React, { PureComponent } from 'react';
import {
  RadioButton,
  RadioButtonGroup,
  Dialog,
  Label,
  Button,
  getNotDeclaredProps,
} from 'materialize-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import maps from '@tf2-pickup/maps/dist/client';

import {
  getGamemodeFromUrl,
  getPlayer,
} from '../../../../utils/pickup-queue';
import app from '../../../app';
import { closeDialog } from '../../../redux/dialog/actions';

/**
 * The dialog content for the map voting.
 *
 * @class
 */
class MapVoteDialog extends PureComponent {
  static propTypes = {
    selectedMap: PropTypes.string,
    maps: PropTypes.arrayOf(PropTypes.string).isRequired,
    close: PropTypes.func.isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  static defaultProps = { selectedMap: '' };

  state = { selectedMap: this.props.selectedMap };

  handleCancelButtonPress = () => this.props.close();

  /**
   * Emit the pick-map event and close the dialog.
   */
  handleSelectButtonPress = () => {
    app.io.emit('pickup-queue.pick-map', {
      gamemode: this.props.gamemode,
      map: this.state.selectedMap,
    });

    this.props.close();
  };

  /**
   * Change the state when the user changes the selected map.
   *
   * @param {String} name - The name of the map.
   */
  handleMapChange = (name) => {
    this.setState({ selectedMap: name });
  };

  /**
   * Render the radio buttons for the maps.
   *
   * @returns {JSX[]} - Returns the JSX for the radio buttons.
   */
  renderRadioButtons() {
    return this.props.maps.map(map => (
      <Label key={map}>
        <RadioButton name={map} />

        {maps[map].display}
      </Label>
    ));
  }

  render() {
    return (
      <Dialog {...getNotDeclaredProps(this.props, MapVoteDialog)}>
        <Dialog.Header>
          Vote for a map
        </Dialog.Header>

        <Dialog.Content>
          <RadioButtonGroup
            selected={this.state.selectedMap}
            onChange={this.handleMapChange}
          >
            {this.renderRadioButtons()}
          </RadioButtonGroup>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={this.handleCancelButtonPress}>
            Cancel
          </Button>

          <Button onPress={this.handleSelectButtonPress}>
            Select
          </Button>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);
    const pickup = state.pickupQueue[gamemode];
    const player = getPlayer(state.user.id)(pickup);

    return {
      gamemode,
      maps: pickup.maps,
      selectedMap: player.map,
    };
  },
  (dispatch) => {
    return { close: () => dispatch(closeDialog()) };
  },
)(MapVoteDialog);
