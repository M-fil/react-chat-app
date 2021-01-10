import styled, { css } from 'styled-components';

const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export const containerPadding = css`
  padding: 10px 20px;
`;

export default MainContainer;
