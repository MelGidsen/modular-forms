import type {
  FieldArrayPath,
  FieldPath,
  FieldValues,
  FormStore,
  Maybe
} from '../types';
import { type SetErrorOptions, setError } from './setError';

/**
 * Clears the error of the specified field or field array.
 *
 * @param form The form of the field.
 * @param name The name of the field.
 * @param options The error options.
 */
export function clearError<
  TFieldValues extends FieldValues
>(
  form: FormStore<TFieldValues>,
  name: FieldPath<TFieldValues> | FieldArrayPath<TFieldValues>,
  options?: Maybe<SetErrorOptions>
): void {
  setError(form, name, '', options);
}
