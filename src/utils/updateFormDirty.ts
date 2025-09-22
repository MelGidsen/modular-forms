import type { FieldValues, FormStore, Maybe } from '../types';
import { getFieldAndArrayStores } from './getFieldAndArrayStores';

/**
 * Updates the dirty state of the form.
 *
 * @param form The store of the form.
 * @param dirty Whether dirty state is true.
 */
export function updateFormDirty<
  TFieldValues extends FieldValues
>(form: FormStore<TFieldValues>, dirty?: Maybe<boolean>): void {
  form.dirty =
    dirty ||
    getFieldAndArrayStores(form).some(
      (fieldOrFieldArray) => fieldOrFieldArray.active && fieldOrFieldArray.dirty
    );
}
