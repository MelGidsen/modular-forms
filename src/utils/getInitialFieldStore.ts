import type {
  FieldPath,
  FieldPathValue,
  FieldStore,
  FieldValue,
  FieldValues,
  Maybe,
} from '../types';
import { isFieldDirty } from './isFieldDirty';

/**
 * Value type of the initial field state.
 */
type InitialFieldState<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> = {
  value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
  initialValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
  error: string;
};

/**
 * Returns the initial store of a field.
 *
 * @param initialState The initial state.
 *
 * @returns The initial store.
 */
export function getInitialFieldStore<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>(
  name: TFieldName,
  {
    value,
    initialValue,
    error,
  }: InitialFieldState<TFieldValues, TFieldName> = {
    value: undefined,
    initialValue: undefined,
    error: '',
  }
): FieldStore<TFieldValues, TFieldName> {
  const dirty = isFieldDirty(
    initialValue as Maybe<FieldValue>,
    value as Maybe<FieldValue>
  );
  return {
    internal: {
      initialValue,
      startValue: initialValue,
      validate: [],
      validateOn: undefined,
      revalidateOn: undefined,
      transform: [],
      elements: [],
      consumers: [],
    },
    name,
    value,
    error,
    active: false,
    touched: dirty,
    dirty,
  };
}
