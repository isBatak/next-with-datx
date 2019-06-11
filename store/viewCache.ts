import { View, IModelConstructor, IViewConstructor } from 'datx';
import { IJsonapiView, jsonapi, IJsonapiModel } from 'datx-jsonapi';
import { objToKey } from './utils';

export const JsonapiView = jsonapi(View as IViewConstructor<any, any>);

export function getCachedView<TModel>(
  model: IModelConstructor<IJsonapiModel>,
  collection: any,
  options: any,
): View<TModel> & IJsonapiView {
  const cacheKey: string = getCacheKey(model, options);
  let view = collection.cache.get(cacheKey);

  if (!view) {
    view = new JsonapiView(model, collection) as View<TModel> & IJsonapiView;
    collection.cache.set(cacheKey, view);
  }

  return view;
}

function getCacheKey(
  model: IModelConstructor<IJsonapiModel>,
  options: object,
): string {
  return `${model.type}@@${objToKey(options)}`;
}
