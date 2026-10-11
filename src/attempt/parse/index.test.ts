import { assert, describe, expect, test } from "vitest";
import { z } from "zod";

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
