---
title: Reading a codebase by deleting it
date: 2025-11-17
category: Process
readTime: 6
excerpt: Delete a file. Run the tests. Delete the next file. The code that survives is the code you can prove matters.
lead: The fastest way to understand a codebase is to try to make it smaller.
---

## Delete one file

Run the tests. If they pass, that file was already dead — the codebase was smaller than you thought. If they fail, read the failure, restore the file, and you have learned exactly what it was for.

## Delete until it breaks

Repeat until the suite stops passing. What survives is the minimum viable surface of the system, and that surface is the part worth reading closely.

## What you get

A map. Not of every file, but of the ones that matter — the ones no test will let you remove. That is the code you need to understand first.
