import { assert, describe, expect, test } from "vitest";
import { z } from "zod";
import { $ZodError } from "zod/v4/core";

import { attemptParse } from "@/attempt/parse";

// Success cases
describe("attemptParse function should succeed", () => {
  test("when the input value satisfies the schema", () => {
    const value = "value";
    const schema = z.literal(value);
    const result = attemptParse({ schema, value, context: {} });

    assert(result.success);
    expect(result.data).toBe(value);
  });
});

// Failure cases
describe("attemptParse function should fail", () => {
  test("when the input value does NOT satisfy the schema", () => {
    const value = "value";
    const schema = z.boolean();
    const zodResult = schema.safeParse(value);
    const result = attemptParse({ schema, value, context: {} });

    assert(zodResult.success === false);
    assert(result.success === false);
    const error = result.error;
    assert(error.code === "INVALID_DATA_ERROR");
    expect(error.cause).toBeInstanceOf($ZodError);
    expect(error.issues).toStrictEqual(zodResult.error.issues);
  });
});
