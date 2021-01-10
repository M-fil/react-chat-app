import { css } from 'styled-components';

export interface FontStyleMixinProps {
  fontFamily?: string,
  fontSize?: string,
  fontWeight?: string,
  lineHeight?: string,
}

export const defaultFontStyles: FontStyleMixinProps = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '10px',
}

export const FontStyleMixin = css<FontStyleMixinProps>`
  ${(props) => props.fontFamily ? `font-family: ${props.fontFamily}` : ''};
  font-size: ${(props) => props.fontSize || defaultFontStyles.fontSize};
  font-weight: ${(props) => props.fontWeight || defaultFontStyles.fontWeight};
  line-height: ${(props) => props.lineHeight || defaultFontStyles.lineHeight};
`;