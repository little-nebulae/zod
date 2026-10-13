import type { $ZodType, output } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { $ZodAsyncError, $ZodError, parse } from "zod/v4/core";

import type { ParseOptions } from "@/types";

import { ZodAsyncError } from "@/errors/async";
import { ZodParseError } from "@/errors/parse";

export function zodParse<TSchema extends $ZodType>(
  {
    schema,
    value,
  }: {
    schema: TSchema;
    value: unknown;
  },
  options: ParseOptions = {},
) {
  return attempt({
    tryFn: () => parse(schema, value, options),
    catchFn: (error) => {
      if (error instanceof $ZodError) {
        return new ZodParseError({
          cause: error as $ZodError<output<TSchema>>,
          meta: options,
        });
      }
      if (error instanceof $ZodAsyncError) {
        return new ZodAsyncError({
          cause: error,
          meta: options,
        });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse value with schema",
        }),
        cause: error,
        meta: options,
      });
    },
  });
}
