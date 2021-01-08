import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChatNavBar from '../../core/components/Chat/ChatNavBar';
import ChatPageContainer from '../ChatOverviewPage/styled';
import ChatMessages from '../../core/components/Chat/ChatMessages';
import ChatInputContainer from '../../core/components/Chat/ChatInputContainer';
import * as UserServices from '../../core/services/users';
import * as PrivateChatServices from '../../core/services/private-chats';
import { UserEntity } from '../../core/interfaces/user';
import { PrivateChatEntity } from '../../core/interfaces/chat';
import Loader from '../../core/components/Loader';
import { MainRoutes } from '../../core/constants/routes/main-routes';
import { socket } from '../../App';
import { SocketEvents } from '../../core/constants/events';
import { ChatPageParams } from '../../core/interfaces/routes';
import { selectUserUid } from '../../core/selectors/auth';
import { setCurrentChatIdAction } from '../../core/redux/actions/chat';

const ChatWithUserPage: React.FC = () => {
  const params: ChatPageParams = useParams();
  const chatId = useMemo(() => params.chatId, [params.chatId]);
  const currentUserUid = useSelector(selectUserUid);
  const [currentChat, setCurrentChat] = useState<PrivateChatEntity | null>(null);
  const [interlocutorName, setInterlocutorName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit(SocketEvents.JoinPrivateChat, chatId);
  }, [currentUserUid, chatId]);

  useEffect(() => {
    if (currentChat) {
      dispatch(setCurrentChatIdAction(currentChat.id));
    }
  }, [currentChat, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    PrivateChatServices.getPrivateChatByIdFromDB(chatId)
      .then((chat: PrivateChatEntity) => {
        setCurrentChat(chat);
        const interlocutor = chat?.interlocutors
          .find((interlocutor) => interlocutor.uid !== currentUserUid);
        UserServices.getUserFromDBByUid(interlocutor?.uid || '')
          .then((user: UserEntity) => {
            setInterlocutorName(user.email);
            setIsLoading(false);
          })
      })
      .catch((error) => {
        socket.emit(SocketEvents.Error, error);
        setIsLoading(false);
      })
  }, [chatId, currentUserUid]);

  return (
    <ChatPageContainer>
        <>
          <ChatNavBar
            title={`Chat with ${interlocutorName}`}
            showBackButton
            backTo={MainRoutes.ChatOverviewRoute_2}
          />
          {!isLoading
            ? (
              <ChatMessages
                type="private"
              />
            )
            : (
              <Loader />
            )}
          <ChatInputContainer />
        </>
    </ChatPageContainer>
  );
};

export default ChatWithUserPage;
