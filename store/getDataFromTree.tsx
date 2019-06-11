import { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

// import { isPromiseLike } from './utils';
import { createSSRManager, SSRContext } from './SSRContext';

export function getDataFromTree(node: ReactNode): Promise<any> {
  const ssrManager = createSSRManager();

  // function process(): string | Promise<string> {
  try {
    // const html = renderToString(
    renderToString(
      <SSRContext.Provider value={ssrManager}>{node}</SSRContext.Provider>,
    );

    // if (!ssrManager.hasPromises()) {
    //   return html;
    // }
  } catch (error) {
    // if (!isPromiseLike(error)) {
    throw error;
    // }

    // ssrManager.register(error);
  }

  return ssrManager.consumeAndAwaitPromises();
  // }

  // return Promise.resolve().then(process);
}
