import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { selectUserEmail } from '../../../selectors/auth';
import { logOutThunk } from '../../../thunks/auth';
import ChatNavBarContainer from './styled';
import { MainRoutes } from '../../../constants/routes/main-routes';

interface ChatNavBarProps {
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  title, showBackButton = false, backTo = MainRoutes.ChatOverviewRoute_1,
}) => {
  const email = useSelector(selectUserEmail);
  const [isPopOverVisible, setIsPopOverVisible] = useState<boolean>(false);
  const letterForAvatar = useMemo(() => email[0], [email]);
  const dispatch = useDispatch();

  const onPopOverVisibilityChange = useCallback((value: boolean) => {
    setIsPopOverVisible(value);
  }, [setIsPopOverVisible]);

  const onLogOutHandle = useCallback(() => {
    dispatch(logOutThunk());
  }, [dispatch]);

  return (
    <ChatNavBarContainer>
      {showBackButton && (
        <Link to={backTo}>
          <ArrowLeftOutlined style={{ fontSize: '20px' }} />
        </Link>
      )}
      <h1>
        {title || `Chat page of ${email}`}
      </h1>
      <Popover
        content={(
          <>
            <h2>{email}</h2>
            <Button type="dashed" onClick={onLogOutHandle}>
              Log out
            </Button>
          </>
        )}
        trigger="click"
        visible={isPopOverVisible}
        onVisibleChange={onPopOverVisibilityChange}
        placement="bottomRight"
      >
        <Button
          htmlType="button"
          type="text"
          className="avatar-button"
        >
          <Avatar size="large">
            {letterForAvatar}
          </Avatar>
        </Button>
      </Popover>
    </ChatNavBarContainer>
  );
};

export default ChatNavBar;
