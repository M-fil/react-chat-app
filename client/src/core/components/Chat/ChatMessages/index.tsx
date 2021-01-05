import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatMessagesContainer from './styled';
import { socket } from '../../../../App';
import { MessageEntity } from '../../../interfaces/chat';
import { SocketEvents } from '../../../constants/events';
import * as ChatServices from '../../../services/chats';
import { selectUserUid } from '../../../selectors/auth';
import { selectCurrentMessages, selectCurrentChatId } from '../../../selectors/chats';
import { updateCurrentMessagesAction } from '../../../redux/actions/chat';

export type MessagesType = 'group' | 'private';

interface ChatMessagesProps {
  type: MessagesType,
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUserUid = useSelector(selectUserUid);
  const currentChatId = useSelector(selectCurrentChatId);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const currentMessages = useSelector(selectCurrentMessages);
  const dispatch = useDispatch();

  const scrollToTheLastMessage = useCallback(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      const containerScrollHeight = messagesContainer.scrollHeight;
      messagesContainer.scrollBy(0, containerScrollHeight);
    }
  }, []);

  useEffect(() => {
    socket.on(SocketEvents.ReceiveMessage, (message: MessageEntity, isChannel: boolean) => {
      const newMessages = [...currentMessages, message];
      dispatch(updateCurrentMessagesAction(newMessages));
      if (isChannel && currentChatId) {
        ChatServices.createNewMessageForChat(currentChatId, message);
      } else {
        ChatServices.createNewMessageForChat(currentUserUid, message);
      }
    });
  }, [currentUserUid, type, currentChatId, currentMessages, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    ChatServices.getAllMessagesFromChat(currentChatId)
      .then((messages) => {
        dispatch(updateCurrentMessagesAction(messages ? Object.values(messages) : []))
        setIsLoading(false);
        scrollToTheLastMessage();
      })
      .catch((error) => {
        setIsLoading(false);
        socket.emit(SocketEvents.Error, error);
      });
  }, [currentUserUid, scrollToTheLastMessage, currentChatId, type, dispatch]);

  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1];

    if (lastMessage && lastMessage.from?.uid === currentUserUid) {
      scrollToTheLastMessage();
    }
  }, [currentMessages, currentUserUid, scrollToTheLastMessage]);

  return (
    <ChatMessagesContainer ref={messagesContainerRef}>
      {isLoading
        ? (
          <h3>
            Load messages...
          </h3>
        ) : (
          <div className="messages-wrapper">
            {currentMessages.map((message) => {
              const isCurrentUser = message.from?.uid !== currentUserUid;

              if (message.isNotification) {
                return (
                  <div key={message.id} className="notification-message">
                    {message.text}
                  </div>
                );
              }
      
              return (
                <div
                  key={message.id}
                  className={isCurrentUser ? `message-right` : ''}
                >
                  <h3>{message.from?.email}</h3>
                  <span>
                    {message.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
