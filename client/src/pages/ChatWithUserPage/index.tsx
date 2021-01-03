import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatNavBar from '../../core/components/Chat/ChatNavBar';
import ChatPageContainer from '../ChatOverviewPage/styled';
import ChatMessages from '../../core/components/Chat/ChatMessages';
import ChatInputContainer from '../../core/components/Chat/ChatInputContainer';
import * as UserServices from '../../core/services/users';
import { UserEntity } from '../../core/redux/reducers/auth';
import Loader from '../../core/components/Loader';
import { MainRoutes } from '../../core/constants/routes/main-routes';
import { socket } from '../../App';
import { SocketEvents } from '../../core/constants/events';
import { ChatPageParams } from '../../core/interfaces/routes';

const ChatWithUserPage: React.FC = () => {
  const params: ChatPageParams = useParams();
  const userId = useMemo(() => params.userId, [params.userId]);
  const [interlocutor, setInterlocutor] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    UserServices
      .getUserFromDBByUid(userId)
      .then((user) => {
        if (!user) {
          throw new Error();
        }

        setInterlocutor(user);
      })
      .catch((error: Error) => {
        socket.emit(SocketEvents.Error, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ChatPageContainer>
      {interlocutor && (
        <>
          <ChatNavBar
            title={`Chat with ${interlocutor.email}`}
            showBackButton
            backTo={MainRoutes.ChatOverviewRoute_2}
          />
          <ChatMessages type="private" />
          <ChatInputContainer />
        </>
      )}
    </ChatPageContainer>
  );
};

export default ChatWithUserPage;
