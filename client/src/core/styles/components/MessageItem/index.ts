import styled, { css } from 'styled-components';
import { MessagePositionType } from '../../../interfaces/chat';

interface MessageItemProps {
  position: MessagePositionType,
  backgroundColor?: string,
}

const styles = {
  currentUser: {
    background: '#0084FF',
    color: '#FFFFFF',
  },
  interlocutor: {
    background: '#FFFFFF',
    color: '#BDBFC0',
  }
}

const MessageItem = styled('div').attrs(() => ({
  className: 'message-item',
}))<MessageItemProps>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: ${(props) => props.position === 'left' ? 'row' : 'row-reverse'};

  .sender-avatar {
    ${(props) => props.position === 'left' ? 'margin-right: 10px' : 'margin-left: 10px'};
  }

  .message-wrapper {
    border-radius: 20px;
    max-width: 40%;
    min-width: 25%;
    padding: 25px 20px;

    .sender-name {
      display: block;

      font-size: 1.2rem;
      line-height: 2rem;
      word-break: break-all;
    }

    .message-text {
      font-size: 1.5rem;
      line-height: 2rem;
      word-break: break-all;
    }

    ${(props) => {
      const user = props.position === 'left' ? 'interlocutor' : 'currentUser';
      const currentStyles = styles[user];

      return css`
        background-color: ${currentStyles.background};
        color: ${currentStyles.color};

        & > * {
          color: ${currentStyles.color};
        }
      `
    }}
  }
`;

const MessageNotification = styled('div').attrs(() => ({
  className: 'message-item',
}))`
  .message-wrapper {
    text-align: center;
    font-size: 1.7rem;
    line-height: 2.5rem;
    font-style: italic;
  }
`;

export {
  MessageItem,
  MessageNotification,
};
