import { ChatAvatarProps } from './components/ChatItemContainer/ChatAvatar';

interface ColorsProps {
  [prop: string]: string,
}

export const globalDefaultColors: ColorsProps = {
  borderColor: '#E3E7EC',
  textColor: '#000000',
  buttonActiveBackground: '#0079FF',
  mainContainerBackground: '#F6F6F6',
  mainHeaderBackground: '#ffffff',
}

export const privateChatAvatarStyles: ChatAvatarProps = {
  backgroundColor: '#F56A00',
  textColor: '#fffff',
};

export const conversationAvatarStyles: ChatAvatarProps = {
  backgroundColor: '#87D068',
  textColor: '#fffff',
};

export const loggedUserAvatarStyles: ChatAvatarProps = {
  backgroundColor: '#F56A00',
  textColor: '#fffff',
}
