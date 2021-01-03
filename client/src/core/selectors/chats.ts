import { createSelector } from 'reselect';

import { AppState } from '../redux/reducers';
import { State } from '../redux/reducers/chat';

const selectChatsState = (state: AppState): State => state.chat;

export const selectChats = createSelector(
  selectChatsState,
  (state: State) => state.chats || [],
);
