import type { $ZodError, $ZodIssue, $ZodType } from "zod/v4/core";

import { BaseError } from "@little-nebulae/error";
import { prettifyError } from "zod/v4/core";

import type { InvalidDataErrorCode } from "@/error/codes";
import type { ParseAttemptContext } from "@/types";

import { INVALID_DATA_ERROR_CODE } from "@/error/codes";

export class InvalidDataError<
  TSchema extends $ZodType,
  TMeta extends ParseAttemptContext,
> extends BaseError<InvalidDataErrorCode, $ZodError<TSchema>, TMeta> {
  readonly name = "InvalidDataError";
  readonly code = INVALID_DATA_ERROR_CODE;
  readonly issues: $ZodIssue[];

  constructor({
    message,
    cause,
    meta,
  }: {
    message?: string;
    cause: $ZodError<TSchema>;
    meta: TMeta;
  }) {
    super({ message: message ?? prettifyError(cause), cause, meta });
    this.issues = cause.issues;
  }
}
