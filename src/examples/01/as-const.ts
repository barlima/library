import { Exact, Expect } from "../../utils/types";

const john = "John" as const;
// const john = <const>"John";

type test1 = [
  Expect<Exact<typeof john, "John">>,
  Expect<Exact<typeof john, string>>,
  // @ts-expect-error
  Expect<Exact<typeof john, "Adam">>
];

const eleven = 11 as const;

type test2 = [
  Expect<Exact<typeof eleven, 11>>,
  Expect<Exact<typeof eleven, number>>,
  // @ts-expect-error
  Expect<Exact<typeof eleven, 10>>
];

const list = [1, 2, 3, 4] as const;

// @ts-expect-error
list.push(10);

// @ts-expect-error
list[0] = 10;

type test3 = [
  Expect<Exact<typeof list, Readonly<[1, 2, 3, 4]>>>,
  Expect<Exact<typeof list, Readonly<number[]>>>,
  Expect<Exact<(typeof list)[0], 1>>,
  // @ts-expect-error
  Expect<Exact<typeof list, number[]>>,
  // @ts-expect-error
  Expect<Exact<typeof list, [1, 2, 3, 4]>>
];

const obj = {
  a: "string",
  b: 0,
  c: ["a", "b", "c"],
  d: {
    e: null,
  },
} as const;

type test4 = [
  Expect<Exact<typeof obj.a, "string">>,
  Expect<Exact<typeof obj.a, string>>,

  Expect<Exact<typeof obj.c, Readonly<string[]>>>,
  // @ts-expect-error
  Expect<Exact<typeof obj.c, string[]>>,

  Expect<Exact<typeof obj.d, Record<"e", null>>>,
  Expect<Exact<typeof obj.d, { e: null }>>
];

// @ts-expect-error
obj.d["f"] = 10;
