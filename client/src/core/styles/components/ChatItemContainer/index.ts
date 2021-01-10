import styled from 'styled-components';

interface ChatItemContainerProps {
  borderBottomColor?: string,
}

const styles = {
  borderBottomColor: '#AFBFCF',
};

const ChatItemContainer = styled('div')<ChatItemContainerProps>`
  border-bottom: 2px solid ${(props) => props.borderBottomColor || styles.borderBottomColor};

  &, .chat-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-link {
    flex-grow: 1;
    justify-content: flex-start;
    padding-bottom: 10px;
  }

  .user-avatar {
    margin-right: 15px; 
  }

  .delete-chat-button {
    padding: 5px 10px;
  }

  .last-message {
    margin-top: 5px;
    font-size: 1.4rem;
    font-style: italic;
    line-height: 2rem;
    font-weight: 300;
  }
`;

export default ChatItemContainer;