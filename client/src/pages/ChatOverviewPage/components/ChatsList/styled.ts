import styled from 'styled-components';
import { containerPadding } from '../../../../core/styles/components/MainContainer';

const ChatListContainer = styled('div')`
  flex-grow: 1;
  ${containerPadding};
  
  .chat-list__items {
    & > *[data-user-chat-uid] {
      margin-bottom: 20px;
    }
  }
`;

export default ChatListContainer;
