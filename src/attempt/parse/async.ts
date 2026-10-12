import type { $ZodType, output } from "zod/v4/core";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";
import { $ZodError, parseAsync } from "zod/v4/core";

import type { ParseOptions } from "@/types";

import { InvalidDataError } from "@/error/classes/invalid-data";

export async function attemptParseAsync<TSchema extends $ZodType>(
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
    tryFn: () => parseAsync(schema, value, options),
    catchFn: (error) => {
      if (error instanceof $ZodError) {
        return new InvalidDataError({
          cause: error as $ZodError<output<TSchema>>,
          meta: options,
        });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse value with schema asynchronously",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: options,
      });
    },
  });
}
