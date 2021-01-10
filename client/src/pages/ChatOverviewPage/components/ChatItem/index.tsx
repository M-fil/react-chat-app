import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { DefaultButton } from '../../../../core/styles/components/Buttons';
import { createTitle } from '../../../../core/styles/components/Title';
import ChatItemContainer from '../../../../core/styles/components/ChatItemContainer';
import ChatAvatar, { ChatAvatarProps } from '../../../../core/styles/components/ChatItemContainer/ChatAvatar';

interface ChatItemProps {
  chatId: string,
  userEmail: string,
  userAvatar?: string,
  lastMessageText: string,
}

const UserEmailTitle = createTitle('h4');
const NO_LAST_MESSAGE_TEXT = 'No any messages with this user';
const avatarStyles: ChatAvatarProps = {
  backgroundColor: '#F56A00',
  textColor: '#fffff',
};

const ChatItem: React.FC<ChatItemProps> = ({
  chatId, userEmail, userAvatar, lastMessageText = NO_LAST_MESSAGE_TEXT,
}) => {
  const avatarLetter = useMemo((): string => userEmail ? userEmail[0] : '', [userEmail]);

  return (
    <ChatItemContainer data-user-chat-uid={chatId}>
      <Link
        to={`${MainRoutes.ChatOverviewRoute_2}/${chatId}`}
        replace={false}
        className="chat-link"
      >
        <>
          <ChatAvatar
            className="user-avatar"
            {...avatarStyles}
          >
            {userAvatar || avatarLetter}
          </ChatAvatar>
          <div className="user-info">
            <UserEmailTitle
              fontSize="1.6rem"
              lineHeight="2rem"
            >
              {userEmail}
            </UserEmailTitle>
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
  );
};

export default ChatItem;
