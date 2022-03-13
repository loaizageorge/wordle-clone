import React from 'react';
import styled from 'styled-components';

export enum ModalType {
  winner = 'winner',
  gameOver = 'gameOver',
}

interface ModalProps {
  updateShowModal: Function
  type: ModalType
}

const ModalStyles = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  .modal-content {
    width: 500px;
    background-color: white;
  }
  
  .modal-header,
  .modal-footer {
    padding: 10px;
  }
  
  .modal-title {
    margin: 0;
  }
  
  .modal-body {
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
`;

export default function Modal({ updateShowModal, type }: ModalProps) {
  const winnerMessages = () => ({
    title: 'Winner winner, chicken dinner',
    body: 'You guessed the word in X tries',
    actions: <button type="button">Retry</button>,
  });

  const loserMessages = () => ({
    title: 'Game over!',
    body: 'Give it another go, or see the answer',
    actions: <button type="button">Retry</button>,
  });

  const messages = type === ModalType.winner ? winnerMessages() : loserMessages();

  return (
    <ModalStyles onClick={() => updateShowModal(false)}>
      <div
        role="presentation"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4 className="modal-title">{messages.title}</h4>
        </div>
        <div className="modal-body">{messages.body}</div>
        <div className="modal-footer">
          {messages.actions}
        </div>
      </div>
    </ModalStyles>
  );
}
