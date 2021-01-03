import { useEffect } from 'react';
import { message } from 'antd';
import { Socket } from 'socket.io-client';
import { SocketEvents } from '../constants/events';

const messageDisappearTime = 2;

const useSocketConnect = (socket: Socket) => {
  useEffect(() => {
    socket.on(SocketEvents.Connect, () => {
      console.log(socket.id);
      message.success('The connection was initialized!', messageDisappearTime);
    });

    socket.on(SocketEvents.Disconnect, () => {
      message.error('You were disconnected!', messageDisappearTime);
    });
  }, [socket]);
}

export { useSocketConnect };
