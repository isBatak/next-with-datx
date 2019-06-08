import { Model, prop } from 'datx';
import { jsonapi } from 'datx-jsonapi';

export class Author extends jsonapi(Model) {
  public static type = 'authors';

  @prop.identifier
  public id!: string;

  @prop
  public name!: string;

  @prop
  public birthplace!: string;

  @prop
  public dateOfBirth?: string;

  @prop
  public dateOfDeath?: string;
}
