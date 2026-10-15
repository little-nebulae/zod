import { z } from "zod";

export const ErrorObjectSchema = z.looseObject({
  name: z.string(),
  message: z.string(),
  cause: z.unknown().exactOptional(),
  stack: z.string().exactOptional(),
});
