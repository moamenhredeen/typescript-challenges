/*
 * # Omit
 * by Anthony Fu (@antfu) #medium #union #built-in
 *
 * ## Question
 *
 * Implement the built-in `Omit<T, K>` generic without using it.
 *
 * Constructs a type by picking all properties from `T` and then removing `K`
 *
 * For example
 *
 * ```ts
 * interface Todo {
 *   title: string
 *   description: string
 *   completed: boolean
 * }
 *
 * type TodoPreview = MyOmit<Todo, 'description' | 'title'>
 *
 * const todo: TodoPreview = {
 *   completed: false,
 * }
 * ```
 *
 * > View on GitHub: https://tsch.js.org/3
 */


type MyOmit<T extends object, K> = {
	[P in keyof T as P extends K ? never : P]: T[P]
}

import type { Equal, Expect } from './utils'


// -------------------------- Test Cases --------------------------

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// idk how to fix this
// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}
