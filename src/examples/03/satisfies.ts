import { Exact, Expect } from "../../utils/types";

const objA: Record<string, string> = {
  a: "some string",
  b: "something else",
  c: "another option",
};

const objB = {
  a: "some string",
  b: "something else",
  c: "another option",
} satisfies Record<string, string>;

type test1 = [
  Expect<Exact<keyof typeof objA, string>>,
  // @ts-expect-error
  Expect<Exact<keyof typeof objA, "a" | "b" | "c">>
];

type test2 = [
  Expect<Exact<keyof typeof objB, string>>,
  Expect<Exact<keyof typeof objB, "a" | "b" | "c">>
];

// ---

type Book = {
  name: string;
};

type User = {
  name: string;
  books: Book[];
};

const userA: User = {
  name: "John",
  books: [
    {
      name: "The Grapes of Wrath",
    },
  ],
};

const userB = {
  name: "John",
  books: [
    {
      name: "The Grapes of Wrath",
    },
  ],
} as const satisfies User;
