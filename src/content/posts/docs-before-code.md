---
title: Notes on writing docs before code
date: 2025-05-14
category: Process
readTime: 5
excerpt: The README is a contract, not a summary. Write it first and the code tends to agree.
lead: A README written after the code describes what happened. A README written before it describes what was wanted.
---

## The README as contract

When the README comes first, it is a spec with the confidence problem solved: you can read it back and ask whether the tool would be worth using if it did exactly what it says.

## The code tends to agree

Writing the docs first means the flags, the outputs and the edge cases are decided before the implementation exists. The code then has somewhere to be wrong, which is the best you can ask of any implementation.

## When to skip it

Prototypes get the README after. Tools get it before. The difference is whether anything depends on the tool staying the same next week.
