import { useStore } from '@builder.io/qwik';
import type {
  FieldValues,
  FormOptions,
  FormStore
} from '../types';
import { getInitialStores } from '../utils';

/**
 * Creates and returns the store of the form.
 *
 * TODO: Add initialValues option beside loader
 *
 * @param options The form options.
 *
 * @returns The reactive store.
 */
export function useFormStore<
  TFieldValues extends FieldValues
>({
  validate,
  validateOn = 'submit',
  revalidateOn = 'input',
  ...options
}: FormOptions<TFieldValues>): FormStore<
  TFieldValues
> {
  return useStore(() => {
    const [fields, fieldArrays] = getInitialStores(options);
    return {
      internal: {
        fields,
        fieldArrays,
        fieldArrayPaths: options.fieldArrays,
        validate,
        validators: [],
        validateOn,
        revalidateOn,
      },
      element: undefined,
      submitCount: 0,
      submitting: false,
      submitted: false,
      validating: false,
      touched: false,
      dirty: false,
      invalid: false
    };
  });
}
