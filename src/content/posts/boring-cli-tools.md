---
title: Why my CLI tools are boring on purpose
date: 2026-06-12
category: Tools
readTime: 7
excerpt: Flags you can guess, output you can pipe, and no spinner that hides what went wrong. A short defence of tools that behave like the ones from 1994.
lead: Flags you can guess, output you can pipe, and no spinner that hides what went wrong. A short defence of tools that behave like the ones from 1994.
---

## The cost of delight

Every tool I have written started with a moment of irritation: something that should have taken one command took nine minutes and a browser tab. The fix is rarely clever. It is usually a smaller program that does exactly one thing and then gets out of the way.

Animated progress bars are lovely until the process hangs and you have no idea which of eleven steps you are on. Colour is lovely until it lands in a log file as escape codes. Most of what we call polish in a CLI is decoration paid for by the person debugging it at 2am — often me, six months later.

So promptic prints lines. One per thing that happened, in the order it happened, with a timestamp when it matters.

```bash caption="Two lines of output. Both greppable, both true."
$ promptic add "boring tools ship"
wrote notes/2026-06-12.md (+1 line)
indexed in 12ms
```

## Guessable flags

If a user has to read the help text twice, the naming is wrong. I steal from tools people already know — `--dry-run`, `--json`, `-v` — because familiarity is a feature nobody has to document.

> A tool that surprises you once has a bug. A tool that surprises you twice has a design.

## Fail loudly, exit honestly

Non-zero exit codes, errors on stderr, and never a caught exception that pretends everything is fine. confseal refuses to write a partial env file; it would rather stop and tell you which key it could not decrypt.

None of this is innovations. It is just the boring contract that lets a small tool live in someone else's pipeline for years without maintenance — which is the only kind of success an evening project can really have.
