import type { $ZodType } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import {
  compile,
  ZodCompileAsyncError,
  ZodCompileUnsupportedError,
} from "zod/v4/core";

import { ZodStrictCompilationError } from "@/errors/strict-compilation";

export function zodCompileStrict<TSchema extends $ZodType>(schema: TSchema) {
  return attempt({
    tryFn: () => compile(schema, { strict: true }),
    catchFn: (error) => {
      if (
        error instanceof ZodCompileAsyncError ||
        error instanceof ZodCompileUnsupportedError
      ) {
        return new ZodStrictCompilationError({ cause: error });
      }
      return new UnexpectedError({
        message: composeErrorMessage({ operation: "compile schema strictly" }),
        cause: error,
        meta: null,
      });
    },
  });
}
