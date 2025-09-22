import type {
  FieldPath,
  FieldValues,
  FormStore,
  RawFieldState
} from '../types';
import { initializeFieldStore } from './initializeFieldStore';

/**
 * Sets the store of a field to the specified state.
 *
 * @param form The form of the field.
 * @param name The name of the field.
 * @param state The new state to be set.
 */
export function setFieldState<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>(
  form: FormStore<TFieldValues>,
  name: TFieldName,
  state: RawFieldState<TFieldValues, TFieldName>
): void {
  const field = initializeFieldStore(form, name);
  field.internal.startValue = state.startValue;
  field.value = state.value;
  field.error = state.error;
  field.touched = state.touched;
  field.dirty = state.dirty;
}
