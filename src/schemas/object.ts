import type { BaseErrorMeta } from "@little-nebulae/error";
import type { $ZodType } from "zod/v4/core";

import { z } from "zod";

import { PropertyKeySchema } from "@/schemas/union";

export const UnknownRecordSchema = z.record(PropertyKeySchema, z.unknown());

export const ErrorObjectSchema = z.looseObject({
  name: z.string(),
  message: z.string(),
  cause: z.unknown().exactOptional(),
  stack: z.string().exactOptional(),
});

export const BaseErrorMetaSchema = z.toZod<BaseErrorMeta>()(
  z.union([UnknownRecordSchema, z.null()]),
);

export function createBaseErrorObjectSchema<
  TCode extends string,
  TCauseSchema extends $ZodType,
  TMetaSchema extends typeof BaseErrorMetaSchema,
>({
  code,
  causeSchema,
  metaSchema,
}: {
  code: TCode;
  causeSchema: TCauseSchema;
  metaSchema: TMetaSchema;
}) {
  return z.looseObject({
    ...ErrorObjectSchema.shape,
    code: z.literal(code),
    cause: causeSchema,
    meta: metaSchema,
  });
}
