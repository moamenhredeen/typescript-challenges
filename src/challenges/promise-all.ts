/**
 * # Promise.all
 *
 * by Anthony Fu (@antfu) #medium #array #promise
 *
 * # Question
 *
 * Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.
 *
 * ```ts
 * const promise1 = Promise.resolve(3);
 * const promise2 = 42;
 * const promise3 = new Promise<string>((resolve, reject) => {
 *   setTimeout(resolve, 100, 'foo');
 * });
 *
 * // expected to be `Promise<[number, 42, string]>`
 * const p = PromiseAll([promise1, promise2, promise3] as const)
 * ```
 *
 * > View on GitHub: https://tsch.js.org/20
 */

declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{ 
	[i in keyof T]: Awaited<T[i]>
}>

// notes
// 1. readonly [...T] 
// 	- make array item readonly to prevent their types to coerce
// 2. { [i in keyof T]: T[i]}
// 	- does not create an object, even if it seems like that
// 	- it does only iterate over the tuple and map the values
// 3. Awaited
// 	- i tried to not use Awaited, but if do not use it i have to define similar utility type
// 	- because the Promise should be recursivly unwrapped, i should define extra utility
	

// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
]
