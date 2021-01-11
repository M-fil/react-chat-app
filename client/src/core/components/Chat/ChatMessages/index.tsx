import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatMessagesContainer from './styled';
import { socket } from '../../../../App';
import { MessageEntity } from '../../../interfaces/chat';
import { SocketEvents } from '../../../constants/events';
import * as ChatServices from '../../../services/chats';
import { selectUserUid } from '../../../selectors/auth';
import { selectCurrentMessages, selectCurrentChatId } from '../../../selectors/chats';
import { updateCurrentMessagesAction, setCurrentMessagesAction } from '../../../redux/actions/chat';
import { MessageItem, MessageNotification } from '../../../styles/components/MessageItem';
import { MessagePositionType } from '../../../interfaces/chat';
import ChatAvatar from '../../../styles/components/ChatItemContainer/ChatAvatar';
import { loggedUserAvatarStyles as avatarStyles } from '../../../styles/colors';
import { UnderlinedText } from '../../../styles/components/Text';

export type MessagesType = 'group' | 'private';
const NO_MESSAGES_TEXT = 'No any messages with this user...';

const ChatMessages: React.FC = () => {
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
    const listenMessageReceive = (message: MessageEntity) => {
      dispatch(updateCurrentMessagesAction(message));
    };
    socket.on(SocketEvents.ReceiveMessage, listenMessageReceive);

    return () => {
      socket.off(SocketEvents.ReceiveMessage, listenMessageReceive);
    };
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    ChatServices.getAllMessagesFromChat(currentChatId)
      .then((messages) => {
        dispatch(setCurrentMessagesAction(messages ? Object.values(messages) : []))
        setIsLoading(false);
        scrollToTheLastMessage();
      })
      .catch((error) => {
        setIsLoading(false);
        socket.emit(SocketEvents.Error, error);
      });
  }, [currentUserUid, scrollToTheLastMessage, currentChatId, dispatch]);

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
            {currentMessages.length === 0 && !isLoading && (
              <div className="no-messages-text">
                {NO_MESSAGES_TEXT}
              </div>
            )}
            {currentMessages.map((message) => {
              const isCurrentUser = message.from?.uid === currentUserUid;
              const position: MessagePositionType = isCurrentUser ? 'right' : 'left';
              const firstAvatarLetter = message.from?.email[0].toUpperCase();

              if (message.isNotification) {
                return (
                  <MessageNotification
                    key={message.id}
                  >
                    <div className="message-wrapper">
                      {message.text}
                    </div>
                  </MessageNotification>
                );
              }
      
              return (
                <MessageItem
                  key={message.id}
                  position={position}
                >
                  <ChatAvatar
                    {...avatarStyles}
                    className="sender-avatar"
                  >
                    {firstAvatarLetter}
                  </ChatAvatar>
                  <div className="message-wrapper">
                    <UnderlinedText className="sender-name">
                      {isCurrentUser ? 'You' : message.from?.email}
                    </UnderlinedText>
                    <span className="message-text">
                      {message.text}
                    </span>
                  </div>
                </MessageItem>
              );
            })}
          </div>
        )}
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
