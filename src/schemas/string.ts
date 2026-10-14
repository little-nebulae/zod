import { z } from "zod";

export const NonEmptyStringSchema = z
  .string()
  .nonempty("This string cannot be empty.");

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email("Invalid email.").max(254, "Email is too long."));
export const UnicodeEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(
    z
      .email({ pattern: z.regexes.unicodeEmail, error: "Invalid email." })
      .max(254, "Email is too long."),
  );
