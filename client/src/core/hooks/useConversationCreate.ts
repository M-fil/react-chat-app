import { useEffect } from 'react';
import shortid from 'shortid';
import { useSelector } from 'react-redux';

import * as ChatServices from '../services/chats';
import { SocketEvents } from '../constants/events';
import { MessageEntity } from '../interfaces/chat';
import { socket } from '../../App';
import { selectUserEmail } from '../selectors/auth';

export const useConversationCreate = () => {
    const currentUserEmail = useSelector(selectUserEmail);

    useEffect(() => {
        socket.on(SocketEvents.AdminJoinToConversation, (conversationId: string) => {
            const message: MessageEntity = {
                id: shortid.generate(),
                text: `${currentUserEmail} created this chat`,
                createdAt: new Date(Date.now()),
                isNotification: true,
            };
            ChatServices.createNewMessageForChat(conversationId, message);
        });

        return () => {
            socket.off(SocketEvents.AdminJoinToConversation);
        };
    }, [currentUserEmail]);
};
