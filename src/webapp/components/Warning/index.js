// @flow

import React, { useCallback } from 'react';
import {
  Card,
  Button,
} from 'antd';

import { useMakeMapState } from '../../utils/use-store';
import { makeGetWarningById } from '../../store/warnings/selectors';
import useAsync from '../../utils/use-async';
import UserItem from '../UserItem';
import { markWarningAsRead } from '../../store/warnings/actions';
import { getCurrentUserId } from '../../store/user-id/selectors';
import Date from '../DateDisplay';

type Props = {
  id: string,
  className: string,
};

const makeMapState = () => {
  const getWarningById = makeGetWarningById();

  return (state, props) => {
    return {
      currentUserId: getCurrentUserId(state),
      warning: getWarningById(state, props.id),
    };
  };
};

function Warning(props: Props) {
  const {
    warning,
    currentUserId,
  } = useMakeMapState(makeMapState, props);
  const {
    isLoading,
    run: handleMarkAsRead,
  } = useAsync(
    useCallback(() => markWarningAsRead(props.id), [props.id])
  );

  if (warning === null) {
    return null;
  }

  return (
    <Card
      title={(
        <React.Fragment>
          Warned from <UserItem userId={warning.from} />
        </React.Fragment>
      )}
      actions={(
        <React.Fragment>
          {currentUserId === warning.for && (
            <Button
              key="mark-as-read"
              loading={isLoading}
              onClick={handleMarkAsRead}
            >
              Mark as read
            </Button>
          )}
        </React.Fragment>
      )}
      className={props.className}
    >
      {warning.message}

      <div>
        Warned on: <Date date={warning.createdOn} />
      </div>

      {warning.read && (
        <div>
          Read on: <Date date={warning.readOn} />
        </div>
      )}
    </Card>
  );
}

Warning.defaultProps = { className: '' };

export default Warning;
