// Type Equality
// how to compare types in typescirpt ? 
// the classic solutions
type IsEqual1<T, U> = T extends U ? U extends T ? 'yes' : 'no' : 'no' 

// This approach works well in many cases, but has important edge cases where it doesn't behave as expected. 
// edge cases 
// Problem 1: Distribution over Union Types
// Conditional types distribute over unions when they’re naked in the T position

type Problem1_Test1 = IsEqual1<'a' | 'b', 'a' | 'b'>; // ❌ Expected: 'yes' - but result: 'yes' | 'no'
type Problem1_Test2 = IsEqual1<'a' | 'b', 'a'>;       // ❌ Expected: 'no' — but result: 'yes' | 'no'
type Problem1_Test3 = IsEqual1<'a', 'a' | 'b'>;       // ❌ Expected: 'no' — but result: 'yes' | 'no'

// why does it not work for type unions
// Because T = 'a' | 'b', and T is *naked*, the conditional type *distributes*:
type Result = (
  'a' extends 'a' ? ('a' extends 'a' | 'b' ? 'ja' : 'no') : 'no' 
) |
(
  'b' extends 'a' ? ('a' extends 'b' | 'a' ? 'ja' : 'no') : 'no'
)

// This happens only when T is a union and appears naked in the extends position — like this:
// `T extends U ?`
// This causes distribution:
// > When conditional types act on a generic type that is a naked type parameter, they are distributed over union types.

// how to prevent distribution
// Wrap the type parameters in tuples

type IsEqual11<T, U> = [T] extends [U] ? [U] extends [T] ? 'ja' : 'no' : 'no';

type Problem1_Test11 = IsEqual11<'a' | 'b', 'a' | 'b'>; // ✅ Expected: 'yes'
type Problem1_Test21 = IsEqual11<'a' | 'b', 'a'>;       // ✅ Expected: 'no'
type Problem1_Test31 = IsEqual11<'a', 'a' | 'b'>;       // ✅ Expected: 'no'


// the most robust solution for equality is to use the function trick
// let's dive deep into how the function-based IsEqual<T, U> type works in TypeScript. 
// This trick is a type-level identity comparison hack using generic function inference.

type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? true : false;

// goal
// To determine if two types T and U are exactly the same — not just assignable to each other, but identical types.
// TypeScript doesn’t have a built-in === operator for types, so we build one ourselves.
//
// let's break it down
//
// Step 1: understanding the funtion signature
// `<G>() => G extends T ? 1 : 2`
// This means it’s a type-level function that distinguishes types based on how they relate to T.
// This function encodes the identity of T in the structure of the function.
//
// Step 2: Why use a generic parameter?
// This function doesn't do anything — it just has a generic parameter G. Why?
// Because in TypeScript, function types are compared structurally, and generic parameters can simulate substitution behavior.
// so when we write:
// (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2)
// We’re comparing how both functions behave for all possible G.
// This comparison becomes:
// > Is the result of G extends T ? 1 : 2 always assignable to the result of G extends U ? 1 : 2 for all G?
// That only happens when T and U are exactly the same.
//
// Step 3: How structural function comparison works
type A = <G>() => G extends string ? 1 : 2;
type B = <G>() => G extends string ? 1 : 2;
type C = A extends B ? true : false; // true ✅
// But if the logic differs — even if only slightly — then the function types are no longer assignable:
type AA = <G>() => G extends string ? 1 : 2;
type BB = <G>() => G extends number ? 1 : 2;
type CC = AA extends BB ? true : false; // false ❌
// So this is a precise fingerprint for the type: only if T === U, will the two functions behave identically for all substitutions of G.
//
//Step 4: Why not just use conditional types?
// You might ask: why not just use T extends U ? U extends T ? true : false : false?
// That works in most cases, but:
// - It distributes over unions.
// - It sometimes treats structurally equivalent types as different due to definition (e.g., T & U vs normalized object).
// - It is not symmetric in weird edge cases.
// The function-based approach avoids these problems by:
// - Preventing distribution: because T and U are not "naked" type parameters.
// - Comparing behavior, not just structure or assignability.
