---
title: A local AI that only reads my notes
date: 2026-03-09
category: Tools
readTime: 8
excerpt: How promptic keeps its context small: no crawling, no embeddings I can't inspect, and one plaintext folder as the only source of truth.
lead: An AI assistant is only as good as the context you give it. The trick is deciding what never goes in.
---

## One folder is the whole corpus

No crawling, no database, no embedding index I cannot inspect. promptic reads the notes folder, period. What is not in the folder does not exist to the model, and that is the point.

```bash caption="Two answers, both from files I can open and read myself."
$ promptic search "why did i set the timeout"
notes/2024-11-03.md
notes/2025-02-14.md
```

## Small context, honest answers

Because the context is small, the answers stay close to what I actually wrote. The model paraphrases my own notes back to me — which turns out to be exactly what I wanted when I searched for something I had forgotten.

## Why this beats a general assistant

A general assistant answers from everyone's memory. Mine answers from mine. For the question 'why did I set that timeout', only one of those has the right answer.
