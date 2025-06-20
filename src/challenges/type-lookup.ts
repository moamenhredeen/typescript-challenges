/**
 * # Type Lookup
 *
 * by Anthony Fu (@antfu) #medium #union #map
 *
 * # Question
 *
 * Sometimes, you may want to look up a type in a union by its attributes.
 *
 * In this challenge, we would like to get the corresponding type by searching for the common `type` field in the union `Cat | Dog`. In other words, we will expect to get `Dog` for `LookUp<Dog | Cat, 'dog'>` and `Cat` for `LookUp<Dog | Cat, 'cat'>` in the following example.
 *
 * ```ts
 * interface Cat {
 *   type: 'cat'
 *   breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
 * }
 *
 * interface Dog {
 *   type: 'dog'
 *   breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
 *   color: 'brown' | 'white' | 'black'
 * }
 *
 * type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 * ```
 *
 * > View on GitHub: https://tsch.js.org/62
 */


// my solution
type LookUp<T, K extends string> = T extends {type: infer U} ? K extends U ? T : never : never;


// an easier way and a better solution: 
// type LookUp<T, K extends string> = T extends {type: T}  ? T : never ;

type test = LookUp<Animal, 'dog'>


// -------------------------- Test Cases --------------------------


import type { Equal, Expect } from './utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]
