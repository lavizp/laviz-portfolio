---
title: Mastering CSS Grid
date: 2023-05-20
readingTime: 5
---

# Mastering CSS Grid

CSS Grid Layout is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike Flexbox which is largely a 1-dimensional system.

## Why Grid?

Before Grid, we used tables, floats, positioning, and inline-block, all of which were essentially hacks. Flexbox helped a lot, but it wasn't designed for complex 2D layouts. Grid solves this.

## Basic Terminology

- **Grid Container**: The element on which `display: grid` is applied.
- **Grid Item**: The direct children of the grid container.
- **Grid Line**: The dividing lines that make up the structure of the grid.

## A Simple Example

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

This creates a three-column grid where each column takes up an equal fraction of the available space.

## Conclusion

Mastering CSS Grid gives you the power to create complex, responsive layouts with clean and semantic markup. It's a must-have skill for any modern frontend developer.
