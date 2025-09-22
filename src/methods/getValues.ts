import type {
  FieldArrayPath,
  FieldArrayPathValue,
  FieldPath,
  FieldValues,
  FormStore,
  Maybe,
  PartialValues,
  ResponseData,
} from '../types';
import { getFieldStore, getFilteredNames, getOptions } from '../utils';

/**
 * Value type of the get values options.
 */
export type GetValuesOptions = Partial<{
  shouldActive: boolean;
  shouldTouched: boolean;
  shouldDirty: boolean;
  shouldValid: boolean;
}>;

/**
 * Returns the current values of the form fields.
 *
 * @param form The form of the fields.
 * @param options The values options.
 *
 * @returns The form field values.
 */
export function getValues<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData
>(
  form: FormStore<TFieldValues, TResponseData>,
  options?: Maybe<GetValuesOptions>
): PartialValues<TFieldValues>;

/**
 * Returns the values of the specified field array.
 *
 * @param form The form of the field array.
 * @param name The name of the field array.
 * @param options The values options.
 *
 * @returns The field array values.
 */
export function getValues<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(
  form: FormStore<TFieldValues, TResponseData>,
  name: TFieldArrayName,
  options?: Maybe<GetValuesOptions>
): PartialValues<FieldArrayPathValue<TFieldValues, TFieldArrayName>>;

/**
 * Returns the current values of the specified fields and field arrays.
 *
 * @param form The form of the fields.
 * @param names The names of the fields and field arrays.
 * @param options The values options.
 *
 * @returns The form field values.
 */
export function getValues<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData
>(
  form: FormStore<TFieldValues, TResponseData>,
  names: (FieldPath<TFieldValues> | FieldArrayPath<TFieldValues>)[],
  options?: Maybe<GetValuesOptions>
): PartialValues<TFieldValues>;

export function getValues<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData
>(
  form: FormStore<TFieldValues, TResponseData>,
  arg2?: Maybe<
    | FieldArrayPath<TFieldValues>
    | (FieldPath<TFieldValues> | FieldArrayPath<TFieldValues>)[]
    | GetValuesOptions
  >,
  arg3?: Maybe<GetValuesOptions>
): PartialValues<TFieldValues> {
  // Destructure options and set default values
  const {
    shouldActive = true,
    shouldTouched = false,
    shouldDirty = false,
    shouldValid = false,
  } = getOptions(arg2, arg3);

  // Create and return values of form or field array
  return getFilteredNames(form, arg2)[0].reduce<any>(
    (values, name) => {
      // Get store of specified field
      const field = getFieldStore(form, name)!;

      // Add value if field corresponds to filter options
      if (
        (!shouldActive || field.active) &&
        (!shouldTouched || field.touched) &&
        (!shouldDirty || field.dirty) &&
        (!shouldValid || !field.error)
      ) {
        // Split name into keys to be able to add values of nested fields
        (typeof arg2 === 'string' ? name.replace(`${arg2}.`, '') : name)
          .split('.')
          .reduce<any>(
            (object, key, index, keys) =>
              (object[key] =
                index === keys.length - 1
                  ? // If it is last key, add value
                    field.value
                  : // Otherwise return object or array
                    (typeof object[key] === 'object' && object[key]) ||
                    (isNaN(+keys[index + 1]) ? {} : [])),
            values
          );
      }

      // Return modified values object
      return values;
    },
    typeof arg2 === 'string' ? [] : {}
  );
}
