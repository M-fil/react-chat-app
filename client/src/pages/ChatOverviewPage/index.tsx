import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import MainHeader from '../../core/components/MainHeader';
import ChatList from './components/ChatsList';
import MainContainer from '../../core/styles/components/MainContainer';
import { selectCurrentChatId } from '../../core/selectors/chats';
import { socket } from '../../App';
import { SocketEvents } from '../../core/constants/events';

const ChatOverviewPage: React.FC = () => {
  const currentChatId = useSelector(selectCurrentChatId);

  useEffect(() => {
    socket.emit(SocketEvents.LeaveChat, currentChatId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat Page</title>
      </Helmet>

      <MainContainer>
        <MainHeader />
        <ChatList />
      </MainContainer>
    </>
  )
}

export default ChatOverviewPage;
