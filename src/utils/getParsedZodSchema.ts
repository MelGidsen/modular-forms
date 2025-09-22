import type { QRL } from '@builder.io/qwik';
import type { ZodType } from 'zod';
import type { ZodMiniType } from 'zod/mini';
import type { MaybeFunction } from '../types';

/**
 * Parses a value with a Zod schema and returns the result.
 *
 * @param schema The Zod schema.
 * @param value The value.
 *
 * @returns The parse result.
 */
export async function getParsedZodSchema<Schema extends ZodType | ZodMiniType, Value>(
  schema: QRL<MaybeFunction<Schema>>,
  value: Value
) {
  const zodSchema = await schema.resolve();
  return (
    typeof zodSchema === 'function' ? zodSchema() : zodSchema
  ).safeParseAsync(value);
}
