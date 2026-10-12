import { assert, describe, expect, test } from "vitest";
import { z } from "zod";
import { $ZodError } from "zod/v4/core";

import { attemptParseAsync } from "@/attempt/parse/async";

// Success cases
describe("attemptParseAsync should succeed", async () => {
  test("when the input value satisfies an async schema", async () => {
    const value = "value";
    const schema = z.literal(value).transform(async (arg) => {
      await new Promise((r) => setTimeout(r, 50));
      return arg.toUpperCase();
    });
    const result = await attemptParseAsync({ schema, value });

    assert(result.success);
    expect(result.data).toBe(await schema.parseAsync(value));
  });

  test("when the input value satisfies a sync schema", async () => {
    const value = "value";
    const schema = z.literal(value);
    const result = await attemptParseAsync({ schema, value });

    assert(result.success);
    expect(result.data).toBe(value);
  });
});

// Failure cases
describe("attemptParseAsync should fail with", async () => {
  test("InvalidDataError when the input value doesn't satisfy the schema", async () => {
    const value = "value";
    const schema = z.string().refine(async (arg) => {
      await new Promise((r) => setTimeout(r, 50));
      return arg !== value;
    });
    const options = { reportInput: true };
    const zodResult = await schema.safeParseAsync(value, options);
    const result = await attemptParseAsync({ schema, value }, options);

    assert(zodResult.success === false);
    assert(result.success === false);

    const zodError = zodResult.error;
    const error = result.error;
    assert(error.code === "INVALID_DATA_ERROR");
    expect(error.cause).not.toBeInstanceOf(z.ZodError);
    expect(error.cause).toBeInstanceOf($ZodError);
    expect(error.meta).toStrictEqual(options);

    const issues = error.issues;
    expect(issues).toStrictEqual(zodError.issues);
    expect(issues).toHaveLength(1);

    const issue = issues[0];
    assert(issue !== undefined);
    assert(issue.code === "custom");
    expect(issue.input).toBe(value);
    expect(issue.path).toHaveLength(0);
  });

  test("UnexpectedError when the input value reaches the transform method and the transform's callback throws", async () => {
    const value = "value";
    const message = "Kaboom, baby!";
    const typeError = new TypeError(message);
    const schema = z.string().transform(async (arg) => {
      await new Promise((r) => setTimeout(r, 50));
      if (arg === value) {
        throw typeError;
      }
    });
    const options = { reportInput: true };

    const result = await attemptParseAsync({ schema, value }, options);
    assert(result.success === false);

    const error = result.error;
    assert(error.code === "UNEXPECTED_ERROR");
    expect(error.meta).toStrictEqual(options);

    const cause = error.cause;
    assert(cause instanceof TypeError);
    expect(cause.message).toBe(message);
  });

  test("InvalidDataError (not UnexpectedError) when the input value doesn't satisfy the base schema even though the transform method has a throwing callback", async () => {
    const value = "22";
    const message = "Kaboom, baby!";
    const typeError = new TypeError(message);
    const schema = z.number().transform(async (arg) => {
      await new Promise((r) => setTimeout(r, 50));
      if (arg.toString() === value) {
        throw typeError;
      }
    });
    const options = { reportInput: true };

    const zodResult = await schema.safeParseAsync(value, options);
    const result = await attemptParseAsync({ schema, value }, options);
    assert(zodResult.success === false);
    assert(result.success === false);

    const zodError = zodResult.error;
    const error = result.error;
    assert(error.code === "INVALID_DATA_ERROR");
    expect(error.cause).not.toBeInstanceOf(z.ZodError);
    expect(error.cause).toBeInstanceOf($ZodError);
    expect(error.meta).toStrictEqual(options);

    const issues = error.issues;
    expect(issues).toStrictEqual(zodError.issues);
    expect(issues).toHaveLength(1);

    const issue = issues[0];
    assert(issue !== undefined);
    assert(issue.code === "invalid_type");
    assert(issue.expected === "number");
    expect(issue.input).toBe(value);
    expect(issue.path).toHaveLength(0);
  });
});
