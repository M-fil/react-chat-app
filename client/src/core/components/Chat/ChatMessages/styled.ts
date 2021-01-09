import styled from 'styled-components';

const ChatMessagesContainer = styled('div')`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px 20px;

  .message-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .notification-message {
    text-align: center;
  }

  .no-messages-text {
    text-align: center;
  }
`;

export default ChatMessagesContainer;
