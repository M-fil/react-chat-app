import 'styled-components';
import { ThemeModesType } from '../constants/themes';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeModesType,
  }
}