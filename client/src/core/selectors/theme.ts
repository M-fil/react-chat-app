import { createSelector } from 'reselect';

import { State } from '../redux/reducers/theme';
import { AppState } from '../redux/reducers';
import { ThemeModesType } from '../constants/themes';

const selectThemesState = (state: AppState): State => state.theme;

export const selectThemeMode = createSelector(
  selectThemesState,
  (state: State): ThemeModesType => state.mode,
);

export const selectIsThemeTogglerChecked = createSelector(
  selectThemeMode,
  (mode: ThemeModesType): boolean => mode === 'light',
);
