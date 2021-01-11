import styled, { css }  from 'styled-components';
import theme from 'styled-theming';
import { themeStyles } from '../../constants/themes';
import { containerPadding } from '../../styles/components/MainContainer';

const headerStyles = theme('mode', {
  light: css`
    background: ${themeStyles.light.header.backgroundColor};
    box-shadow: 0 0 2rem 0 ${themeStyles.light.header.borderColor};
  `,
  dark: css`
    background: ${themeStyles.dark.header.backgroundColor};
    box-shadow: 0 0 2rem 0 ${themeStyles.dark.header.borderColor};
  `,
});

const avatarBorderColor = theme('mode', {
  light: '',
  dark: themeStyles.dark.header.borderColor,
});

const textColor = theme('mode', {
  light: themeStyles.light.header.color,
  dark: themeStyles.dark.header.color,
});

const MainHeaderContainer = styled('div')`
  ${headerStyles};
  border-radius: 0 0 20px 20px;
  ${containerPadding};
  margin-bottom: 20px;
  justify-content: center !important;
  width: 100%;
  
  &, .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar-button {
    padding: 0;
    height: fit-content;

    .ant-avatar {
      border: 2px solid ${avatarBorderColor};
    }
  }

  .main-title {
    max-width: 40%;
    color: ${textColor};
  }
`;

export default MainHeaderContainer;
