import { $, implicit$FirstArg, type QRL } from '@builder.io/qwik';
import type { ZodType } from 'zod';
import type { ZodMiniType } from 'zod/mini';
import type { FieldValue, Maybe, MaybeFunction, ValidateField } from '../types';
import { getParsedZodSchema } from '../utils';

/**
 * See {@link zodField$}
 */
export function zodFieldQrl<TFieldValue extends FieldValue>(
  schema: QRL<MaybeFunction<ZodType<TFieldValue> | ZodMiniType<TFieldValue>>>
): QRL<ValidateField<TFieldValue>> {
  return $(async (value: Maybe<TFieldValue>) => {
    const result = await getParsedZodSchema(schema, value);
    return result.success ? '' : result.error.issues[0].message;
  });
}

/**
 * Creates a validation functions that parses the Zod schema of a field.
 *
 * @param schema A Zod schema.
 *
 * @returns A validation function.
 */
export const zodField$ = implicit$FirstArg(zodFieldQrl);
