import type { $ZodType, input } from "zod/v4/core";

import { validate } from "zod/v4/core";

import type { ParseOptions } from "@/types";

export function attempValidate<TSchema extends $ZodType>(
  schema: TSchema,
  value: unknown,
  options?: ParseOptions,
): value is input<TSchema> {
  try {
    return validate(schema, value, options);
  } catch {
    return false;
  }
}
