import type { Simplify } from "type-fest";
import type { $ZodIssue, $ZodType, ParseContext } from "zod/v4/core";

import {
  composeErrorMessage,
  DEFAULT_FAILURE_REASON,
  UnexpectedError,
} from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { $ZodAsyncError, $ZodError, parse } from "zod/v4/core";

import { InvalidDataError } from "@/error/classes/invalid-data";
import { UnsupportedAsyncSchemaError } from "@/error/classes/unsuppported-async-schema";

export function attemptParse<
  TSchema extends $ZodType,
  TContext extends Simplify<ParseContext<$ZodIssue>>,
>({
  schema,
  value,
  context,
}: {
  schema: TSchema;
  value: unknown;
  context: TContext;
}) {
  return attempt({
    tryFn: () => parse(schema, value, context),
    catchFn: (error) => {
      if (error instanceof $ZodError) {
        return new InvalidDataError({
          cause: error as $ZodError<TSchema>,
          meta: context,
        });
      }
      if (error instanceof $ZodAsyncError) {
        return new UnsupportedAsyncSchemaError({
          cause: error,
          meta: context,
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
