import type { $ZodAsyncError } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";

import type { UnsupportedAsyncSchemaErrorCode } from "@/error/codes";
import type { SimplifiedParseContext } from "@/types";

import { UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE } from "@/error/codes";

export class UnsupportedAsyncSchemaError<
  TMeta extends SimplifiedParseContext,
> extends BaseError<UnsupportedAsyncSchemaErrorCode, $ZodAsyncError, TMeta> {
  readonly name = "UnsupportedAsyncSchemaError";
  readonly code = UNSUPPORTED_ASYNC_SCHEMA_ERROR_CODE;

  constructor({
    message,
    cause,
    meta,
  }: {
    message?: string;
    cause: $ZodAsyncError;
    meta: TMeta;
  }) {
    super({ message: message ?? cause.message, cause, meta });
  }
}
