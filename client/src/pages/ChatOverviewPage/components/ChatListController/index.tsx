import React, { useCallback, useState } from 'react';
import { Button, AutoComplete, message, Checkbox } from 'antd';
import { useSelector } from 'react-redux';

import * as UserServices from '../../../../core/services/users';
import * as ChatServices from '../../../../core/services/chats';
import * as ConversationServices from '../../../../core/services/conversation';
import { selectCurrentUser } from '../../../../core/selectors/auth';
import { selectChats } from '../../../../core/selectors/chats';
import { updateCurrentUserChatsAction } from '../../../../core/redux/actions/chat';
import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { UserEntity } from '../../../../core/redux/reducers/auth';
import { socket } from '../../../../App';
import { SocketEvents } from '../../../../core/constants/events';
import { ConversationEntity } from '../../../../core/interfaces/conversation';

const { Option } = AutoComplete;
export type SelectListItemType = 'conversations' | 'private_messages';

interface ChatListContainerProps {
  users: UserEntity[],
}

const ChatListController: React.FC<ChatListContainerProps> = ({ users }) => {
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);

  const onSearchUser = useCallback((value: string, option) => {
    return option.value.indexOf(value) !== -1;
  }, []);

  const onUserValueChange = useCallback((value: string) => {
    setSelectedUserEmail(value);
  }, [setSelectedUserEmail]);

  const onCreateNewConversation = useCallback(() => {
    const { conversationId } = ConversationServices.createNewConversationInDB(currentUser, 'Conversation');
    socket.emit(SocketEvents.CreateConversation, conversationId);
  }, [currentUser]);

  const onCreateNewChat = useCallback(() => {
    const isChatExists = chats.some((chat) => chat.email === selectedUserEmail);
    const selectedUser = users.find((user) => user.email === selectedUserEmail);

    if (!isChatExists && selectedUser) {
      const newChats = [...chats, selectedUser];
      ChatServices.updateChatsOfUser(currentUser.uid, newChats);
      message.success(`The chat with ${selectedUser.email} was created!`);
    } else {
      message.error(`The chat with ${selectedUser?.email || ''} is already exists`);
    }

    setSelectedUserEmail('');
  }, [chats, users, selectedUserEmail, currentUser.uid]);

  const onSelectItemsChangeHandle = useCallback((type: SelectListItemType) => () => {
    
  }, []);

  return (
    <header>
      <AutoComplete
        filterOption={onSearchUser}
        onChange={onUserValueChange}
        value={selectedUserEmail}
        options={users.map((user) => ({ value: user.email }))}
        placeholder="Choose the user for communication"
        style={{ width: 200 }}
      >
        {users.map((user) => (
          <Option key={user.uid} value={user.email}>
            {user.email}
          </Option>
        ))}
      </AutoComplete>
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
        <Checkbox onChange={onSelectItemsChangeHandle('private_messages')}>
          Private Chats
        </Checkbox>
        <Checkbox onChange={onSelectItemsChangeHandle('conversations')}>
          Conversations
        </Checkbox>
      </div>
    </header>
  );
};

export default ChatListController;
