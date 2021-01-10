import styled from 'styled-components';
import { Checkbox } from 'antd';
import { FontStyleMixin } from '../../mixins';

export const DefaultCheckbox = styled(Checkbox).attrs(() => ({
  fontSize: '1.5rem',
  lineHeight: '2rem',
}))`
  ${FontStyleMixin}
  margin-left: 0 !important;
`;

