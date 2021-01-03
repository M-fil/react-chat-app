import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChatNavBar from '../../core/components/Chat/ChatNavBar';
import ChatPageContainer from '../ChatOverviewPage/styled';
import ChatMessages from '../../core/components/Chat/ChatMessages';
import ChatInputContainer from '../../core/components/Chat/ChatInputContainer';
import * as ConversationServices from '../../core/services/conversation';
import Loader from '../../core/components/Loader';
import { MainRoutes } from '../../core/constants/routes/main-routes';
import { ChatPageParams } from '../../core/interfaces/routes';
import { selectUserUid } from '../../core/selectors/auth';
import { socket } from '../../App';
import { SocketEvents } from '../../core/constants/events';

const ConversationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params: ChatPageParams = useParams();
  const conversationId = useMemo(() => params.conversationId, [params.conversationId]);
  const currentUserUid = useSelector(selectUserUid);

  useEffect(() => {
    setIsLoading(true);
    ConversationServices.getConversationsOfCurrentUserById(currentUserUid, conversationId)
      .then((conversation) => {
        console.log('conversation', conversation);
      })
      .catch((err) => {
        socket.emit(SocketEvents.Error, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, currentUserUid]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ChatPageContainer>
      <ChatNavBar
        title={`Conversation`}
        showBackButton
        backTo={MainRoutes.ChatOverviewRoute_2}
      />
      <ChatMessages type="group" />
      <ChatInputContainer />
    </ChatPageContainer>
  );
};

export default ConversationPage;
