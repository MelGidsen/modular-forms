import type {
  FieldPath,
  FieldStore,
  FieldValues,
  FormStore,
  Maybe
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
  TFieldName extends FieldPath<TFieldValues>
>(
  form: FormStore<TFieldValues>,
  name: TFieldName
): Maybe<FieldStore<TFieldValues, TFieldName>> {
  return form.internal.fields[name];
}
