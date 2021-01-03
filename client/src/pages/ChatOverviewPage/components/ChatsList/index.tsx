import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import ChatListContainer from './styled';
import * as UserServices from '../../../../core/services/users';
import * as ChatServices from '../../../../core/services/chats';
import * as ConversationServices from '../../../../core/services/conversation';
import { selectCurrentUser } from '../../../../core/selectors/auth';
import { selectChats } from '../../../../core/selectors/chats';
import { updateCurrentUserChatsAction } from '../../../../core/redux/actions/chat';
import { UserEntity } from '../../../../core/redux/reducers/auth';
import DeleteModal from './components/DeleteModal';
import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { socket } from '../../../../App';
import { SocketEvents } from '../../../../core/constants/events';
import { ConversationEntity } from '../../../../core/interfaces/conversation';
import ChatListController from '../ChatListController';

export interface SearchUserOption {
  email: string,
  uid: string,
}

const ChatList: React.FC = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [targetChatToDelete, setTargetChatToDelete] = useState<SearchUserOption | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationEntity[]>([]);
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  useEffect(() => {
    UserServices.getLinkOnUserByUid(currentUser.uid)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(updateCurrentUserChatsAction(data.chats))
      });

    return () => {
      UserServices.getLinkOnUserByUid(currentUser.uid).off('value');
    }
  }, [currentUser.uid, dispatch]);

  useEffect(() => {
    ConversationServices.getConversationsOfCurrentUser(currentUser.uid)
      .then((conversationsFromDB) => {
        setConversations(conversationsFromDB ? Object.values(conversationsFromDB) : []);
      })
      .catch((error) => {
        socket.emit(SocketEvents.Error, error);
      });
  }, [currentUser.uid, setConversations]);

  useEffect(() => {
    UserServices
      .getAllUsersFromDB()
      .then((usersFromDb) => {
        if (usersFromDb) {
          setUsers(Object.values(usersFromDb));
        }
      })
      .catch((err) => {
        socket.emit(MainRoutes.ErrorPage, err);
      });
  }, [setUsers, dispatch]);

  const onChatDeleteClickHandle = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const targetElement = target.closest('[data-user-chat-uid]') as HTMLDivElement;
    const targetDeleteButton = target.closest('[data-delete-chat-button') as HTMLButtonElement;
    const targetUid = targetElement && targetElement.dataset.userChatUid;

    if (targetDeleteButton && targetUid) {
      const chatToDelete = users.find((user) => user.uid === targetUid);
      if (chatToDelete) {
        setIsDeleteModalVisible(true);
        setTargetChatToDelete(chatToDelete);
      }
    }
  }, [users, setTargetChatToDelete]);

  return (
    <ChatListContainer>
      <ChatListController
        users={users}
      />
      <div className="chat-list__items" onClick={onChatDeleteClickHandle}>
        {(chats).map((chat) => (
          <div data-user-chat-uid={chat.uid} key={chat.uid}>
            <Link
              to={`${MainRoutes.ChatOverviewRoute_2}/${chat.uid}`}
              key={chat.uid}
              replace={false}
            >
              {chat.email}
            </Link>
            <Button
              type="primary"
              className="delete-chat-button"
              data-delete-chat-button
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
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
              data-delete-chat-button
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </div>
      <DeleteModal
        targetChat={targetChatToDelete}
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
      />
    </ChatListContainer>
  );
};

export default ChatList;
