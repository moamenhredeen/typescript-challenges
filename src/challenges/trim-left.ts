/*
 * # Trim Left
 * by Anthony Fu (@antfu) #medium #template-literal
 *
 * # Question
 *
 * Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.
 *
 * For example
 *
 * ```ts
 * type trimmed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
 * ```
 *
 * > View on GitHub: https://tsch.js.org/106
 */


type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}` ? TrimLeft<R> : S


// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
