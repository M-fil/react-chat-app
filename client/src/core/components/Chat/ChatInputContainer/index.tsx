import React, { useCallback, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { SocketEvents } from '../../../constants/events';
import { socket } from '../../../../App';
import { MessageEntity } from '../../../interfaces/chat';
import { selectUserEmail, selectUserAvatar, selectUserUid } from '../../../selectors/auth';
import ChatInputWrapper from './styled';
import * as ChatServices from '../../../services/chats';

interface MessageFormValues {
  message: string;
}

const ChatInputContainer: React.FC = () => {
  const currentUserEmail = useSelector(selectUserEmail);
  const currentUserAvatar = useSelector(selectUserAvatar);
  const currentUserUid = useSelector(selectUserUid);
  const [form] = Form.useForm();
  const messageInputRef = useRef<Input | null>(null);

  const onMessageSubmit = useCallback((values: MessageFormValues) => {
    const message: MessageEntity = {
      id: shortid.generate(),
      text: values.message,
      from: {
        email: currentUserEmail,
        avatar: currentUserAvatar,
        uid: currentUserUid,
      },
      createdAt: new Date(Date.now()),
    };
    ChatServices.createNewMessageForChat(currentUserUid, message);
    socket.emit(SocketEvents.SendMessage, message);
    form.resetFields();
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [currentUserAvatar, currentUserEmail, currentUserUid, form]);

  return (
    <ChatInputWrapper>
      <Form
        className="chat-input-container"
        onFinish={onMessageSubmit}
        form={form}
      >
        <Form.Item
          rules={[{ required: true }]}
          name="message"
          label="Input here your message"
          className="chat-input-container__message-input"
        >
          <Input ref={messageInputRef} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
          >
            <SendOutlined />
          </Button>
        </Form.Item>
      </Form>
    </ChatInputWrapper>
  );
};

export default ChatInputContainer;
