import { z } from "zod";

export const NonEmptyStringSchema = z
  .string()
  .min(1, "This string cannot be empty.");
