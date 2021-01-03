import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  
  #root {
    min-height: 100vh;
  }
`;

export default GlobalStyle;
