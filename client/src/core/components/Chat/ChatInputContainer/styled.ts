import styled from 'styled-components';

const ChatInputWrapper = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  
  .chat-input-container {
    display: flex;

    &__message-input {
      flex-grow: 1;
    }
  }
`;

export default ChatInputWrapper;
