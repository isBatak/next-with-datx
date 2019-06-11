import { createContext, ReactNode, ReactElement, useContext } from 'react';
import { Store } from './Store';

const DatxContext = createContext<null | Store>(null);

export interface DatxProviderProps {
  readonly children?: ReactNode;
  readonly collection: Store;
}

export function DatxProvider({
  collection,
  children,
}: DatxProviderProps): ReactElement<DatxProviderProps> {
  return (
    <DatxContext.Provider value={collection}>{children}</DatxContext.Provider>
  );
}

export function useDatxCollection(overrideCollection?: Store): Store {
  const collection = useContext(DatxContext);

  // Ensures that the number of hooks called from one render to another remains
  // constant, despite the Datx collection read from context being swapped for
  // one passed directly as prop.
  if (overrideCollection) {
    return overrideCollection;
  }

  if (!collection) {
    throw new Error(
      'Could not find "collection" in the context or passed in as a prop. ' +
        'Wrap the root component in an <DatxProvider>, or pass an ' +
        'Collection instance in via props.',
    );
  }
  return collection;
}
