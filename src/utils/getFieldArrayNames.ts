import type {
  FieldArrayPath,
  FieldValues,
  FormStore,
  Maybe
} from '../types';
import { removeInvalidNames } from './removeInvalidNames';

/**
 * Returns a list with the names of all field arrays.
 *
 * @param form The form of the field arrays.
 * @param shouldValid Whether to be valid.
 *
 * @returns All field array names of the form.
 */
export function getFieldArrayNames<
  TFieldValues extends FieldValues
>(
  form: FormStore<TFieldValues>,
  shouldValid: Maybe<boolean> = true
): FieldArrayPath<TFieldValues>[] {
  // Get name of every field array
  const fieldArrayNames = Object.keys(
    form.internal.fieldArrays
  ) as FieldArrayPath<TFieldValues>[];

  // Remove invalid field array names
  if (shouldValid) {
    removeInvalidNames(form, fieldArrayNames);
  }

  // Return field array names
  return fieldArrayNames;
}
