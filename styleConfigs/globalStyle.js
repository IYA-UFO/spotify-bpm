import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  html {
    height: 100%;
  }

  body {
  height: 100%;
  background-color: #ffffff;
  font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, Helvetica,
    Sans-Serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.8;
   color: #333333;
  font-feature-settings: 'palt';
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: unset;
  text-size-adjust: 100%;
  }

  p {
    margin-bottom: 0;
    font-size:1.6rem;
    line-height:1.87;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 640px) {
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,img, ul, li, header, footer, nav, section, article, a,p, blockquote, span,header,footer,nav,section,article,input,textarea, figure , figcaption, main, pre {
    box-sizing: border-box;
    word-wrap: break-word;
    margin: 0;
  }

  #__next {
    height: 100%;
  }
`;
