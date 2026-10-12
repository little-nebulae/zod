import { assert, describe, expect, test } from "vitest";
import { z } from "zod";

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
