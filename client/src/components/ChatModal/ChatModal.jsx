// src/components/ChatModal/ChatModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ChatModal.css';

const ChatModal = ({ show, onHide }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const whatsappURL = `https://wa.me/5491165785043?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="chat-modal">
      <Modal.Header closeButton className="chat-modal-header">
        <Modal.Title>
            {/* imagen para el chat */}
            <img src="/img/logo.png" alt="Dolores Pidre" className="chat-logo" />
            Vera Shop
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="chat-modal-body">
        <div className="message-container">
          <div className="message received">
            <p>Hola! ¿En qué puedo ayudarte?</p>
          </div>
        </div>
        <Form.Group controlId="message" className="message-input-container">
          <Form.Control
            as="textarea"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="message-input"
          />
          <Button onClick={handleSendMessage} className="send-button" disabled={!message.trim()}>
            <i className="bi bi-send-fill"></i>
          </Button>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};

export default ChatModal;
