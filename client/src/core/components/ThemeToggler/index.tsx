import React from 'react';
import { Switch } from 'antd';

import LightModeIcon from '../../../core/assets/images/theme/light.svg';
import DarkModeIcon from '../../../core/assets/images/theme/dark.svg';

interface ThemeTogglerProps {
  onChange: (isChecked: boolean) => void,
  isChecked?: boolean
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  onChange, isChecked = true,
}) => {
  return (
    <Switch
      checkedChildren={(
        <img src={LightModeIcon} alt="light" />
      )}
      unCheckedChildren={(
        <img src={DarkModeIcon} alt="dark" />
      )}
      defaultChecked
      checked={isChecked}
      onChange={onChange}
    />
  );
};

export default ThemeToggler;
