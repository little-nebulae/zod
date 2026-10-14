import { z } from "zod";

export const PositiveNumber = z.number().positive();
export const NegativeNumber = z.number().negative();
export const NonPositiveNumber = z.number().nonpositive();
export const NonNegativeNumber = z.number().nonnegative();

export const PositiveInteger = z.int().positive();
export const NegativeInteger = z.int().negative();
export const NonPositiveInteger = z.int().nonpositive();
export const NonNegativeInteger = z.int().nonnegative();
