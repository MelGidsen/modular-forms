import type {
  CSSProperties,
  ClassList,
  JSXOutput,
  Signal,
} from '@builder.io/qwik';
import { FormError } from '../exceptions';
import { getValues, validate } from '../methods';
import type {
  FieldValues,
  FormStore,
  Maybe,
  MaybePromise
} from '../types';
import { setFieldErrors } from '../utils';

/**
 * Function type to handle the submission of the form.
 */
export type SubmitHandler<TFieldValues extends FieldValues> = (
  values: TFieldValues,
  event: SubmitEvent
) => MaybePromise<any>;

/**
 * Value type of the form properties.
 */
export type FormProps<
  TFieldValues extends FieldValues
> = {
  // Custom props
  of: FormStore<TFieldValues>;
  onSubmit$?: Maybe<SubmitHandler<TFieldValues>>;
  shouldActive?: Maybe<boolean>;
  shouldTouched?: Maybe<boolean>;
  shouldDirty?: Maybe<boolean>;
  shouldFocus?: Maybe<boolean>;
  reloadDocument?: Maybe<boolean>;

  // HTML props
  id?: Maybe<string>;
  class?: Maybe<ClassList | Signal<ClassList>>;
  style?: Maybe<string | CSSProperties>;
  autoComplete?: Maybe<'on' | 'off'>;
  encType?: Maybe<'application/x-www-form-urlencoded' | 'multipart/form-data'>;
  name?: Maybe<string>;
  children: any;
};

/**
 * Form element that takes care of validation and simplifies submission.
 */
export function Form<
  TFieldValues extends FieldValues
>({
  of: form,
  onSubmit$,
  shouldActive,
  shouldTouched,
  shouldDirty,
  shouldFocus,
  reloadDocument,
  children,
  ...formProps
}: FormProps<TFieldValues>): JSXOutput {
  // Destructure form props
  const { encType } = formProps;

  // Create options object
  const options = {
    shouldActive,
    shouldTouched,
    shouldDirty,
    shouldFocus,
  };

  return (
    <form
      noValidate
      {...formProps}
      method="post"
      preventdefault:submit={!reloadDocument}
      ref={(element: Element) => {
        form.element = element as HTMLFormElement;
      }}
      onSubmit$={async (event: SubmitEvent, element) => {

        // Increase submit count and set submitted and submitting to "true"
        form.submitCount++;
        form.submitted = true;
        form.submitting = true;

        // Try to run submit actions if form is valid
        try {
          if (await validate(form, options)) {
            // Get current values of form
            const values = getValues(form, options);
            // eslint-disable-next-line qwik/valid-lexical-scope
            await onSubmit$?.(values as TFieldValues, event);
          }
          // If an error occurred, set error to fields and response
        } catch (error: any) {
          if (error instanceof FormError) {
            setFieldErrors(form, error.errors, {
              ...options,
              shouldFocus: false,
            });
          }
          // Finally set submitting back to "false"
        } finally {
          form.submitting = false;
        }
      }}
    >
      {children}
    </form>
  );
}
