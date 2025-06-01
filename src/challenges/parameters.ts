/*
 * # Parameters
 *
 * by midorizemi (@midorizemi) #easy #infer #tuple #built-in
 *
 * # Question
 *
 * Implement the built-in Parameters<T> generic without using it.
 *
 * For example:
 *
 * ```ts
 * const foo = (arg1: string, arg2: number): void => {}
 *
 * type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
 * ```
 *
 * > View on GitHub: https://tsch.js.org/3312
 */


type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer Args) => any ? Args : never


// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]
