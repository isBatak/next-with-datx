import React from 'react';
import { Container, AppProps, AppContext } from 'next/app';
import { useStaticRendering } from 'mobx-react-lite';
import Head from 'next/head';

import { initStore } from '../store';
import { getDataFromTree } from '../store/getDataFromTree';
import '../store/config';
import { DatxProvider } from '../store/DatxContext';
import { IRawCollection } from 'datx/dist/interfaces/IRawCollection';
import { IRawCache } from '../store/Store';

useStaticRendering(true);

const ssrMode: boolean = !process.browser;

interface IAppProps {
  snapshot: IRawCollection & IRawCache;
}

const MyApp = ({ Component, pageProps, snapshot }: AppProps & IAppProps) => {
  const collection = initStore(snapshot, ssrMode);

  return (
    <Container>
      <DatxProvider collection={collection}>
        <Component {...pageProps} />
      </DatxProvider>
      <style global>{`
        :root {
          --main-color: #d8262c;
        }
      `}</style>
    </Container>
  );
};

MyApp.getInitialProps = async function({ Component, ctx }: AppContext) {
  let pageProps = {};
  const collection = initStore(undefined, ssrMode);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  /**
   * Before that line we call the getInitialProps from App, that one also calls the getInitialProps
   * from the page, and inside that getInitialProps you get access to the request and response,
   * a user may end the request before a render and if that's the case then we don't have to do
   * anything else because the request has already finished.
   */
  if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
    return {};
  }

  if (ssrMode) {
    try {
      // Run all queries
      await getDataFromTree(
        <DatxProvider collection={collection}>
          <Component {...pageProps} />
        </DatxProvider>,
      );
    } catch (error) {
      console.error('Error while running `getDataFromTree`', error);
    }

    // getDataFromTree does not call componentWillUnmount
    // head side effect therefore need to be cleared manually
    Head.rewind();
  }

  return {
    pageProps,
    snapshot: collection.snapshot,
  };
};

export default MyApp;
