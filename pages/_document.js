// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; // Prevents Next.js from automatically adding Font Awesome CSS

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add Font Awesome script */}
          <script src="https://kit.fontawesome.com/5d1319edfb.js" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
