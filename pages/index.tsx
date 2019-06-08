import { observer } from 'mobx-react';

import { Books } from '../components/Books';
import { Spinner } from '../components/Spinner';
import { SuspenseSSR } from '../store/SuspenseSSR';

export default observer(() => {
  return (
    <SuspenseSSR fallback={<Spinner />}>
      <Books />
    </SuspenseSSR>
  );
});
