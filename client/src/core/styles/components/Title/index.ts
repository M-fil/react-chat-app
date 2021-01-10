import styled from 'styled-components';
import { FontStyleMixin, FontStyleMixinProps } from '../../mixins';

type TitleTagNameType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps extends FontStyleMixinProps {
  color: string,
}

export const createTitle = (headerTagName: TitleTagNameType = 'h1') => styled(headerTagName)
  .attrs(() => ({ color: '#000000' }))<TitleProps>`
    ${FontStyleMixin};
    color: ${(props) => props.color};

    margin: 0;
    padding: 0;
  `;
