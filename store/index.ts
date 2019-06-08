import { Store, IRawCache } from './Store';
import { IRawCollection } from 'datx/dist/interfaces/IRawCollection';

const isServer = !process.browser;

const __NEXT_MOBX_STORE__ = 'store';

export function initStore(snapshot?: IRawCollection & IRawCache) {
  if (isServer) {
    return new Store(snapshot);
  }

  if (!(window as any)[__NEXT_MOBX_STORE__]) {
    (window as any)[__NEXT_MOBX_STORE__] = new Store(snapshot);
  }

  return (window as any)[__NEXT_MOBX_STORE__];
}
