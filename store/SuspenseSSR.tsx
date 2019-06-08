import React, { Suspense, SuspenseProps, FunctionComponent } from 'react';
import { isBrowser } from './utils';

export const SuspenseSSR: FunctionComponent<SuspenseProps> = ({
  children,
  fallback,
}) => {
  return isBrowser ? (
    <Suspense fallback={fallback}>{children}</Suspense>
  ) : (
    <>{children}</>
  );
};
