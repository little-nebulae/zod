import { z } from "zod";

import { PropertyKeySchema } from "@/schemas/union";

export const UnknownRecordSchema = z.record(PropertyKeySchema, z.unknown());

export const ErrorObjectSchema = z.looseObject({
  name: z.string(),
  message: z.string(),
  cause: z.unknown().exactOptional(),
  stack: z.string().exactOptional(),
});
