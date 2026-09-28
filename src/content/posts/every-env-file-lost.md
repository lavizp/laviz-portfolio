---
title: Every .env file I have ever lost
date: 2025-08-30
category: Tools
readTime: 4
excerpt: Three lost staging configs, one accidental paste into a public gist, and the morning I decided to write confseal.
lead: Nobody loses an .env file once. The third time you start writing the tool.
---

## The three losses

A laptop reinstall, a deleted branch, and a staging config that got overwritten by a teammate's local copy. Three different failure modes, one common thread: the secrets lived in exactly one place.

## The paste

Then the morning I pasted a production key into a public gist and watched it get indexed before I could delete it. That was the morning confseal got its first commit.

## Encrypt, share, switch

Confseal keeps env files encrypted per project, lets you share them by key, and switches between them without a single paste into chat. Three jobs, one tool, no accounts.
