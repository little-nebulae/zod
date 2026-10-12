import type { output, ZodSafeParseResult, ZodType } from "zod";
import type { $ZodType } from "zod/v4/core";

import { fail, succeed } from "@little-nebulae/result";
import { z } from "zod";

import type { ParseOptions } from "@/types";

import { InvalidDataError } from "@/error/classes/invalid-data";

export function wrapZodResult<T>(
  result: ZodSafeParseResult<T>,
  options: ParseOptions = {},
) {
  if (result.success) {
    return succeed(result.data);
  }
}
