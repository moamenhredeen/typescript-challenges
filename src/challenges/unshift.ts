/*
 * Unshift
 *
 * by jiangshan (@jiangshanmeta) #easy #array
 *
 * # Question
 *
 * Implement the type version of ```Array.unshift```
 *
 * For example:
 *
 * ```typescript
 * type Result = Unshift<[1, 2], 0> // [0, 1, 2]
 * ```
 *
 * > View on GitHub: https://tsch.js.org/3060
 */

type Unshift<T extends any[], U> = [U, ...T]


// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
