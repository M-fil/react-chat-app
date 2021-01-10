import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { selectUserEmail } from '../../selectors/auth';
import { logOutThunk } from '../../thunks/auth';
import MainHeaderContainer from './styled';
import { MainRoutes } from '../../constants/routes/main-routes';
import { createTitle } from '../../styles/components/Title';
import { UnderlinedText } from '../../styles/components/Text';
import ChatAvatar from '../../styles/components/ChatItemContainer/ChatAvatar';
import { loggedUserAvatarStyles as avatarStyles } from '../../styles/colors';

interface MainHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
}

const MainTitle = createTitle('h1');

const MainHeader: React.FC<MainHeaderProps> = ({
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
    <MainHeaderContainer>
      {showBackButton && (
        <Link to={backTo}>
          <ArrowLeftOutlined style={{ fontSize: '20px' }} />
        </Link>
      )}
      <MainTitle
        className="main-title"
        fontSize="1.8rem"
        lineHeight="2rem"
        fontWeight="700"
      >
        {title || (
          <UnderlinedText>
            React Chat App
          </UnderlinedText>
        )}
      </MainTitle>
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
          <ChatAvatar
            {...avatarStyles}
          >
            {letterForAvatar}
          </ChatAvatar>
        </Button>
      </Popover>
    </MainHeaderContainer>
  );
};

export default MainHeader;
