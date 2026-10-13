import type { $ZodType, output } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attemptAsync } from "@little-nebulae/result";
import { $ZodError, parseAsync } from "zod/v4/core";

import type { ParseOptions } from "@/types";

import { ZodParseError } from "@/errors/parse";

export async function zodParseAsync<TSchema extends $ZodType>(
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
        return new ZodParseError({
          cause: error as $ZodError<output<TSchema>>,
          meta: options,
        });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse value with schema asynchronously",
        }),
        cause: error,
        meta: options,
      });
    },
  });
}
