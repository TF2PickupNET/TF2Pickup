// @flow

import React, {
  useState,
  useCallback,
} from 'react';
import {
  List,
  Modal,
  Input,
} from 'antd';

import { createWarning } from '../../../store/warnings/actions';
import { useMatch } from '../../../utils/use-router';
import useAsync from '../../../utils/use-async';

function AddWarningItem() {
  const userId = useMatch(match => match.params.userId, null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const {
    run: handleAdd,
    error,
    isLoading,
  } = useAsync(
    useCallback(async () => {
      if (userId !== null) {
        await createWarning(userId, message);

        setIsModalOpen(false);
      }
    }, [userId, message]),
  );

  const handleItemClick = useCallback(() => setIsModalOpen(true), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);
  const handleChange = useCallback((ev: SyntheticInputEvent<HTMLTextAreaElement>) => {
    setMessage(ev.target.value);
  }, []);

  return (
    <React.Fragment>
      <Modal
        title="Add a warning"
        visible={isModalOpen}
        confirmLoading={isLoading}
        onOk={handleAdd}
        onCancel={handleCancel}
      >
        <Input.TextArea
          value={message}
          onChange={handleChange}
        />

        <p>
          {error}
        </p>
      </Modal>

      <List.Item onClick={handleItemClick}>
        Add warning
      </List.Item>
    </React.Fragment>
  );
}

export default AddWarningItem;
