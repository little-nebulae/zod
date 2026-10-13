import type { $ZodError, $ZodIssue } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";
import { prettifyError } from "zod/v4/core";

import type { ParseOptions } from "@/types";

export const ZOD_PARSE_ERROR_CODE = "ZOD_PARSE_ERROR";
export type ZodParseErrorCode = typeof ZOD_PARSE_ERROR_CODE;

export class ZodParseError<T> extends BaseError<
  ZodParseErrorCode,
  $ZodError<T>,
  ParseOptions
> {
  readonly name = "ZodParseError";
  readonly code = ZOD_PARSE_ERROR_CODE;
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
