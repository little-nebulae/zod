import type { $ZodAsyncError } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";

import type { ParseOptions } from "@/types";

export const UNSUPPORTED_ASYNC_SCHEMA_ZOD_ERROR_CODE =
  "UNSUPPORTED_ASYNC_SCHEMA_ZOD_ERROR";
export type UnsupportedAsyncSchemaZodErrorCode =
  typeof UNSUPPORTED_ASYNC_SCHEMA_ZOD_ERROR_CODE;

export class UnsupportedAsyncSchemaZodError extends BaseError<
  UnsupportedAsyncSchemaZodErrorCode,
  $ZodAsyncError,
  ParseOptions
> {
  readonly name = "UnsupportedAsyncSchemaZodError";
  readonly code = UNSUPPORTED_ASYNC_SCHEMA_ZOD_ERROR_CODE;

  constructor({
    message,
    cause,
    meta,
  }: {
    message?: string;
    cause: $ZodAsyncError;
    meta: ParseOptions;
  }) {
    super({ message: message ?? cause.message, cause, meta });
  }
}
