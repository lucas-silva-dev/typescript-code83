import React, { useState, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';

import api from '../../services/api';

interface Props {
  id: number;
}

const ModalRemove: React.FC<Props> = ({ id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDeleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
  };

  return (
    <>
      <Button
        size='sm' variant="danger"
        onClick={handleShow}
      >
        remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to remove this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="success"
            onClick={() => handleDeleteTask(id) && handleClose()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(ModalRemove);