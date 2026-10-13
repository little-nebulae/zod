import type { $ZodType } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { compile } from "zod/v4/core";

export function zodCompile<TSchema extends $ZodType>(schema: TSchema) {
  return attempt({
    tryFn: () => compile(schema, { strict: false }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "compile schema" }),
        cause: error,
        meta: null,
      }),
  });
}
