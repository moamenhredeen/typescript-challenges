/**
 * # Last of Array
 *
 * by Anthony Fu (@antfu) #medium #array
 *
 * # Question
 *
 * > TypeScript 4.0 is recommended in this challenge
 *
 * Implement a generic `Last<T>` that takes an Array `T` and returns its last element.
 *
 * For example
 *
 * ```ts
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 *
 * type tail1 = Last<arr1> // expected to be 'c'
 * type tail2 = Last<arr2> // expected to be 1
 * ```
 *
 * > View on GitHub: https://tsch.js.org/15
 */

type Last<T extends any[]> = 
	T extends [T[0], ...infer R] 
	? R extends [] ? T[0] : Last<R> 
	: never


// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
