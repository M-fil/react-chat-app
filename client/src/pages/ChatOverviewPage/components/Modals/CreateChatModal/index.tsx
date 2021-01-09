import React, { useCallback, useState } from 'react';
import { Modal, Form, Input, Button, AutoComplete } from 'antd';
import { useSelector } from 'react-redux';

import { ChatType, InterlocutorEntity } from '../../../../../core/interfaces/chat';
import {
  selectCurrentUser, selectUserConversationIds, selectUserChatsIds,
} from '../../../../../core/selectors/auth';
import * as ConversationServices from '../../../../../core/services/conversation';
import * as ChatServices from '../../../../../core/services/chats';
import * as PrivateChatServices from '../../../../../core/services/private-chats';
import { SocketEvents } from '../../../../../core/constants/events';
import { socket } from '../../../../../App';
import { UserEntity } from '../../../../../core/interfaces/user';
import AutocompleteInput from '../../../../../core/components/AutocompleteInput';

interface CreateChatModalProps {
  type: ChatType,
  users: UserEntity[],
  setIsVisible: Function,
  isVisible: boolean,
}

interface FormValues {
  conversationName: string,
}

const defaultTitles = {
  'private-chat': 'Create private chat',
  'conversation': 'Create conversation',
};
const { Option } = AutoComplete;

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  type, users, setIsVisible, isVisible,
}) => {
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const currentUser = useSelector(selectCurrentUser);
  const conversationIds = useSelector(selectUserConversationIds);
  const chatIds = useSelector(selectUserChatsIds);
  const [form] = Form.useForm();

  const createNewConversation = useCallback((conversationName: string) => {
    const adminInterlocutor: InterlocutorEntity = {
      uid: currentUser.uid,
      email: currentUser.email,
      avatar: currentUser.avatar,
    };
    const { conversationId } = ConversationServices.createNewConversationInDB(
      adminInterlocutor, conversationName, conversationIds.length,
    );
    socket.emit(SocketEvents.CreateConversation, conversationId);
    ChatServices.addNotificationMessageInDB(conversationId, `${currentUser.email} created this chat`);
  }, [currentUser, conversationIds]);

  const createNewPrivateChat = useCallback(() => {
    const selectedUser = users.find((user) => user.email === selectedUserEmail);

    if (selectedUser) {
      const interlocutors: InterlocutorEntity[] = [
        {
          uid: currentUser.uid,
          email: currentUser.email,
          avatar: currentUser.avatar,
        },
        {
          uid: selectedUser.uid,
          email: selectedUser.email,
          avatar: selectedUser.avatar,
        }
      ];
      const { chatId } = PrivateChatServices.createPrivateChatInDB(interlocutors);
      const newChats = [...chatIds, chatId];
      interlocutors.forEach((interlocutor) => {
        ChatServices.updateChatsOfUser(interlocutor.uid, newChats);
      });

      socket.emit(SocketEvents.CreateChat, selectedUser.uid);
    }

    setSelectedUserEmail('');
  }, [chatIds, users, currentUser.uid, currentUser.avatar, currentUser.email, selectedUserEmail]);

  const renderAutoCompleteValue = useCallback((value: UserEntity) => (
    <Option key={value.uid} value={value.email}>
      {value.email}
    </Option>
  ), []);

  const renderAutoCompleteOption = useCallback((value: UserEntity) => ({
    value: value.email,
  }), []);

  const onUserValueChange = useCallback((value: string) => {
    form.setFieldsValue({
      selectedUserEmail: value,
    });
  }, [form]);

  const onChatCreateSubmitHandler = useCallback((values: FormValues) => {
    console.log('values', values);

    if (type === 'conversation') {
      createNewConversation(values.conversationName);
    } else {
      createNewPrivateChat();
    }

    form.resetFields();
    setIsVisible(false);
  }, [type, createNewConversation, createNewPrivateChat, form, setIsVisible]);

  const onCloseModal = useCallback(() => {
    setIsVisible(false);
    form.resetFields();
  }, [setIsVisible, form]);

  return (
    <Modal
      title={defaultTitles[type]}
      footer={null}
      onCancel={onCloseModal}
      visible={isVisible}
    >
      <Form
        form={form}
        onFinish={onChatCreateSubmitHandler}
      >
        {type === 'conversation'
          ? (
            <Form.Item
              name="conversationName"
              rules={[{ required: true, message: 'Please input the conversation name!' }]}
            >
              <Input placeholder="Conversation Name..." />
            </Form.Item>
          )
          : (
            <Form.Item
              name="selectedUserEmail"
              initialValue=""
              rules={[{ required: true, message: 'Please input the conversation name!' }]}
            >
              <AutocompleteInput<UserEntity, string>
                selectedValue={form.getFieldValue('selectedUserEmail')}
                values={users}
                renderValue={renderAutoCompleteValue}
                renderOption={renderAutoCompleteOption}
                onValueChange={onUserValueChange}
                placeholder="User Email..."
              />
            </Form.Item>
          )}
        <Form.Item>
          <Button htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default CreateChatModal;
