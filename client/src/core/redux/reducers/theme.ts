import { ThemeActionTypes, ThemeAction } from '../action-types/theme';
import { ThemeModesType } from '../../constants/themes';
import { getCurrentThemeFromLocalStorage } from '../../utils/theme';

export interface State {
  mode: ThemeModesType,
}

const initialState: State = {
  mode: getCurrentThemeFromLocalStorage(),
}

export const themeReducer = (state: State = initialState, action: ThemeAction): State => {
  switch (action.type) {
    case ThemeActionTypes.ChangeTheme:
      return {
        ...state,
        mode: action.payload.theme,
      };
    default:
      return state;
  }
}
