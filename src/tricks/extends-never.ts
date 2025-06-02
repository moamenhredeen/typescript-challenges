// # Question
// Here is an implementation of DeepReadonly (taken from here, which is a solution to this challenge).
type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };
// What purpose is extends never serving here? I gather it's some kind of base case for the recursive type but I don't understand when we would hit it, 
// and why it's necessary in the first place (since typescript apparently does allow some other types of self-referential type definitions without such base cases).

// # Answer
// So keyof T extends never means that there are no known keys of the T type, 
// since the keyof operator produces a union of known keys, and the never type is TypeScript's bottom type, 
// a type which has no values at all. That means keyof T extends never behaves like this:

type Hmm<T> = keyof T extends never ? true : false
type X1 = Hmm<{ a: string }> // false, "a" is a known key
type X2 = Hmm<{}> // true, there are no known keys
type X3 = Hmm<object> // true, there are no known keys
type X4 = Hmm<string> // false, there are keys like "toUpperCase"
type X5 = Hmm< { a: string } | { b: string } > // true, unions with no common keys have no known keys

// Now that's not really a good way to implement DeepReadonly<T> where presumably you just want to stop recursing when you hit a primitive type. 
// But given the above output, that's not what keyof T extends never does. For example:
type DeepReadonly1<T> = keyof T extends never
    ? T
    : { readonly [K in keyof T]: DeepReadonly1<T[K]> };

type Z1 = DeepReadonly1<{ a: string } | { b: string }> 
// type Z = {a: string} | {b: string}  OOPS

declare const z1: Z1;
if ("a" in z1) {
    z1.a = "" // no error, not readonly
}
// Since we passed in a union, the compiler sees its keys as never, and suddenly we don't have readonly anywhere. Oops.

// The "right" definition of DeepReadonly<T> is probably just
type DeepReadonly2<T> = 
  { readonly [K in keyof T]: DeepReadonly2<T[K]> };

// Mapped types already "skip" primitives by returning the input, and they automatically distribute over union, so you don't need to check for these yourself:

type Look<T> = { [K in keyof T]: 123 };
type Y1 = Look<{ a: string }> // {a: 123}
type Y2 = Look<string> // string
type Y3 = Look<{ a: string } | { b: string }>
//  Look<{ a: string; }> | Look<{ b: string; }>
// So with this version of DeepReadonly we get the right behavior for unions too:

type Z2 = DeepReadonly2<{ a: string } | { b: string }> 
// type Z2 = DeepReadonly<{  a: string; }> | DeepReadonly<{ b: string; }>

declare const z2: Z2;
if ("a" in z2) {
		// @ts-expect-error
    z2.a = "" // error! Cannot assign to 'a' because it is a read-only property
}
// And if you ever do want to check for objects vs primitives, it's probably better to use the object type:

type DeepReadonly3<T> = T extends object ?
    { readonly [K in keyof T]: DeepReadonly3<T[K]> } : T;
// This is similar to the type without the check: T extends object ? ... : T is a distributive conditional type so it automatically splits unions up, processes them, and puts them back together:

type Z3 = DeepReadonly3<{ a: string } | { b: string }>
// type Z3 = {  readonly a: string; } | { readonly b: string; }
// This is the same as the previous type even though IntelliSense's quickinfo displays them differently.

