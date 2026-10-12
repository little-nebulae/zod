import type { $ZodType } from "zod/v4/core";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";
import { validateAsync } from "zod/v4/core";

import type { ParseOptions } from "@/types";

export async function attempValidateAsync<TSchema extends $ZodType>(
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
          operation: "parse value with schema asynchronously",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: options,
      }),
  });
}
