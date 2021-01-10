import styled from 'styled-components';
import { containerPadding } from '../../styles/components/MainContainer';

const FooterContainer = styled('footer')`
  justify-content: space-between;

  ${containerPadding};

  &, .links-container {
    display: flex;
    align-items: center;
  }

  .footer-link {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export default FooterContainer;
