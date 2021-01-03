import { createSelector } from 'reselect';

import { AppState } from '../redux/reducers';
import { State, UserEntity } from '../redux/reducers/auth';

const selectAuthState = (state: AppState): State => state.auth;

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state: State): boolean => state.isLoading,
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: State): UserEntity => state.user,
);

export const selectUserEmail = createSelector(
  selectAuthState,
  (state: State): string => state.user?.email || '',
);

export const selectUserChats = createSelector(
  selectAuthState,
  (state: State): UserEntity[] => state.user.chats || [],
);

export const selectUserUid = createSelector(
  selectAuthState,
  (state: State): string => state.user?.uid || '',
);

export const selectUserAvatar = createSelector(
  selectAuthState,
  (state: State): string => state.user?.avatar || ''
);
