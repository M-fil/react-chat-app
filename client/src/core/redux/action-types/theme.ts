import { ThemeModesType } from '../../constants/themes';

export enum ThemeActionTypes {
  ChangeTheme = '[Theme] ChangeTheme',
}

export interface ChangeThemeActionType {
  type: typeof ThemeActionTypes.ChangeTheme,
  payload: { theme: ThemeModesType }
} 

export type ThemeAction = ChangeThemeActionType;
