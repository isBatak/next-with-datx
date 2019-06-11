import { IModelConstructor } from 'datx';
import { IJsonapiModel, IRequestOptions } from 'datx-jsonapi';
import { useMemo, useContext } from 'react';

import { useDatxCollection } from './DatxContext';
import { SSRContext } from './SSRContext';
import { getCachedView } from './viewCache';

export interface IFetchAllHookState<TModel> {
  data?: Array<TModel>;
  error?: any;
  loading?: boolean;
}

export interface IFetchAllHookOptions extends IRequestOptions {
  ssr?: boolean;
  skip?: boolean;
  suspend?: boolean;
}

export const useFetchAll = <TModel extends IJsonapiModel>(
  model: IModelConstructor<TModel>,
  { ssr, skip, suspend, ...options }: IFetchAllHookOptions = {},
): IFetchAllHookState<TModel> => {
  const collection = useDatxCollection();
  const ssrManager = useContext(SSRContext);
  // const ssrInUse = ssr && ssrManager;

  // Skips when `skip: true` or SSRContext passed but `ssr: false`
  // const shouldSkip = skip || (ssrManager != null && !ssr);

  const view = useMemo(
    () => getCachedView<TModel>(model, collection, options),
    [],
  );

  // const [state, setState] = useState<IFetchAllHookState<TModel>>({
  //   view: new JsonapiView(model, collection) as View<TModel> & IJsonapiView,
  // });

  // if (!state.view) {
  //   const view = new JsonapiView(model, collection) as View<TModel> &
  //     IJsonapiView;
  //   setState((oldState) => ({ ...oldState, view }));
  // }

  // useEffect(() => {
  //   if (state.view && !state.startedAt) {
  //     setState((oldState) => ({ ...oldState, startedAt: new Date() }));
  //     state.view.fetchAll(options).then((response) => {
  //       setState((oldState) => ({
  //         ...oldState,
  //         error: response.error,
  //         finishedAt: new Date(),
  //       }));
  //     });
  //   }
  // }, [state, options]);

  const currentResult: IFetchAllHookState<TModel> = useMemo(() => {
    // if (shouldSkip) {
    //   return {
    //     data: undefined,
    //     error: undefined,
    //     loading: false,
    //   };
    // }

    return {
      data: view.list as any,
      error: undefined,
      loading: false,
    };
  }, []);

  // if (suspend) {
  //   // throw a promise - use the react suspense to wait until the data is available
  //   throw view.fetchAll(options);
  // }

  // if (!collection.ssr) {
  //   throw view.fetchAll(options);
  // }

  if (ssrManager) {
    ssrManager!.register(view.fetchAll(options));
  }

  return currentResult;
};
