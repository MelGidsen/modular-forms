import type {
  FieldArrayPath,
  FieldArrayStore,
  FieldValues,
  FormStore,
  Maybe
} from '../types';

/**
 * Returns the store of a field array.
 *
 * @param form The form of the field array.
 * @param name The name of the field array.
 *
 * @returns The reactive store.
 */
export function getFieldArrayStore<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(
  form: FormStore<TFieldValues>,
  name: TFieldArrayName
): Maybe<FieldArrayStore<TFieldValues, TFieldArrayName>> {
  return form.internal.fieldArrays[name];
}
