import React, { useCallback, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';

import { SocketEvents } from '../../../constants/events';
import { socket } from '../../../../App';
import { ChatType, MessageEntity } from '../../../interfaces/chat';
import { selectCurrentUser } from '../../../selectors/auth';
import ChatInputWrapper from './styled';
import { updateCurrentMessagesAction } from '../../../redux/actions/chat';
import { selectCurrentChatId } from '../../../selectors/chats';
import WidthLimiterContainer from '../../../styles/components/WidthLimiterContainer';

interface MessageFormValues {
  message: string;
}

interface ChatInputContainerProps {
  type: ChatType,
}

const ChatInputContainer: React.FC<ChatInputContainerProps> = ({ type }) => {
  const currentUser = useSelector(selectCurrentUser);
  const chatId = useSelector(selectCurrentChatId);
  const [form] = Form.useForm();
  const messageInputRef = useRef<Input | null>(null);
  const dispatch = useDispatch();

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
    dispatch(updateCurrentMessagesAction(message));
    socket.emit(SocketEvents.SendMessage, chatId, message, type, false);
    form.resetFields();
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [currentUser, form, chatId, dispatch, type]);

  return (
    <ChatInputWrapper>
      <WidthLimiterContainer>
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
      </WidthLimiterContainer>
    </ChatInputWrapper>
  );
};

export default ChatInputContainer;
