import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const isProduction = process.env.NODE_ENV === 'production';

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
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

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link
            rel="preload"
            href="font/righteous.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link rel="preload" href="img/metronome.png" as="image" />
          <meta
            name="description"
            content="Sort spotify&lsquo;s songs by BPM"
          />

          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://storage.googleapis.com" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="spotify-bpm" />
          <meta name="apple-mobile-web-app-title" content="spotify-bpm" />
          <meta name="theme-color" content="#10abff" />
          <meta name="msapplication-navbutton-color" content="#10abff" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <link
            rel="icon"
            type="image/png"
            sizes="512×512"
            href="/img/icon-512_512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512×512"
            href="/img/icon-512_512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192×192"
            href="/img/icon-192_192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192×192"
            href="/img/icon-192_192.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>You need JavaScript to use this</noscript>
        </body>
      </Html>
    );
  }
}
