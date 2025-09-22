import type { FieldValues, FormStore, Maybe } from '../types';
import { getFieldAndArrayStores } from './getFieldAndArrayStores';

/**
 * Updates the invalid state of the form.
 *
 * @param form The store of the form.
 * @param dirty Whether there is an error.
 */
export function updateFormInvalid<
  TFieldValues extends FieldValues
>(
  form: FormStore<TFieldValues>,
  invalid?: Maybe<boolean>
): void {
  form.invalid =
    invalid ||
    getFieldAndArrayStores(form).some(
      (fieldOrFieldArray) => fieldOrFieldArray.active && fieldOrFieldArray.error
    );
}
