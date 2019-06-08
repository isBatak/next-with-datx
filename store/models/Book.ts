import { Model, prop } from 'datx';

import { Author } from './Author';
import { jsonapi } from 'datx-jsonapi';

export class Book extends jsonapi(Model) {
  public static type = 'books';

  @prop.identifier
  public id!: string;

  @prop
  public title!: string;

  @prop
  public datePublished!: string;

  @prop
  public isbn!: number;

  @prop.toOne(Author)
  public author!: Author;
}
