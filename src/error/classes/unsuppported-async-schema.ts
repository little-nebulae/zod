import type { $ZodAsyncError } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";

import type { UnsupportedAsyncSchemaErrorCode } from "@/error/codes";
import type { ParseOptions } from "@/types";

import { UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE } from "@/error/codes";

export class UnsupportedAsyncSchemaError extends BaseError<
  UnsupportedAsyncSchemaErrorCode,
  $ZodAsyncError,
  ParseOptions
> {
  readonly name = "UnsupportedAsyncSchemaError";
  readonly code = UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE;

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
