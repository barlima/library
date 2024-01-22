export type Exact<T, U> = T extends U ? true : false;

export type Expect<T extends true> = T;
