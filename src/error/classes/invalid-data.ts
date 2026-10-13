import type { $ZodError, $ZodIssue } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";
import { prettifyError } from "zod/v4/core";

import type { ParseOptions } from "@/types";

export const INVALID_DATA_ZOD_ERROR_CODE = "INVALID_DATA_ZOD_ERROR";
export type InvalidDataZodErrorCode = typeof INVALID_DATA_ZOD_ERROR_CODE;

export class InvalidDataZodError<T> extends BaseError<
  InvalidDataZodErrorCode,
  $ZodError<T>,
  ParseOptions
> {
  readonly name = "InvalidDataZodError";
  readonly code = INVALID_DATA_ZOD_ERROR_CODE;
  readonly issues: $ZodIssue[];

  constructor({
    message,
    cause,
    meta,
  }: {
    message?: string;
    cause: $ZodError<T>;
    meta: ParseOptions;
  }) {
    super({ message: message ?? prettifyError(cause), cause, meta });
    this.issues = cause.issues;
  }
}
