import type { Result } from "@little-nebulae/result";
import type { ZodSafeParseResult } from "zod";

import { fail, succeed } from "@little-nebulae/result";

import type { ParseOptions } from "@/types";

import { ZodParseError } from "@/errors/parse";

export function wrapZodResult<T>(
  result: ZodSafeParseResult<T>,
  options: ParseOptions = {},
): Result<T, ZodParseError<T>> {
  if (result.success) {
    return succeed(result.data);
  }
  return fail(new ZodParseError({ cause: result.error, meta: options }));
}
