import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as UserServices from '../../services/users';
import { selectUserUid } from '../../selectors/auth';
import { selectUsersFromCurrentChats } from '../../selectors/chats';
import { UserEntity } from '../../interfaces/user';
import { MainRoutes } from '../../constants/routes/main-routes';
import { socket } from '../../../App';

interface UseUsersInDBChangeReturnedValue {
  users: UserEntity[],
}

export const useUsersInDBChange = (): UseUsersInDBChangeReturnedValue => {
  const currentUserUid = useSelector(selectUserUid);
  const usersFromCurrentChats = useSelector(selectUsersFromCurrentChats);
  const [users, setUsers] = useState<UserEntity[]>([]);

  useEffect(() => {
    const getLinkOnUsers = UserServices.getLinkOnUserByUid('')
    getLinkOnUsers.on('value', (snapshot) => {
      const data = snapshot.val();
      setUsers(data ? Object.values(data) : []);
    });

    return () => {
      getLinkOnUsers.off('value');
    };
  }, []);

  useEffect(() => {
    UserServices
      .getAllUsersForAutoComplete(currentUserUid, usersFromCurrentChats)
      .then((filteredUsers) => {
        setUsers(filteredUsers);
      })
      .catch((err) => {
        socket.emit(MainRoutes.ErrorPage, err);
      });
  }, [setUsers, currentUserUid, usersFromCurrentChats]);

  return {
    users,
  }
};
