import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';
import map from 'lodash/map';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import snakeCase from 'lodash/snakeCase';
import { IResponse } from 'datx-jsonapi/dist/interfaces/JsonApi';

export function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return value != null && typeof (value as PromiseLike<T>).then === 'function';
}

export function iterator(
  obj: IResponse | object | undefined,
  transformer: any,
): any {
  if (isArray(obj)) {
    return map(obj, (value) => iterator(value, transformer));
  } else if (isObject(obj)) {
    const copy: any = mapValues(obj, (value) => iterator(value, transformer));

    return mapKeys(copy, (_, key) => transformer(key));
  }

  return obj;
}

export function apify(obj: object | undefined) {
  return iterator(obj, snakeCase);
}

export function deapify(obj: IResponse | undefined) {
  return iterator(obj, camelCase);
}

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function objToKey<T extends Record<string, any>>(obj: T): T | string {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const sortedObj = Object.keys(obj)
    .sort()
    .reduce((result: Record<string, any>, key) => {
      result[key] = objToKey(obj[key]);
      return result;
    }, {});
  return JSON.stringify(sortedObj);
}
