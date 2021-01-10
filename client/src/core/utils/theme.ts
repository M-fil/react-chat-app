import { THEME_LOCAL_STORAGE_NAME, ThemeModesType } from '../constants/themes';

export const getCurrentThemeFromLocalStorage = (): ThemeModesType => {
  if (window && window.localStorage) {
    const mode = window.localStorage.getItem(THEME_LOCAL_STORAGE_NAME) as ThemeModesType | undefined;
    return mode || 'light';
  }

  return 'light';
};

export const setCurrentThemeToLocalStorage = (themeMode: ThemeModesType): void => {
  if (window && window.localStorage) {
    window.localStorage.setItem(THEME_LOCAL_STORAGE_NAME, themeMode);
  }
}
