import React from 'react';

import LightModeIcon from '../../../core/assets/images/theme/light.svg';
import DarkModeIcon from '../../../core/assets/images/theme/dark.svg';
import ThemeTogglerContainer from './styled';

interface ThemeTogglerProps {
  onChange: (isChecked: boolean) => void,
  isChecked?: boolean
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  onChange, isChecked = true,
}) => {
  return (
    <ThemeTogglerContainer
      className="theme-switcher"
      checkedChildren={(
        <img className="theme-switcher-icon" src={LightModeIcon} alt="light" />
      )}
      unCheckedChildren={(
        <img className="theme-switcher-icon" src={DarkModeIcon} alt="dark" />
      )}
      defaultChecked
      checked={isChecked}
      onChange={onChange}
    />
  );
};

export default ThemeToggler;
