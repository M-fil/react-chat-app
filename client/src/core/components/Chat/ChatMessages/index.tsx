import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import ChatMessagesContainer from './styled';
import { socket } from '../../../../App';
import { MessageEntity } from '../../../interfaces/chat';
import { SocketEvents } from '../../../constants/events';
import * as ChatServices from '../../../services/chats';
import * as ConversationServices from '../../../services/conversation';
import { selectUserUid, selectUserEmail, selectUserAvatar } from '../../../selectors/auth';

export type MessagesType = 'group' | 'private';

interface ChatMessagesProps {
  type: MessagesType,
  conversationId?: string,
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ type, conversationId = '' }) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUserUid = useSelector(selectUserUid);
  const currentUserEmail = useSelector(selectUserEmail);
  const currentUserAvatar = useSelector(selectUserAvatar);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToTheLastMessage = useCallback(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      const containerScrollHeight = messagesContainer.scrollHeight;
      messagesContainer.scrollBy(0, containerScrollHeight);
    }
  }, []);

  useEffect(() => {
    if (type === 'private') {
      socket.on(SocketEvents.ReceiveMessage, (message: MessageEntity) => {
        setMessages((prevMessages) => ([...prevMessages, message]));
        ChatServices.createNewMessageForChat(currentUserUid, message);
        if (message.from?.uid === currentUserUid) {
          scrollToTheLastMessage();
        }
      });
    }
  }, [currentUserUid, scrollToTheLastMessage, type]);

  useEffect(() => {
    if (type === 'group') {
      socket.on(SocketEvents.AdminJoinToConversation, (conversationId: string) => {
        const message: MessageEntity = {
          id: shortid.generate(),
          text: `${currentUserEmail} created this chat`,
          createdAt: new Date(Date.now()),
          isNotification: true,
        };
        setMessages((prevMessages) => ([...prevMessages, message]));
        ConversationServices.addMessageToConversationFromDB(
          currentUserUid, conversationId, message,
        );
      });
    }
  }, [currentUserEmail, currentUserAvatar, currentUserUid, type]);

  useEffect(() => {
    setIsLoading(true);
    const getData = type === 'private'
      ? ChatServices.getAllMessagesFromChat(currentUserUid)
      : ConversationServices.getMessagesOfConversation(currentUserUid, conversationId);

    getData
      .then((messages) => {
        setMessages(messages ? Object.values(messages) : []);
        setIsLoading(false);
        scrollToTheLastMessage();
      })
      .catch((error) => {
        setIsLoading(false);
        socket.emit(SocketEvents.Error, error);
      });
  }, [currentUserUid, scrollToTheLastMessage, conversationId, type]);

  return (
    <ChatMessagesContainer ref={messagesContainerRef}>
      {isLoading
        ? (
          <h3>
            Load messages...
          </h3>
        ) : (
          <div className="messages-wrapper">
            {messages.map((message) => {
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
