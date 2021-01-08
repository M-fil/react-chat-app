import React, { useCallback, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';

import { SocketEvents } from '../../../constants/events';
import { socket } from '../../../../App';
import { MessageEntity } from '../../../interfaces/chat';
import { selectCurrentUser } from '../../../selectors/auth';
import ChatInputWrapper from './styled';
import * as ChatServices from '../../../services/chats';
import { updateCurrentMessagesAction } from '../../../redux/actions/chat';
import {
  selectCurrentMessages, selectCurrentChatId,
} from '../../../selectors/chats';

interface MessageFormValues {
  message: string;
}

const ChatInputContainer: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const chatId = useSelector(selectCurrentChatId);
  const [form] = Form.useForm();
  const messageInputRef = useRef<Input | null>(null);
  const dispatch = useDispatch();
  const currentMessages = useSelector(selectCurrentMessages);

  const onMessageSubmit = useCallback((values: MessageFormValues) => {
    const message: MessageEntity = {
      id: shortid.generate(),
      text: values.message,
      from: {
        email: currentUser.email,
        avatar: currentUser.avatar,
        uid: currentUser.uid,
      },
      createdAt: new Date(Date.now()),
    };
    dispatch(updateCurrentMessagesAction([...currentMessages, message]));
    socket.emit(SocketEvents.SendMessage, chatId, message);
    form.resetFields();
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [currentUser, form, chatId, dispatch, currentMessages]);

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
