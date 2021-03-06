import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AutoComplete, message } from 'antd';

import AutocompleteInput from '../../../../core/components/AutocompleteInput';
import ConversationControllerContainer from './styled';
import * as UserServices from '../../../../core/services/users';
import * as ConversationServices from '../../../../core/services/conversation';
import * as ChatServices from '../../../../core/services/chats';
import { selectUserUid } from '../../../../core/selectors/auth';
import { selectCurrentChatId } from '../../../../core/selectors/chats';
import { UserEntity } from '../../../../core/interfaces/user';
import { socket } from '../../../../App';
import { MainRoutes } from '../../../../core/constants/routes/main-routes';
import { ConversationEntity } from '../../../../core/interfaces/conversation';
import UsersListModal from '../UsersListModal';
import { DefaultButton, InputButton } from '../../../../core/styles/components/Buttons';

interface ConversationControllerProps {
  currentConversation: ConversationEntity | null,
}

const ConversationController: React.FC<ConversationControllerProps> = ({ currentConversation }) => {
  const currentUserUid = useSelector(selectUserUid);
  const currentChatId = useSelector(selectCurrentChatId);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const [isListOfUsersVisible, setIsListOfUsersVisible] = useState<boolean>(false);
  const usersIdsOfCurrentConversation = useMemo(
    () => (currentConversation?.interlocutors || []).map((interlocutor) => interlocutor.uid),
    [currentConversation],
  );
  const usersOfCurrentConversation = useMemo(
    () => (currentConversation?.interlocutors || []),
    [currentConversation],
  );

  useEffect(() => {
    UserServices
      .getAllUsersForAutoComplete(currentUserUid, usersIdsOfCurrentConversation)
      .then((filteredUsers) => {
        setUsers(filteredUsers);
      })
      .catch((err) => {
        socket.emit(MainRoutes.ErrorPage, err);
      });
  }, [setUsers, currentUserUid, usersIdsOfCurrentConversation]);

  const onUserValueChange = useCallback((value: string) => {
    setSelectedUserEmail(value);
  }, []);

  const renderAutoCompleteValue = useCallback((value: UserEntity) => (
    <AutoComplete.Option key={value.uid} value={value.email}>
      {value.email}
    </AutoComplete.Option>
  ), []);

  const renderAutoCompleteOption = useCallback((value: UserEntity) => ({
    value: value.email,
  }), []);

  const onAddToConversationClickHandler = useCallback(() => {
    const interlocutor = users.find((user) => user.email === selectedUserEmail);
    const errorMessage = `The error was occurred while adding ${selectedUserEmail} to conversation. Please, try again...`;

    if (interlocutor && currentChatId) {
      delete interlocutor.chats;
      delete interlocutor.conversations;
      const newInterlocutors = [...usersOfCurrentConversation, interlocutor];
      
      ConversationServices
        .updateInterlocutorsInConversation(currentChatId, newInterlocutors)
        .then(() => {
          ConversationServices.addConversationIdToUser(
            interlocutor.uid, currentChatId, interlocutor.conversations?.length || 0,
          );
          ChatServices.addNotificationMessageInDB(
            currentChatId,
            `${interlocutor.email} was added to the chat`,
          );
        })
        .catch(() => {
          message.error(errorMessage);
        })
        .finally(() => {
          setSelectedUserEmail('');
        });
    } else {
      message.error(errorMessage);
    }
  }, [users, selectedUserEmail, currentChatId, usersOfCurrentConversation]);

  const onAddToConversationKeyDownHandler = useCallback((event: KeyboardEventInit) => {
    if (event.key === 'enter') {
      onAddToConversationClickHandler();
    }
  }, [onAddToConversationClickHandler]);

  const showListOfUsers = useCallback(() => {
    setIsListOfUsersVisible(true);
  }, []);

  const onCloseListOfUsers = useCallback(() => {
    setIsListOfUsersVisible(false);
  }, []);

  return (
    <ConversationControllerContainer>
      <UsersListModal
        isVisible={isListOfUsersVisible}
        users={currentConversation?.interlocutors || []}
        adminId={currentConversation?.admin.uid || ''}
        onCancel={onCloseListOfUsers}
        withFooterButtons={false}
      />
      <div className="add-user-block">
        <AutocompleteInput<UserEntity, string>
          selectedValue={selectedUserEmail}
          values={users}
          renderValue={renderAutoCompleteValue}
          renderOption={renderAutoCompleteOption}
          onValueChange={onUserValueChange}
        />
        <InputButton
          height="30px"
          onClick={onAddToConversationClickHandler}
          onKeyDown={onAddToConversationKeyDownHandler}
        >
          Add
        </InputButton>
      </div>
      <div className="other-buttons">
        <DefaultButton onClick={showListOfUsers}>
          See all Users of this conversation
        </DefaultButton>
      </div>
    </ConversationControllerContainer>
  );
};

export default ConversationController;
