import React, { useCallback, useState } from 'react';
import { Button, AutoComplete, message, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import * as ChatServices from '../../../../core/services/chats';
import * as ConversationServices from '../../../../core/services/conversation';
import * as PrivateChatServices from '../../../../core/services/private-chats';
import { selectCurrentUser, selectUserConversationIds } from '../../../../core/selectors/auth';
import { selectChats } from '../../../../core/selectors/chats';
import { UserEntity } from '../../../../core/interfaces/user';
import { ChatType } from '../../../../core/interfaces/chat';
import { socket } from '../../../../App';
import { SocketEvents } from '../../../../core/constants/events';
import { InterlocutorEntity } from '../../../../core/interfaces/chat';
import AutocompleteInput from '../../../../core/components/AutocompleteInput';

const { Option } = AutoComplete;
export type SelectListItemType = 'conversations' | 'private_messages';

interface ChatListContainerProps {
  users: UserEntity[],
  onSelectChatsTypeHandler: (type: ChatType) => (event: CheckboxChangeEvent) => void,
  visibleChatsType: ChatType[],
}

const ChatListController: React.FC<ChatListContainerProps> = ({
  users, onSelectChatsTypeHandler, visibleChatsType,
}) => {
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const conversationIds = useSelector(selectUserConversationIds);

  const onUserValueChange = useCallback((value: string) => {
    setSelectedUserEmail(value);
  }, [setSelectedUserEmail]);

  const onCreateNewConversation = useCallback(() => {
    const adminInterlocutor: InterlocutorEntity = {
      uid: currentUser.uid,
      email: currentUser.email,
      avatar: currentUser.avatar,
    };
    const { conversationId } = ConversationServices.createNewConversationInDB(
      adminInterlocutor, 'Conversation', conversationIds.length,
    );
    socket.emit(SocketEvents.CreateConversation, conversationId);
    ChatServices.addNotificationMessageInDB(conversationId, `${currentUser.email} created this chat`);
  }, [currentUser, conversationIds]);

  const onCreateNewChat = useCallback(() => {
    const selectedUser = users.find((user) => user.email === selectedUserEmail);
    const isChatExists = chats.some((chatId) => (selectedUser?.chats || []).includes(chatId));

    if (!isChatExists && selectedUser) {
      const interlocutors: InterlocutorEntity[] = [
        {
          uid: currentUser.uid,
          email: currentUser.email,
          avatar: currentUser.avatar,
        },
        {
          uid: selectedUser.uid,
          email: selectedUser.email,
          avatar: selectedUser.avatar,
        }
      ];
      const { chatId } = PrivateChatServices.createPrivateChatInDB(interlocutors);
      const newChats = [...chats, chatId];
      interlocutors.forEach((interlocutor) => {
        ChatServices.updateChatsOfUser(interlocutor.uid, newChats);
      });

      message.success(`The chat with ${selectedUser.email} was created!`);
      socket.emit(SocketEvents.CreateChat, selectedUser.uid);
    } else {
      message.error(`The chat with ${selectedUser?.email || ''} is already exists`);
    }

    setSelectedUserEmail('');
  }, [chats, users, selectedUserEmail, currentUser.uid, currentUser.email, currentUser.avatar]);

  const renderAutoCompleteValue = useCallback((value: UserEntity) => (
    <Option key={value.uid} value={value.email}>
      {value.email}
    </Option>
  ), []);

  const renderAutoCompleteOption = useCallback((value: UserEntity) => ({
    value: value.email,
  }), []);

  return (
    <header>
      <AutocompleteInput<UserEntity, string>
        selectedValue={selectedUserEmail}
        values={users}
        renderValue={renderAutoCompleteValue}
        renderOption={renderAutoCompleteOption}
        onValueChange={onUserValueChange}
      />
      <Button
        onClick={onCreateNewChat}
        htmlType="button"
      >
        Create new chat
      </Button>
      <Button
        onClick={onCreateNewConversation}
        htmlType="button"
      >
        Create new conversation
      </Button>

      <div className="list-items-buttons">
        <Checkbox
          onChange={onSelectChatsTypeHandler('private-chat')}
          checked={visibleChatsType.includes('private-chat')}
        >
          Private Chats
        </Checkbox>
        <Checkbox
          onChange={onSelectChatsTypeHandler('conversation')}
          checked={visibleChatsType.includes('conversation')}
        >
          Conversations
        </Checkbox>
      </div>
    </header>
  );
};

export default ChatListController;
