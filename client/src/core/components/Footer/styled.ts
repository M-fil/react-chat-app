import styled from 'styled-components';
import { containerPadding } from '../../styles/components/MainContainer';

const FooterContainer = styled('footer')`
  ${containerPadding};
  display: flex;
  justify-content: center;
  width: 100%;

  .footer-wrapper, .links-container {
    display: flex;
    align-items: center;
  }

  .footer-wrapper {
    justify-content: space-between;
  }

  .footer-link {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export default FooterContainer;
