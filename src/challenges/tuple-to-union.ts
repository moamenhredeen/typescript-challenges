/**
 * # Tuple to Union
 *
 * by Anthony Fu (@antfu) #medium #infer #tuple #union
 *
 * # Question
 *
 * Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.
 *
 * For example
 *
 * ```ts
 * type Arr = ['1', '2', '3']
 *
 * type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
 * ```
 *
 * > View on GitHub: https://tsch.js.org/10
 */


type TupleToUnion<T> = T extends Array<infer Items> ? Items : never;

// maybe a better solution
type TupleToUnion2<T extends any[]> = T[number]


// -------------------------- Test Cases --------------------------

import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,

  Expect<Equal<TupleToUnion2<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion2<[123]>, 123>>,
]
