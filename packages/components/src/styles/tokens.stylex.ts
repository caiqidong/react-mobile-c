import * as stylex from '@stylexjs/stylex';

export const colorValues = {
  primary: '#1677ff',
  primaryLight: '#e6f4ff',
  primaryDark: '#0958d9',
  success: '#52c41a',
  warning: '#faad14',
  danger: '#ff4d4f',
  info: '#1677ff',
  textPrimary: '#1f1f1f',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#cccccc',
  bgBase: '#f5f5f5',
  bgWhite: '#ffffff',
  bgMask: 'rgba(0, 0, 0, 0.5)',
  borderBase: '#e5e5e5',
  borderLight: '#f0f0f0',
  white: '#ffffff',
};

export const spacingValues = {
  xs: '0.1067rem',
  sm: '0.16rem',
  base: '0.2133rem',
  md: '0.32rem',
  lg: '0.4267rem',
  xl: '0.64rem',
};

export const fontSizeValues = {
  xs: '0.1333rem',
  sm: '0.16rem',
  base: '0.1867rem',
  md: '0.2133rem',
  lg: '0.24rem',
  xl: '0.2933rem',
};

export const lineHeightValues = {
  tight: '1.25',
  base: '1.5',
  relaxed: '1.75',
};

export const radiusValues = {
  xs: '0.0267rem',
  sm: '0.0533rem',
  base: '0.1067rem',
  lg: '0.16rem',
  xl: '0.2133rem',
  round: '9999px',
};

export const shadowValues = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 2px 8px rgba(0, 0, 0, 0.08)',
  md: '0 4px 16px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
};

export const durationValues = {
  fast: '150ms',
  base: '250ms',
  slow: '350ms',
};

export const breakpoints = {
  small: 'only screen and (max-width: 320px)',
  medium: 'only screen and (min-width: 321px) and (max-width: 750px)',
  large: 'only screen and (min-width: 751px)',
} as const;

export const colors = stylex.defineVars(colorValues);
export const spacing = stylex.defineVars(spacingValues);
export const fontSize = stylex.defineVars(fontSizeValues);
export const lineHeight = stylex.defineVars(lineHeightValues);
export const radius = stylex.defineVars(radiusValues);
export const shadow = stylex.defineVars(shadowValues);
export const duration = stylex.defineVars(durationValues);
