import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import ChatListContainer from './styled';
import DeleteModal from '../Modals/DeleteModal';
import ChatItem from '../ChatItem';
import ConversationItem from '../ConversationItem';
import ChatListController from '../ChatListController';
import { MessagesType } from '../../../../core/components/Chat/ChatMessages';
import { useConversationsChange } from '../../../../core/hooks/chat/useConversationChange';
import { usePrivateChatsChange } from '../../../../core/hooks/chat/usePrivateChatChange';
import { useUsersInDBChange } from '../../../../core/hooks/user/useUsersInDBChange';
import { ChatType } from '../../../../core/interfaces/chat';
import { selectChatByCurrentChatId } from '../../../../core/selectors/chats';

export interface SearchUserOption {
  email: string,
  uid: string,
}
const NO_ANY_CHATS_TEXT = 'No any chats or conversations were created yet...';
const NO_ANY_CHATS_TO_SHOW_TEXT = 'No any chats or conversations to show...';

const ChatList: React.FC = () => {
  const [targetIdToDelete, setTargetIdToDelete] = useState<string>('');
  const [visibleChatsType, setVisibleChatsType] = useState<ChatType[]>(['private-chat', 'conversation']);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const { conversations } = useConversationsChange();
  const { privateChats } = usePrivateChatsChange();
  const { users } = useUsersInDBChange();
  const targetChat = useSelector(selectChatByCurrentChatId);
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
  }, [
    privateChats, setTargetIdToDelete, conversations, setIsDeleteModalVisible,
  ]);

  const onSelectChatsTypeHandler = useCallback((type: ChatType) => (event: CheckboxChangeEvent) => {
    const isChecked = event.target.checked;
    setVisibleChatsType((types) => {
      if (types.includes(type) && !isChecked) {
        return types.filter((filteredType) => filteredType !== type);
      }

      return [...types, type];
    });
  }, [setVisibleChatsType]);

  return (
    <ChatListContainer>
      <ChatListController
        users={users}
        onSelectChatsTypeHandler={onSelectChatsTypeHandler}
        visibleChatsType={visibleChatsType}
      />
      <div className="chat-list__items" onClick={onChatDeleteClickHandle}>
        {isNeedToShowNoChatsMessage && (
          <div>{NO_ANY_CHATS_TEXT}</div>
        )}
        {visibleChatsType.length === 0 && !isNeedToShowNoChatsMessage && (
          <div>{NO_ANY_CHATS_TO_SHOW_TEXT}</div>
        )}
        {visibleChatsType.includes('private-chat') && (privateChats).map((chat) => (
          <ChatItem
            key={chat.id}
            chatId={chat.id}
            userEmail={chat.user?.email || ''}
            lastMessageText={targetChat?.lastMessage || ''}
          />
        ))}
        {visibleChatsType.includes('conversation') && conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversationId={conversation.id}
            conversationName={conversation.name}
            lastMessageText={targetChat?.lastMessage || ''}
          />
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
