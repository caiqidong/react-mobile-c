import * as stylex from '@stylexjs/stylex';

import { colors } from './tokens.stylex';

export const darkThemeValues = {
  primary: '#4096ff',
  primaryLight: '#111d2c',
  primaryDark: '#15325b',
  success: '#49aa19',
  warning: '#d89614',
  danger: '#e84849',
  info: '#4096ff',
  textPrimary: '#ffffff',
  textSecondary: '#aaaaaa',
  textTertiary: '#777777',
  textDisabled: '#555555',
  bgBase: '#1a1a1a',
  bgWhite: '#2b2b2b',
  bgMask: 'rgba(0, 0, 0, 0.7)',
  borderBase: '#444444',
  borderLight: '#333333',
  white: '#ffffff',
};

export const brandThemeValues = {
  primary: '#007a5a',
  primaryLight: '#e5f6f1',
  primaryDark: '#005c44',
};

export const darkTheme = stylex.createTheme(colors, darkThemeValues);
export const brandTheme = stylex.createTheme(colors, brandThemeValues);
