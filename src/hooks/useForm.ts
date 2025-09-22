import type { JSXOutput } from '@builder.io/qwik';
import type { FieldArrayProps, FieldProps, FormProps } from '../components';
import { Field, FieldArray, Form } from '../components';
import type {
  FieldArrayPath,
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormOptions,
  FormStore,
  MaybeValue,
  PartialKey
} from '../types';
import { useFormStore } from './useFormStore';

/**
 * Creates and returns the store of the form as well as a linked Form, Field
 * and FieldArray component.
 *
 * @param options The form options.
 *
 * @returns The store and linked components.
 */
export function useForm<
  TFieldValues extends FieldValues
>(
  options: FormOptions<TFieldValues>
): [
  FormStore<TFieldValues>,
  {
    Form: (
      props: Omit<FormProps<TFieldValues>, 'of' | 'action'>
    ) => JSXOutput;
    Field: <TFieldName extends FieldPath<TFieldValues>>(
      props: FieldPathValue<TFieldValues, TFieldName> extends MaybeValue<string>
        ? PartialKey<
            Omit<FieldProps<TFieldValues, TFieldName>, 'of'>,
            'type'
          >
        : Omit<FieldProps<TFieldValues, TFieldName>, 'of'>
    ) => JSXOutput;
    FieldArray: <TFieldArrayName extends FieldArrayPath<TFieldValues>>(
      props: Omit<
        FieldArrayProps<TFieldValues, TFieldArrayName>,
        'of'
      >
    ) => JSXOutput;
  }
];

export function useForm(options: FormOptions<FieldValues>): [
  FormStore<FieldValues>,
  {
    Form: (
      props: Omit<FormProps<FieldValues>, 'of' | 'action'>
    ) => JSXOutput;
    Field: (
      props: Omit<FieldProps<FieldValues, string>, 'of'>
    ) => JSXOutput;
    FieldArray: (
      props: Omit<FieldArrayProps<FieldValues, string>, 'of'>
    ) => JSXOutput;
  }
] {
  // Use form store
  const form = useFormStore(options);

  // Return form store and linked components
  return [
    form,
    {
      Form: (props) => Form({ of: form, ...props }),
      Field: (props) => Field({ of: form, ...props }),
      FieldArray: (props) => FieldArray({ of: form, ...props }),
    },
  ];
}
