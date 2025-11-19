---
title: Sample Blog Post: Navigating File-Based Routing in React
date: 2024-01-15
readingTime: 5
---

# Sample Blog Post: Navigating File-Based Routing in React

## The Power of Loaders

In modern web development, fetching data before rendering is key to a fast user experience.
```javascript
const response = await fetch(`/blogs/${blogSlug}.md`);
if (response.status === 404) {
  throw new Error('Not Found');
}
const markdown = await response.text();
return { markdown };
```

## Image Handling

Remember the golden rule for images in Markdown loaded via fetch: **use root-relative paths**.

![An example image](/blogs/images/placeholder.png)
