import { observer } from 'mobx-react';

import { useFetchAll } from '../store/useFetchAll';
import { Book } from '../store/models/Book';

export const Books = observer(function() {
  const { data } = useFetchAll<Book>(Book, { suspend: true });

  return (
    <div>
      {data && data.map((book: Book) => <div key={book.id}>{book.title}</div>)}
    </div>
  );
});
