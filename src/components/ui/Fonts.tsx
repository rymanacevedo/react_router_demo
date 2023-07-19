import { Global } from '@emotion/react';

const Fonts = () => (
	<Global
		styles={`
      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url('./fonts/proximanova-thin-webfont.woff2') format('woff2'), url('./fonts/proximanova-thin-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url('./fonts/proximanova-thinit-webfont.woff2') format('woff2'), url('./fonts/proximanova-thinit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/proximanova-light-webfont.woff2') format('woff2'), url('./fonts/proximanova-light-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/proximanova-lightit-webfont.woff2') format('woff2'), url('./fonts/proximanova-lightit-webfont.woff') format('woff');
      }
     
      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/proximanova-regular-webfont.woff2') format('woff2'), url('./fonts/proximanova-regular-webfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/proximanova-regularit-webfont.woff2') format('woff2'), url('./fonts/proximanova-regularit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/proximanova-medium-webfont.woff2') format('woff2'), url('./fonts/proximanova-medium-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/proximanova-mediumit-webfont.woff2') format('woff2'), url('./fonts/proximanova-mediumit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/proximanova-semibold-webfont.woff2') format('woff2'), url('./fonts/proximanova-semibold-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/proximanova-semiboldit-webfont.woff2') format('woff2'), url('./fonts/proximanova-semiboldit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/proximanova-bold-webfont.woff2') format('woff2'), url('./fonts/proximanova-bold-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/proximanova-boldit-webfont.woff2') format('woff2'), url('./fonts/proximanova-boldit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('./fonts/proximanova-extrabold-webfont.woff2') format('woff2'), url('./fonts/proximanova-extrabold-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 800;
        font-display: swap;
        src: url('./fonts/proximanova-extraboldit-webfont.woff2') format('woff2'), url('./fonts/proximanova-extraboldit-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('./fonts/proximanova-black-webfont.woff2') format('woff2'), url('./fonts/proximanova-black-webfont.woff') format('woff');
      }

      @font-face {
        font-family: 'Proxima-Nova';
        font-style: italic;
        font-weight: 900;
        font-display: swap;
        src: url('./fonts/proximanova-blackit-webfont.woff2') format('woff2'), url('./fonts/proximanova-blackit-webfont.woff') format('woff');
      }
    `}
	/>
);

export default Fonts;
