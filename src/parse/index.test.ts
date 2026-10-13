import { assert, describe, expect, test } from "vitest";
import { z } from "zod";
import { $ZodAsyncError, $ZodError } from "zod/v4/core";

import { zodParse } from "@/parse";

// Success cases
describe("zodParse function should succeed", () => {
  test("when the input value satisfies the schema", () => {
    const value = "value";
    const schema = z.literal(value);
    const result = zodParse({ schema, value });

    assert(result.success);
    expect(result.data).toBe(value);
  });
});

// Failure cases
describe("zodParse function should fail", () => {
  test("when the input value does NOT satisfy the schema", () => {
    const value = "value";
    const schema = z.boolean();
    const options = { reportInput: true };
    const zodResult = schema.safeParse(value, options);
    const result = zodParse({ schema, value }, options);

    assert(zodResult.success === false);
    assert(result.success === false);
    const error = result.error;
    assert(error.code === "ZOD_PARSE_ERROR");
    expect(error.cause).toBeInstanceOf($ZodError);
    expect(error.meta).toStrictEqual(options);
    expect(error.issues).toStrictEqual(zodResult.error.issues);
  });

  test("when the schema is async", () => {
    const value = "value";
    const schema = z.string().refine(
      async (name) => {
        await new Promise((r) => setTimeout(r, 50));
        return !new Set(["admin", "root"]).has(name);
      },
      { error: "Username is already taken" },
    );
    const options = { reportInput: true };
    const result = zodParse({ schema, value }, options);

    assert(result.success === false);
    const error = result.error;
    assert(error.code === "ZOD_ASYNC_ERROR");
    expect(error.cause).toBeInstanceOf($ZodAsyncError);
    expect(error.meta).toStrictEqual(options);
  });

  test("with an UnexpectedError when something throws in transform's callback", () => {
    const value = "value";
    const message = "Kaboom, baby!";
    const typeError = new TypeError(message);
    const schema = z.string().transform(() => {
      throw typeError;
    });
    const options = { reportInput: true };
    const result = zodParse({ schema, value }, options);

    assert(result.success === false);
    const error = result.error;
    assert(error.code === "UNEXPECTED_ERROR");
    expect(error.meta).toStrictEqual(options);
    const cause = error.cause;
    assert(cause instanceof TypeError);
    expect(cause).toStrictEqual(typeError);
    expect(cause.message).toBe(message);
  });
});
