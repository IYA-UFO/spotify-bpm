import React from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const isProduction = process.env.NODE_ENV === 'production';

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <html lang="ja">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </html>
        ),
        isProduction,
      };
    } finally {
      sheet.seal();
    }
  }
}
