import { z } from "zod";

export const NonEmptyStringSchema = z
  .string()
  .nonempty("This string cannot be empty.");
