import { DefaultTheme } from 'styled-components';

export type ThemeModesType = 'dark' | 'light';
export const THEME_LOCAL_STORAGE_NAME = 'THEME';

export interface ThemeTypeProp {
  header: {
    backgroundColor: string,
    color: string,
    borderColor: string,
  },
  mainBlock: {
    backgroundColor: string,
    color: string,
  },
  footer: {
    backgroundColor: string,
    color: string,
  }
}

interface Theme {
  dark: ThemeTypeProp,
  light: ThemeTypeProp,
}

export const themeStyles: Theme = {
  dark: {
    header: {
      backgroundColor: '#161B22',
      color: 'rgb(201, 209, 217)',
      borderColor: '#E3E7EC',
    },
    mainBlock: {
      backgroundColor: '#06090F',
      color: 'rgb(201, 209, 217)',
    },
    footer: {
      backgroundColor: '#F6F6F6',
      color: 'rgb(201, 209, 217)'
    },
  },
  light: {
    header: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#E3E7EC',
    },
    mainBlock: {
      backgroundColor: '#F6F6F6',
      color: '#000000',
    },
    footer: {
      backgroundColor: '#F6F6F6',
      color: '#000000'
    },
  },
}

export const theme: DefaultTheme = {
  mode: 'light',
};
