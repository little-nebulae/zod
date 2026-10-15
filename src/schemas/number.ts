import { z } from "zod";

export const PositiveNumberSchema = z.number().positive();
export const NegativeNumberSchema = z.number().negative();
export const NonPositiveNumberSchema = z.number().nonpositive();
export const NonNegativeNumberSchema = z.number().nonnegative();

export const PositiveIntegerSchema = z.int().positive();
export const NegativeIntegerSchema = z.int().negative();
export const NonPositiveIntegerSchema = z.int().nonpositive();
export const NonNegativeIntegerSchema = z.int().nonnegative();
