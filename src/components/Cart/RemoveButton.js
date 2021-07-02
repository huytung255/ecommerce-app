import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrashAlt } from "react-icons/fa";
const RemoveButton = ({ id, removeOneCartItem }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <div className="mb-auto text-right">
      <Button variant="danger" onClick={handleShowModal}>
        <FaTrashAlt />
      </Button>
      <Modal show={showModal} animation={false} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>REMOVE ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to remove this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={() => removeOneCartItem(id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoveButton;
