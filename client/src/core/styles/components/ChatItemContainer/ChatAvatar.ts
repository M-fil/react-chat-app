import styled from 'styled-components';
import { Avatar } from 'antd';

export interface ChatAvatarProps {
  backgroundColor: string,
  textColor: string,
}

const ChatAvatar = styled(Avatar)<ChatAvatarProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
`;

export default ChatAvatar;
