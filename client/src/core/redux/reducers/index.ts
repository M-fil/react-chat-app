import { createStore, applyMiddleware, Store, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as fromAuth from './auth';
import * as fromChats from './chat';

export interface AppState {
  auth: fromAuth.State,
  chat: fromChats.State,
}

const rootReducer = combineReducers<AppState>({
  auth: fromAuth.authReducer,
  chat: fromChats.chatsReducer,
});
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
