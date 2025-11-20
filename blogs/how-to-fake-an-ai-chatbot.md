---
title: How to Fake an AI Chatbot
date: 2022-01-01
readingTime: 5
---

# How to Fake an AI Chatbot

In the age of advanced artificial intelligence, chatbots have become ubiquitous. From customer service to personal assistants, they are everywhere. But have you ever wondered how to create a "fake" AI chatbot? One that seems intelligent but is actually running on simple scripts and predefined responses? In this post, we'll explore the art of illusion in software.

## The Illusion of Intelligence

The key to a convincing fake AI is **context awareness**. Even if your bot doesn't understand the meaning of words, it can look for keywords and respond with pre-written templates.

### Simple Pattern Matching

Using regular expressions, you can catch common phrases.
- **User**: "I need help with my order."
- **Bot**: "I can certainly help with your order. What seems to be the problem?"

The bot doesn't know what an "order" is, but it knows to respond to "help" and "order" with a specific string.

## Adding Delays

Real humans (and complex AIs) take time to "think" or type. Adding artificial delays to your chatbot's responses can significantly increase the perceived realism.

```javascript
function respond(message) {
  setTimeout(() => {
    console.log(message);
  }, Math.random() * 1000 + 500);
}
```

## Conclusion

While building a real AI is a complex engineering feat, faking one is a fun exercise in psychology and user experience design. It teaches us that sometimes, perception is just as important as reality.
