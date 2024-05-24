import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
      --color-text: black;
      --color-dark: #072539;
      --color-lightblue: #F0F3FF;
      --color-lightgrey: #f9f9f9;
      --color-grey: #7a7a7a;
      --color-navy: #1D1A55;
      --color-blue: #387ADF;
      --color-orange: #FF7A00;
      --color-yellow: #ffb700;

      --shadow: 0 2px 2px rgba(118, 118, 118, 0.208);
      --shadow-inner : rgba(174, 174, 174, 0.141) 0px -1px 15px 0px inset;
      --shadow-outer : rgba(89, 89, 89, 0.178) 0px 50px 100px -20px inset, rgba(95, 95, 95, 0.151) 0px 30px 60px -30px, rgba(86, 86, 86, 0.178) 0px -2px 6px 0px inset;

    }

    body {
      
      @font-face {
        font-family: "Giants-Inline";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2")
          format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
          font-family: "SEBANG_Gothic_Bold";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Bold.woff")
            format("woff");
          font-weight: normal;
          font-style: normal;
      }
      @font-face {
          font-family: 'SEBANG_Gothic_Regular';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Regular.woff') format('woff');
      }
      @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Pretendard-Thin';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff') format('woff');
        font-weight: 100;
        font-style: normal;
      }
      @font-face {
          font-family: 'Giants-Regular';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Regular.woff2') format('woff2');
          /* font-weight: 700; */
          font-style: normal;
      }

      margin: 0;
      font-family: 'Pretendard-Regular';

      // 스크롤 바 색상
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: var(--color-navy);
      }
      // 스크롤 바 배경 색상
      &::-webkit-scrollbar-track {
        background: var(--color-lightgrey);

      }
      // 스크롤 바 너비
      &::-webkit-scrollbar {
        width: 8px;
      }
    }
    div {
      margin: 0;
    }
    p {
      margin: 0;
    }
    .react-joyride__spotlight {
    background-color: rgba(255, 255, 255, 0.5) !important; /* 황색 반투명 */
  }
`

export default GlobalStyle
