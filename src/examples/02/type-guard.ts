import { Exact, Expect } from "../../utils/types";

const isNumber = (x: unknown): x is number => true;

const foo = () => {
  const value = "string";

  if (isNumber(value)) {
    return value;
  }

  return 0;
};

const result = foo();

type test = [Expect<Exact<typeof result, number>>];

// ---

const isYesOrNo = (x: string): x is "Yes" | "No" => ["Yes", "No"].includes(x);

const bar = (value: string) => {
  if (isYesOrNo(value)) {
    return value;
  }

  return 0;
};

const result1 = bar("Yes");
const result2 = bar("No");
const result3 = bar("No option");

// function baz(value: "Yes"): "Yes";
// function baz(value: "No"): "No";
// function baz(value: string): 0;
function baz<T extends string>(value: T) {
  if (isYesOrNo(value)) {
    return value;
  }

  return 0;
}

const result4 = baz("Yes");
const result5 = baz("No");
const result6 = baz("No option");

// ---

function fiz(x: unknown): asserts x is number {
  if (typeof x !== "number") throw new Error("Not a number");
}

const xyz: unknown = 10;

type test1 = [Expect<Exact<typeof xyz, unknown>>];
// @ts-expect-error
type test2 = [Expect<Exact<typeof xyz, number>>];

fiz(xyz);

type test3 = [Expect<Exact<typeof xyz, number>>];
