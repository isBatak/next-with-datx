import { Collection, View } from 'datx';
import { jsonapi } from 'datx-jsonapi';
import { IRawCollection } from 'datx/dist/interfaces/IRawCollection';

import { Book } from './models/Book';
import { Author } from './models/Author';
import { IRawView } from 'datx/dist/interfaces/IRawView';
import { JsonapiView } from './viewCache';

export interface IRawCache {
  cache: Array<[string, IRawView]>;
}

export class Store extends jsonapi(Collection) {
  public static types = [Book, Author];

  public cache: Map<string, View>;
  public ssr: boolean;

  constructor(data?: IRawCollection & IRawCache, ssr?: boolean) {
    super(data);

    const cache = data
      ? data.cache.map(([key, rawView]: [string, IRawView]) => {
          const view = new JsonapiView(
            rawView.modelType,
            this,
            undefined,
            rawView.models,
            rawView.unique,
          );
          return [key, view];
        })
      : [];
    // @ts-ignore
    this.cache = new Map(cache);

    this.ssr = ssr || false;
  }

  public toJSON() {
    const snapshot = super.toJSON();

    return {
      ...snapshot,
      cache: Array.from(this.cache).map((cacheTuple) => [
        cacheTuple[0],
        cacheTuple[1].toJSON(),
      ]),
    };
  }
}
