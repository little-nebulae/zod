import type { Simplify } from "type-fest";
import type { $ZodIssue, ParseContext } from "zod/v4/core";

export type ParseOptions = Simplify<ParseContext<$ZodIssue>>;
