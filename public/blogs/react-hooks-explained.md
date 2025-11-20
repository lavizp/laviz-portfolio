---
title: React Hooks Explained
date: 2023-07-10
readingTime: 5
---

# React Hooks Explained

React Hooks were introduced in React 16.8 and they completely changed how we write React components. They allow you to use state and other React features without writing a class.

## The Motivation

Before Hooks, reusing stateful logic between components was difficult. We had to use patterns like render props and higher-order components, which could lead to "wrapper hell". Hooks allow you to extract stateful logic from a component so it can be tested independently and reused.

## Common Hooks

### useState

`useState` lets you add React state to function components.

```javascript
const [count, setCount] = useState(0);
```

### useEffect

`useEffect` lets you perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes.

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

## Custom Hooks

The real power comes from building your own custom hooks. You can bundle complex logic into a single function call, keeping your components clean and declarative.

## Summary

Hooks are a more direct API to the React concepts you already know. They make code more readable, reusable, and easier to reason about.
