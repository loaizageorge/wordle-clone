import React, { useState } from 'react';
import styled from 'styled-components';
import { ACTUAL_WORD } from '../utils/constants';
// import { ACTUAL_WORD } from '../utils/constants';

export enum ModalType {
  winner = 'winner',
  gameOver = 'gameOver',
  none = '',
}

interface ModalProps {
  updateShowModal: Function
  restartGame: Function,
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
  z-index: 9999;
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

export default function Modal({ updateShowModal, restartGame, type }: ModalProps) {
  const [showAnswer, updateShowAnswer] = useState(false);

  const winnerMessages = () => ({
    title: 'Winner winner, chicken dinner!',
    body: 'You guessed the word in X tries',
  });

  const loserMessages = () => ({
    title: 'Game over!',
    body: showAnswer
      ? `The word you were looking for was: ${ACTUAL_WORD.join('').toLowerCase()}`
      : 'Give it another go, or give up to see the answer',
  });

  const handleModalClose = () => {
    updateShowModal(false);
    updateShowAnswer(false);
  };

  const messages = type === ModalType.winner ? winnerMessages() : loserMessages();

  return (
    <ModalStyles onClick={() => handleModalClose()}>
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
          <button type="button" onClick={() => restartGame()}>Retry</button>
          <button type="button" onClick={() => handleModalClose()}>Close</button>
          {
            type === ModalType.gameOver
            && <button type="button" disabled={showAnswer} onClick={() => updateShowAnswer(true)}>Reveal Answer</button>
          }
        </div>
      </div>
    </ModalStyles>
  );
}
