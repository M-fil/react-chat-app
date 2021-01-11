import styled from 'styled-components';

const ChatMessagesContainer = styled('div')`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px 20px;
  
  .no-messages-text {
    text-align: center;
  }

  .message-item {
    margin-bottom: 20px;
  }
`;

export default ChatMessagesContainer;
