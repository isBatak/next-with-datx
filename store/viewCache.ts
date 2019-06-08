import { View, IModelConstructor } from 'datx';
import { IJsonapiView, jsonapi, IJsonapiModel } from 'datx-jsonapi';
import { objToKey } from './utils';

const JsonapiView = jsonapi(View);

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
  debugger;
  console.log(view);

  return view;
}

function getCacheKey(
  model: IModelConstructor<IJsonapiModel>,
  options: object,
): string {
  return `${model.type}@@${objToKey(options)}`;
}
