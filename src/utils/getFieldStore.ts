import type {
  FieldPath,
  FieldStore,
  FieldValues,
  FormStore,
  Maybe,
  ResponseData,
} from '../types';

/**
 * Returns the store of a field.
 *
 * @param form The form of the field.
 * @param name The name of the field.
 *
 * @returns The reactive store.
 */
export function getFieldStore<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldName extends FieldPath<TFieldValues>
>(
  form: FormStore<TFieldValues, TResponseData>,
  name: TFieldName
): Maybe<FieldStore<TFieldValues, TFieldName>> {
  return form.internal.fields[name];
}
