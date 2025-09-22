import type {
  FieldPath,
  FieldStore,
  FieldValues,
  FormStore
} from '../types';
import { getFieldStore } from './getFieldStore';
import { getInitialFieldStore } from './getInitialFieldStore';

/**
 * Initializes and returns the store of a field.
 *
 * @param form The form of the field.
 * @param name The name of the field.
 * @param initialState The initial state.
 *
 * @returns The reactive store.
 */
export function initializeFieldStore<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>(
  form: FormStore<TFieldValues>,
  name: TFieldName
): FieldStore<TFieldValues, TFieldName> {
  if (!getFieldStore(form, name)) {
    form.internal.fields[name] = getInitialFieldStore(name);
  }
  return getFieldStore(form, name) as FieldStore<TFieldValues, TFieldName>;
}
