import styled from 'styled-components';

const ConversationControllerContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .add-user-block {
    display: flex;
  }

  .ant-select-selector {
    height: 30px !important;
  }
`;

export default ConversationControllerContainer;
