---
title: Typing the untypeable: generics I regret
date: 2026-04-28
category: TypeScript
readTime: 6
excerpt: Three signatures from confseal that were clever, correct and completely unreadable — and what I replaced them with.
lead: The type system does not reward cleverness. It rewards signatures your future self can read at a glance.
---

## The constraint that was too clever

confseal encrypts env files with age-based keys, which sounds simple until you try to type it. My first pass encoded the whole key lifecycle into one conditional type. It passed the tests. It passed review. Nobody, including me a month later, could say what it did.

The type was not wrong. It was just doing the compiler's job of explaining itself, badly.

```ts caption="Correct. Also completely unreadable."
type Decrypt<T extends KeySpec, S extends Source> =
  T extends { age: infer A } ? A extends number ? A : never : never;
```

## What I replaced it with

Three small interfaces, one union, and a function that returns a discriminated union. The conditional type became a plain lookup. Everything got more verbose and infinitely more honest.

## The lesson

A clever type is a bug report about the data shape. If the shape needs that much ceremony to describe, the shape is the problem — not the type.

> The type that took a week to write will take a month to maintain.
