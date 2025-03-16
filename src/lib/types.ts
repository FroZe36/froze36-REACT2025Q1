import { FormSchema } from './form.validators';

export type ModifiedFormSchemaAge = Omit<FormSchema, 'age'> & {
  age: number | string;
};
export type ModifiedFormSchemaPicture = Omit<
  ModifiedFormSchemaAge,
  'picture'
> & {
  picture: string;
};
