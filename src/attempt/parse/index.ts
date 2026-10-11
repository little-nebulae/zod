import type { $ZodType } from "zod/v4/core";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { $ZodAsyncError, $ZodError, parse } from "zod/v4/core";

import type { ParseOptions } from "@/types";

import { InvalidDataError } from "@/error/classes/invalid-data";
import { UnsupportedAsyncSchemaError } from "@/error/classes/unsuppported-async-schema";

export function attemptParse<TSchema extends $ZodType>(
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
        return new InvalidDataError({
          cause: error as $ZodError<TSchema>,
          meta: options,
        });
      }
      if (error instanceof $ZodAsyncError) {
        return new UnsupportedAsyncSchemaError({
          cause: error,
          meta: options,
        });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse value with schema",
          reason: DEFAULT_FAILURE_REASON,
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
