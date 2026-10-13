import type { $ZodAsyncError } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";

import type { ParseOptions } from "@/types";

export const ZOD_ASYNC_ERROR_CODE = "ZOD_ASYNC_ERROR";
export type ZodAsyncErrorCode = typeof ZOD_ASYNC_ERROR_CODE;

export class ZodAsyncError extends BaseError<
  ZodAsyncErrorCode,
  $ZodAsyncError,
  ParseOptions
> {
  readonly name = "ZodAsyncError";
  readonly code = ZOD_ASYNC_ERROR_CODE;

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
