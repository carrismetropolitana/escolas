// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; // Prevents Next.js from automatically adding Font Awesome CSS

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Font Awesome icons' script */}
          <script src="https://kit.fontawesome.com/5d1319edfb.js" crossOrigin="anonymous" />

          {/* font Inter's link */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
