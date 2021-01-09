import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
import { ConversationEntity } from '../../core/interfaces/conversation';
import { setCurrentChatIdAction } from '../../core/redux/actions/chat';
import ConversationController from './components/ConversationController';

const ConversationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationEntity | null>(null);
  const params: ChatPageParams = useParams();
  const conversationId = useMemo(() => params.conversationId, [params.conversationId]);
  const currentUserUid = useSelector(selectUserUid);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit(SocketEvents.JoinConversation, conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (conversation) {
      dispatch(setCurrentChatIdAction(conversation.id));
    }
  }, [conversation, dispatch]);

  useEffect(() => {
    ConversationServices.getLinkOnConversation([], conversationId).link
      .on('value', (snapshot) => {
        const data = snapshot.val();
        setConversation(data);
      });
  }, [conversationId]);

  useEffect(() => {
    setIsLoading(true);
    ConversationServices.getConversationsOfCurrentUserById(conversationId)
      .then((conversation) => {
        setConversation(conversation);
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
      <ConversationController currentConversation={conversation} />
      {isLoading
        ? <Loader />
        : <ChatMessages />
      }
      <ChatInputContainer />
    </ChatPageContainer>
  );
};

export default ConversationPage;
