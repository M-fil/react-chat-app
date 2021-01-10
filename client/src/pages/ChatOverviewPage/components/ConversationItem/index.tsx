import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';

import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { DefaultButton } from '../../../../core/styles/components/Buttons';
import { createTitle } from '../../../../core/styles/components/Title';
import ChatItemContainer from '../../../../core/styles/components/ChatItemContainer';
import ChatAvatar from '../../../../core/styles/components/ChatItemContainer/ChatAvatar';
import { conversationAvatarStyles as avatarStyles } from '../../../../core/styles/colors';

const ConversationNameTitle = createTitle('h4');
const NO_LAST_MESSAGE_TEXT = 'No last message for this conversation';

interface ConversationItemProps {
  conversationName: string,
  conversationId: string,
  lastMessageText: string,
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversationName, conversationId, lastMessageText,
}) => {
  return (
    <ChatItemContainer data-user-chat-uid={conversationId}>
      <Link
        to={`${MainRoutes.ConversationPage}/${conversationId}`}
        replace={false}
        className="chat-link"
      >
        <>
          <ChatAvatar
            className="user-avatar"
            icon={<TeamOutlined />}
            {...avatarStyles}
          />
          <div className="user-info">
            <ConversationNameTitle
              fontSize="1.6rem"
              lineHeight="2rem"
            >
              {conversationName}
            </ConversationNameTitle>
            <div className="last-message">
              {lastMessageText || NO_LAST_MESSAGE_TEXT}
            </div>
          </div>
        </>
      </Link>
      <DefaultButton
        className="delete-chat-button"
        data-delete-chat-button="private"
      >
        <DeleteOutlined />
      </DefaultButton>
    </ChatItemContainer>
  )
};

export default ConversationItem;
