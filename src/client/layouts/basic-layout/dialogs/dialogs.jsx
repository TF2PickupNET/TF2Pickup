import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'materialize-react';

import { closeDialog } from '../../../redux/dialog/actions';

import NoConnectionDialog from './no-connection-dialog';
import MapVoteDialog from './map-vote-dialog';
import PostUserCreationDialog from './post-user-creation-dialog';
import ReadyUpDialog from './ready-up-dialog';

/**
 * The dialog container for all of the dialogs on the page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Dialogs(props) {
  return (
    <Dialog.Container
      dialog={props.dialog}
      onCloseRequest={props.onCloseRequest}
    >
      <NoConnectionDialog
        backdrop
        name="NO_CONNECTION_DIALOG"
      />

      <MapVoteDialog
        backdrop
        closeOnBackdropClick
        name="MAP_VOTE_DIALOG"
      />

      <PostUserCreationDialog
        backdrop
        name="POST_USER_CREATION_DIALOG"
      />

      <ReadyUpDialog
        backdrop
        name="READY_UP_DIALOG"
      />
    </Dialog.Container>
  );
}

Dialogs.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  dialog: PropTypes.string,
};

Dialogs.defaultProps = { dialog: null };

export default connect(
  (state) => {
    return { dialog: state.dialog };
  },
  (dispatch) => {
    return { onCloseRequest: () => dispatch(closeDialog()) };
  },
)(Dialogs);
