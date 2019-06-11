import { Store, IRawCache } from './Store';
import { IRawCollection } from 'datx/dist/interfaces/IRawCollection';

const __NEXT_MOBX_STORE__ = 'store';

export function initStore(
  snapshot?: IRawCollection & IRawCache,
  ssr?: boolean,
) {
  if (ssr) {
    return new Store(snapshot, ssr);
  }

  if (!(window as any)[__NEXT_MOBX_STORE__]) {
    (window as any)[__NEXT_MOBX_STORE__] = new Store(snapshot, ssr);
  }

  return (window as any)[__NEXT_MOBX_STORE__];
}
