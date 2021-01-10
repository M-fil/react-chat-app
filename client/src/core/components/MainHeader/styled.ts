import styled from 'styled-components';
import { containerPadding } from '../../styles/components/MainContainer';
import { globalDefaultColors } from '../../styles/colors';

const MainHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${globalDefaultColors.mainHeaderBackground};
  box-shadow: 0 0 2rem 0 ${globalDefaultColors.borderColor};
  border-radius: 0 0 20px 20px;
  ${containerPadding};
  margin-bottom: 20px;

  .avatar-button {
    padding: 0;
    height: fit-content;
  }

  .main-title {
    max-width: 40%;
  }
`;

export default MainHeaderContainer;
