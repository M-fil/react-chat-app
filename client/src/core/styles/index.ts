import { createGlobalStyle } from 'styled-components';
import { FontStyleMixin } from './mixins';

const GlobalStyle = createGlobalStyle`
  html {
    ${FontStyleMixin};
  }

  body {
    margin: 0;
    padding: 0;
    ${FontStyleMixin};
  }
  
  #root {
    min-height: 100vh;
  }
`;

export default GlobalStyle;
