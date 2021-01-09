import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import ChatListContainer from './styled';
import DeleteModal from './components/DeleteModal';
import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import ChatListController from '../ChatListController';
import { MessagesType } from '../../../../core/components/Chat/ChatMessages';
import { useConversationsChange } from '../../../../core/hooks/chat/useConversationChange';
import { usePrivateChatsChange } from '../../../../core/hooks/chat/usePrivateChatChange';
import { useUsersInDBChange } from '../../../../core/hooks/user/useUsersInDBChange';

export interface SearchUserOption {
  email: string,
  uid: string,
}
const NO_ANY_CHATS_TEXT = 'No any chats or conversations were created yet...';

const ChatList: React.FC = () => {
  const [targetIdToDelete, setTargetIdToDelete] = useState<string>('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const { conversations } = useConversationsChange();
  const { privateChats } = usePrivateChatsChange();
  const { users } = useUsersInDBChange();
  const isNeedToShowNoChatsMessage = privateChats.length === 0 && conversations.length === 0;

  const onChatDeleteClickHandle = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const targetElement = target.closest('[data-user-chat-uid]') as HTMLDivElement;
    const targetDeleteButton = target.closest('[data-delete-chat-button') as HTMLButtonElement;
    const deleteType = targetDeleteButton && targetDeleteButton.dataset.deleteChatButton as MessagesType;
    const targetId = targetElement && targetElement.dataset.userChatUid;

    if (targetDeleteButton && targetId) {
      if (deleteType === 'private') {
        const chatToDelete = privateChats.find((chat) => chat.id === targetId);
        if (chatToDelete) {
          setIsDeleteModalVisible(true);
          setTargetIdToDelete(chatToDelete.id);
        }
      } else {
        const conversationToDelete = conversations.find((conversation) => conversation.id === targetId);
        if (conversationToDelete) {
          setIsDeleteModalVisible(true);
          setTargetIdToDelete(conversationToDelete.id);
        }
      }
    }
  }, [privateChats, setTargetIdToDelete, conversations, setIsDeleteModalVisible]);

  return (
    <ChatListContainer>
      <ChatListController users={users} />
      <div className="chat-list__items" onClick={onChatDeleteClickHandle}>
        {isNeedToShowNoChatsMessage && (
          <div>{NO_ANY_CHATS_TEXT}</div>
        )}
        {(privateChats).map((chat) => {
          const chatId = chat.id;

          return (
            <div data-user-chat-uid={chatId} key={chatId}>
              <Link
                to={`${MainRoutes.ChatOverviewRoute_2}/${chatId}`}
                key={chatId}
                replace={false}
              >
                {chat.user?.email}
              </Link>
              <Button
                type="primary"
                className="delete-chat-button"
                data-delete-chat-button="private"
              >
                <DeleteOutlined />
              </Button>
            </div>
          );
        })}
        {conversations.map((conversation) => (
          <div data-user-chat-uid={conversation.id} key={conversation.id}>
            <Link
              to={`${MainRoutes.ConversationPage}/${conversation.id}`}
              key={conversation.id}
              replace={false}
            >
              {conversation.name}
            </Link>
            <Button
              type="primary"
              className="delete-chat-button"
              data-delete-chat-button="group"
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </div>
      <DeleteModal
        targetIdToDelete={targetIdToDelete}
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
      />
    </ChatListContainer>
  );
};

export default ChatList;
