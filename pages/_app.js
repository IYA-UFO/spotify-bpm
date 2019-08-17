import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '../styleConfigs/globalStyle';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title key="title">新LP実験</title>
          <meta
            httpEquiv="X-UA-Compatible"
            content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    );
  }
}
