import styled from 'styled-components';

const ChatNavBarContainer = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .create-buttons {
    display: flex;
    justify-content: space-between;

    margin-bottom: 20px;
    
    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  .chat-types-checkboxes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

export default ChatNavBarContainer;
