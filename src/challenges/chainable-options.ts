/**
 * # Chainable Options
 *
 * by Anthony Fu (@antfu) #medium #application
 *
 * # Question
 *
 * Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?
 *
 * In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.
 *
 * For example
 *
 * ```ts
 * declare const config: Chainable
 *
 * const result = config
 *   .option('foo', 123)
 *   .option('name', 'type-challenges')
 *   .option('bar', { value: 'Hello World' })
 *   .get()
 *
 * // expect the type of result to be:
 * interface Result {
 *   foo: number
 *   name: string
 *   bar: {
 *     value: string
 *   }
 * }
 * ```
 *
 * You don't need to write any js/ts logic to handle the problem - just in type level.
 *
 * You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.
 *
 * > View on GitHub: https://tsch.js.org/12
 */

type Chainable<R = object> = {

	// 1. key must be of type string
  option<K extends string, V>(
		// keys should not be repeated
		key: K extends keyof R ?  never : K,
		// capture value type
		value: V
	): Chainable< 
		// remove existing keys with the same name from return type
		{[p in keyof R as p extends K ? never : p]: R[p]}
		& 
		// add the key of type K to the return type
		{ [p in K]: V }
	> 

	get(): R
}


// -------------------------- Test Cases --------------------------


import type { Alike, Expect } from './utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}
