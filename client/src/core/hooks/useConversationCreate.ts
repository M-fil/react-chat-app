import { useEffect } from 'react';
import shortid from 'shortid';
import { useSelector } from 'react-redux';

import * as ConversationServices from '../services/conversation';
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
            ConversationServices.addMessageToConversationFromDB(conversationId, message);
        });

        return () => {
            socket.off(SocketEvents.AdminJoinToConversation);
        };
    }, []);
};
