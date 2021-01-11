import styled from 'styled-components';

interface WidthLimiterContainerProps {
  applyFlexGrow?: boolean;
}

const WidthLimiterContainer = styled('div').attrs(() => ({
  className: 'width-limiter-container',
}))<WidthLimiterContainerProps>`
  display: flex;
  flex-direction: column;
  ${(props) => props.applyFlexGrow ? 'flex-grow: 1' : ''};
  overflow: hidden;
  
  width: 70%;
`;

export default WidthLimiterContainer;
