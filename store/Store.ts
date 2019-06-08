import { Collection } from 'datx';
import { jsonapi } from 'datx-jsonapi';
import { IRawCollection } from 'datx/dist/interfaces/IRawCollection';

import { Book } from './models/Book';
import { Author } from './models/Author';

export interface IRawCache {
  cache: string;
}

export class Store extends jsonapi(Collection) {
  public static types = [Book, Author];

  public cache: Map<string, any>;

  constructor(data?: IRawCollection & IRawCache) {
    super(data);

    const cache = data ? JSON.parse(data.cache) : undefined;
    this.cache = new Map(cache);
  }

  public toJSON() {
    const snapshot = super.toJSON();

    return {
      ...snapshot,
      cache: JSON.stringify([...this.cache]),
    };
  }
}
