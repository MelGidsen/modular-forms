import type {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  FormStore,
  Maybe,
  ResponseData,
} from '../types';
import { getFieldStore, getFieldArrayStore } from '../utils';

/**
 * Value tye of the get error options.
 */
export type GetErrorOptions = Partial<{
  shouldActive: boolean;
  shouldTouched: boolean;
  shouldDirty: boolean;
}>;

/**
 * Returns the error of the specified field or field array.
 *
 * @param form The form of the field or field array.
 * @param name The name of the field or field array.
 *
 * @returns The error of the field or field array.
 */
export function getError<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData
>(
  form: FormStore<TFieldValues, TResponseData>,
  name: FieldPath<TFieldValues> | FieldArrayPath<TFieldValues>,
  {
    shouldActive = true,
    shouldTouched = false,
    shouldDirty = false,
  }: Maybe<GetErrorOptions> = {}
): string | undefined {
  // Return error if field or field array corresponds to filter options
  for (const fieldOrFieldArray of [
    getFieldStore(form, name as FieldPath<TFieldValues>),
    getFieldArrayStore(form, name as FieldArrayPath<TFieldValues>),
  ]) {
    if (
      fieldOrFieldArray &&
      (!shouldActive || fieldOrFieldArray.active) &&
      (!shouldTouched || fieldOrFieldArray.touched) &&
      (!shouldDirty || fieldOrFieldArray.dirty)
    ) {
      return fieldOrFieldArray.error;
    }
  }

  // Otherwise return undefined
  return undefined;
}
