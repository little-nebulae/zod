import { assert, describe, expect, test } from "vitest";
import { z } from "zod";
import { $ZodAsyncError, $ZodError } from "zod/v4/core";

import { attemptParse } from "@/attempt/parse";

// Success cases
describe("attemptParse function should succeed", () => {
  test("when the input value satisfies the schema", () => {
    const value = "value";
    const schema = z.literal(value);
    const result = attemptParse({ schema, value });

    assert(result.success);
    expect(result.data).toBe(value);
  });
});

// Failure cases
describe("attemptParse function should fail", () => {
  test("when the input value does NOT satisfy the schema", () => {
    const value = "value";
    const schema = z.boolean();
    const options = { reportInput: true };
    const zodResult = schema.safeParse(value, options);
    const result = attemptParse({ schema, value }, options);

    assert(zodResult.success === false);
    assert(result.success === false);
    const error = result.error;
    assert(error.code === "INVALID_DATA_ERROR");
    expect(error.cause).toBeInstanceOf($ZodError);
    expect(error.meta).toStrictEqual(options);
    expect(error.issues).toStrictEqual(zodResult.error.issues);
  });
  test("when the schema is async", () => {
    const value = "value";
    const schema = z.literal(value).transform(async () => {
      throw new Error("Kaboom, baby!");
    });
    const options = { reportInput: true };
    const result = attemptParse({ schema, value }, options);

    assert(result.success === false);
    const error = result.error;
    assert(error.code === "UNSUPPORTED_ASYNC_SCHEMA_ERROR");
    expect(error.cause).toBeInstanceOf($ZodAsyncError);
    expect(error.meta).toStrictEqual(options);
  });
});
