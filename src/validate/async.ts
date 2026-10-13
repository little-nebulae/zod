import type { $ZodType } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";
import { validateAsync } from "zod/v4/core";

import type { ParseOptions } from "@/types";

export async function zodValidateAsync<TSchema extends $ZodType>(
  {
    schema,
    value,
  }: {
    schema: TSchema;
    value: unknown;
  },
  options: ParseOptions = {},
) {
  return attemptAsync({
    tryFn: () => validateAsync(schema, value, options),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "validate value with schema asynchronously",
        }),
        cause: error,
        meta: options,
      }),
  });
}
