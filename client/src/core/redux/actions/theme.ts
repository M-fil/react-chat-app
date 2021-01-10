import { ThemeActionTypes, ThemeAction } from '../action-types/theme';
import { ThemeModesType } from '../../constants/themes';

export const changeThemeAction = (themeMode: ThemeModesType): ThemeAction => ({
  type: ThemeActionTypes.ChangeTheme,
  payload: { theme: themeMode },
});
