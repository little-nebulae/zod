import type {
  ZodCompileAsyncError,
  ZodCompileUnsupportedError,
} from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";

export const ZOD_STRICT_COMPILATION_ERROR_CODE = "ZOD_STRICT_COMPILATION_ERROR";
export type ZodStrictCompilationErrorCode =
  typeof ZOD_STRICT_COMPILATION_ERROR_CODE;

export class ZodStrictCompilationError extends BaseError<
  ZodStrictCompilationErrorCode,
  ZodCompileAsyncError | ZodCompileUnsupportedError
> {
  readonly name = "ZodStrictCompilationError";
  readonly code = ZOD_STRICT_COMPILATION_ERROR_CODE;

  constructor({
    message,
    cause,
  }: {
    message?: string;
    cause: ZodCompileAsyncError | ZodCompileUnsupportedError;
  }) {
    super({ message: message ?? cause.message, cause, meta: null });
  }
}
