import { config, IRawResponse, ICollectionFetchOpts } from 'datx-jsonapi';
import fetch from 'isomorphic-fetch';
import { deapify, apify } from './utils';

config.baseUrl = 'https://jsonapiplayground.reyesoft.com/v2/';

config.fetchReference = (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  console.log(input);
  return fetch(input, init);
};

config.transformResponse = (opts: IRawResponse) => {
  return { ...opts, data: deapify(opts.data) };
};

config.transformRequest = (opts: ICollectionFetchOpts) => {
  return { ...opts, data: apify(opts.data) };
};
