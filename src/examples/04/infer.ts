import { Exact, Expect } from "../../utils/types";

type Unarray<T> = T extends Array<infer U> ? U : never;

type User = {
  name: string;
  friends: { name: string; since: string }[];
};

type Friend = Unarray<User["friends"]>;

type test1 = [Expect<Exact<keyof Friend, "name" | "since">>];

// ---

type FunctionReturn<T> = T extends (...args: any) => infer U ? U : never;

const foo = () => 10;
const bar = () => "text";

type test2 = [
  Expect<Exact<FunctionReturn<typeof foo>, number>>,
  Expect<Exact<FunctionReturn<typeof bar>, string>>,

  Expect<Exact<ReturnType<typeof foo>, FunctionReturn<typeof foo>>>
];

// ---

type SnakeCaseToCamelCase<T extends string> = T extends `${infer U}_${infer V}`
  ? `${Capitalize<U>}${SnakeCaseToCamelCase<V>}`
  : Capitalize<T>;

type HopeItsCamelCase = SnakeCaseToCamelCase<"hope_it_is_camel_case">;

type test3 = [
  Expect<Exact<HopeItsCamelCase, "HopeItIsCamelCase">>,
  // @ts-expect-error
  Expect<Exact<HopeItsCamelCase, "hope_it_is_camel_case">>
];

type FirstLetter<T extends string> = T extends `${infer U}${string}`
  ? U
  : never;

type A = FirstLetter<"Aleksandra">;

type test4 = [Expect<Exact<A, "A">>];

// ---

const obj = {
  name: "John",
  address: {
    street: "Kilińskiego",
  },
};

type GetAddressType<T extends Record<string, unknown>> = T extends {
  address: infer U;
}
  ? U
  : never;

type Address = GetAddressType<typeof obj>;
