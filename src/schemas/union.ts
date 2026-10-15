import { z } from "zod";

export const PropertyKeySchema = z.toZod<PropertyKey>()(
  z.union([z.string(), z.number(), z.symbol()]),
);
