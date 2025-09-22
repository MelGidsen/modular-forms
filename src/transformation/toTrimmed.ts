import type { QRL } from '@builder.io/qwik';
import type { Maybe, MaybeValue, TransformField } from '../types';
import { toCustom$, type TransformOptions } from './toCustom$';

/**
 * Creates a transformation functions that removes the leading and trailing
 * white space and line terminator characters from a string.
 *
 * @param options The transform options.
 *
 * @returns A transformation functions.
 */
export function toTrimmed<TValue extends MaybeValue<string>>(
  options: TransformOptions
): QRL<TransformField<TValue>> {
  return toCustom$<TValue>(
    (value) => value && (value.trim() as Maybe<TValue>),
    options
  );
}
