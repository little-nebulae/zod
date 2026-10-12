import type { Result } from "@little-nebulae/result";
import type { ZodSafeParseResult } from "zod";

import { fail, succeed } from "@little-nebulae/result";

import type { ParseOptions } from "@/types";

import { InvalidDataError } from "@/error/classes/invalid-data";

export function wrapZodResult<T>(
  result: ZodSafeParseResult<T>,
  options: ParseOptions = {},
): Result<T, InvalidDataError<T>> {
  if (result.success) {
    return succeed(result.data);
  }
  return fail(new InvalidDataError({ cause: result.error, meta: options }));
}
