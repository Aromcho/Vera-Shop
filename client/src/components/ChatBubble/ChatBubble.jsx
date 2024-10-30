// src/components/ChatBubble/ChatBubble.jsx
import React, { useEffect, useState } from 'react';
import './ChatBubble.css';

const ChatBubble = ({ onClick }) => {
  const [typing, setTyping] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Configurar visibilidad después de 12 segundos
    const visibilityTimer = setTimeout(() => setVisible(true), 2000);

    // Cambiar a mensaje de ayuda después de 2 segundos
    const typingTimer = setTimeout(() => setTyping(false), 5000);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  // Manejar el clic para ocultar la burbuja
  const handleClick = () => {
    setVisible(false); // Ocultar la burbuja permanentemente
    onClick(); // Ejecutar la función de apertura de chat
  };

  // Si no es visible, no renderizar nada
  if (!visible) return null;

  return (
    <div className="chat-bubble" onClick={handleClick}>
      {typing ? (
        <div className="typing">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      ) : (
        <p>Hola ¿En qué puedo ayudarte?</p>
      )}
    </div>
  );
};

export default ChatBubble;
