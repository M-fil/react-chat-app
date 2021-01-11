import styled, { css } from 'styled-components';
import { globalDefaultColors } from '../../colors';
import { FontStyleMixin, FontStyleMixinProps } from '../../mixins';

const defaultStyles = {
  color: '#ffffff',
};

const DefaultButtonStyled = css`
  cursor: pointer;
  background: ${globalDefaultColors.buttonActiveBackground};
  color: ${defaultStyles.color};
  border: 0;
`;

export const DefaultButton = styled('button').attrs(() => ({
  fontSize: '1.5rem',
  lineHeight: '2rem',
}))<FontStyleMixinProps>`
  ${DefaultButtonStyled};

  border-radius: 30px;
  padding: 10px 20px;
  ${FontStyleMixin}
`;

interface InputButtonProps extends FontStyleMixinProps {
  height: string,
}

export const InputButton = styled('button').attrs(() => ({
  fontSize: '1.5rem',
  lineHeight: '2rem',
}))<InputButtonProps>`
  ${DefaultButtonStyled};

  height: ${(props) => props.height || '20px'};
  border-radius: 2px;
  ${FontStyleMixin}
`;
