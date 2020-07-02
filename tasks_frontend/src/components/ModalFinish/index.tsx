import React, { useState, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';

import api from '../../services/api';

interface Props {
  id: number;
}

const ModalActions: React.FC<Props> = ({ id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handlePatchTask(id: number) {
    await api.put(`/tasks/${id}`, { finished: true });
  };

  return (
    <>
      <Button
        size='sm' variant="success"
        onClick={handleShow}
      >
        Finish
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Finish Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to finish this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="success"
            onClick={() => handlePatchTask(id) && handleClose()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(ModalActions);