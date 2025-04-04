import { Modal } from "react-bootstrap";
import React from "react";

interface CustomModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ children, title, onClose }) => {
  return (
    <Modal
      onHide={onClose}
      show={true}
      backdrop="static"
      style={{ width: "100%" }}
    >
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;