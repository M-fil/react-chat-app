import styled from 'styled-components';
import { globalDefaultColors } from '../../colors';
import { FontStyleMixin, FontStyleMixinProps } from '../../mixins';

const defaultStyles = {
  color: '#ffffff',
};

export const DefaultButton = styled('button').attrs(() => ({
  fontSize: '1.5rem',
  lineHeight: '2rem',
}))<FontStyleMixinProps>`
  cursor: pointer;
  background: ${globalDefaultColors.buttonActiveBackground};
  color: ${defaultStyles.color};

  border-radius: 30px;
  border: 0;
  padding: 10px 20px;
  ${FontStyleMixin}
`;
