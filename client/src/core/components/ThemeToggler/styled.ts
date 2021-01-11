import styled from 'styled-components';
import { Switch } from 'antd';
import theme from 'styled-theming';
import { themeStyles } from '../../constants/themes';

const switchItemsColor = theme('mode', {
  light: themeStyles.dark.header.backgroundColor,
  dark: themeStyles.light.header.backgroundColor,
});
const switchBackgroundColor = 'transparent';

const ThemeToggler = styled(Switch)`
  border: 1px solid ${switchItemsColor};
  background-color: ${switchBackgroundColor};

  .ant-switch-handle {
    top: 1px;

    &::before {
      background-color: ${switchItemsColor};
    }
  }

  .theme-switcher-icon {
    width: 11px;
    height: 11px;
  }
`;

export default ThemeToggler;
