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
import { selectChats, selectConversations } from '../../../../core/selectors/chats';
import { updateCurrentUserChatsAction, updateCurrentUserConversationsAction } from '../../../../core/redux/actions/chat';
import { UserEntity } from '../../../../core/redux/reducers/auth';
import DeleteModal from './components/DeleteModal';
import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { socket } from '../../../../App';
import { SocketEvents } from '../../../../core/constants/events';
import { ConversationEntity } from '../../../../core/interfaces/conversation';
import ChatListController from '../ChatListController';
import { MessagesType } from '../../../../core/components/Chat/ChatMessages';

export interface SearchUserOption {
  email: string,
  uid: string,
}

const ChatList: React.FC = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [targetIdToDelete, setTargetIdToDelete] = useState<string>('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const conversations = useSelector(selectConversations);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLinkOnUser = UserServices.getLinkOnUserByUid(currentUser.uid);
    getLinkOnUser
      .on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(updateCurrentUserChatsAction(data.chats))
      });

    return () => {
      getLinkOnUser.off('value');
    }
  }, [currentUser.uid, dispatch]);

  useEffect(() => {
    const getConversation = ConversationServices.getLinkOnConversation(currentUser.uid, [], '').link;
    getConversation
      .on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(updateCurrentUserConversationsAction(data ? Object.values(data) : []));
      });

    return () => {
      getConversation.off('value');
    }
  }, [currentUser.uid, dispatch]);

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
    const deleteType = targetDeleteButton && targetDeleteButton.dataset.deleteChatButton as MessagesType;
    const targetUid = targetElement && targetElement.dataset.userChatUid;

    console.log('targetUid', targetUid)
    if (targetDeleteButton && targetUid) {
      if (deleteType === 'private') {
        const chatToDelete = users.find((user) => user.uid === targetUid);
        if (chatToDelete) {
          setIsDeleteModalVisible(true);
          setTargetIdToDelete(chatToDelete.uid);
        }
      } else {
        const conversationToDelete = conversations.find((conversation) => conversation.id === targetUid);
        if (conversationToDelete) {
          setIsDeleteModalVisible(true);
          setTargetIdToDelete(conversationToDelete.id);
        }
      }
    }
  }, [users, setTargetIdToDelete, conversations, setIsDeleteModalVisible]);

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
              data-delete-chat-button="private"
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
