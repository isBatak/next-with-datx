import { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

import { isPromiseLike } from './utils';
import { createSSRManager, SSRContext } from './SSRContext';

export function getDataFromTree(node: ReactNode): Promise<string> {
  const ssrManager = createSSRManager();

  function process(): string | Promise<string> {
    try {
      const html = renderToString(
        <SSRContext.Provider value={ssrManager}>{node}</SSRContext.Provider>,
      );

      if (!ssrManager.hasPromises()) {
        return html;
      }
    } catch (e) {
      if (!isPromiseLike(e)) {
        throw e;
      }

      ssrManager.register(e);
    }

    return ssrManager.consumeAndAwaitPromises().then(process);
  }

  return Promise.resolve().then(process);
}
