import { Global } from '@emotion/react';

const Fonts = () => (
	<Global
		styles={`
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('./fonts/proximanova-regular-webfont.woff2') format('woff2'), url('./fonts/proximanova-regular-webfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('./fonts/proximanova-regular-webfont.woff2') format('woff2'), url('./fonts/proximanova-regular-webfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      @font-face {
        font-family: 'Proxima Nova';
        font-weight: normal;
        font-style: italic;
        font-display: swap;
        src: url('./fonts/proximanova-regularit-webfont.woff2') format('woff2'), url('./fonts/proximanova-regularit-webfont.woff') format('woff');
      }
      @font-face {
        font-family: 'Proxima Nova';
        font-weight: bold;
        font-style: normal;
        font-display: swap;
        src: url('./fonts/proximanova-bold-webfont.woff2') format('woff2'), url('./fonts/proximanova-bold-webfont.woff') format('woff');
        }
        
        @font-face {
        font-family: 'Proxima Nova';
        font-weight: bold;
        font-style: italic;
        font-display: swap;
        src: url('./fonts/proximanova-boldit-webfont.woff2') format('woff2'), url('./fonts/proximanova-boldit-webfont.woff') format('woff');
        }

        @font-face {
          font-family: 'Proxima Nova';
          font-weight: light;
          font-style: normal;
          font-display: swap;
          src: url('./fonts/proximanova-light-webfont.woff2') format('woff2'), url('./fonts/proximanova-light-webfont.woff') format('woff');
        }

        @font-face {
          font-family: 'Proxima Nova';
          font-weight: medium;
          font-style: normal;
          font-display: swap;
          src: url('./fonts/proximanova-medium-webfont.woff2') format('woff2'), url('./fonts/proximanova-medium-webfont.woff') format('woff');
        }

        @font-face {
          font-family: 'Proxima Nova';
          font-weight: semibold;
          font-style: normal;
          font-display: swap;
          src: url('./fonts/proximanova-semibold-webfont.woff2') format('woff2'), url('./fonts/proximanova-semibold-webfont.woff') format('woff');
        }

        @font-face {
          font-family: 'Proxima Nova';
          font-weight: thin;
          font-style: normal;
          font-display: swap;
          src: url('./fonts/proximanova-thin-webfont.woff2') format('woff2'), url('./fonts/proximanova-thin-webfont.woff') format('woff');
        }
      `}
	/>
);

export default Fonts;
