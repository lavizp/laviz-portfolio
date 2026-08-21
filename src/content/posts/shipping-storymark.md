---
title: Shipping storymark: a docs tool in a weekend
date: 2026-02-02
category: Tools
readTime: 5
excerpt: What I cut to finish it — themes, plugins, config — and why the version with none of them is the one people use.
lead: The weekend version shipped. The one with themes and plugins never would have.
---

## Everything I cut

Themes, plugins, a config file, routing options, syntax highlighting themes. Each one was a good idea. Each one was a reason to not ship on Sunday night.

```bash caption="The entire feature list on one line."
$ npx storymark ./docs
watched 14 files · 3 components · 0 config
```

## What survived

A folder, a port, and a live-reloading preview. That is it. The version with none of the good ideas is the one people actually use, because there is nothing to learn before it is useful.

## Cutting is the feature

Every feature has a maintenance cost that outlives the feature. Shipping nothing but the core means the core gets maintained forever.
