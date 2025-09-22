import type { FieldValues, FormStore } from '../types';

/**
 * Validates and submits the form.
 *
 * @param form The form to be submitted.
 */
export function submit<
  TFieldValues extends FieldValues
>(form: FormStore<TFieldValues>): void {
  form.element?.requestSubmit();
}
