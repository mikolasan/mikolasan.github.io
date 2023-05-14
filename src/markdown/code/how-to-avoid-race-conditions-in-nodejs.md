---
date: 2021-09-09
title: How to avoid race conditions in Node.js?
published: 2021-09-09
lastModified: 2021-09-09
---

In Node.js everything executed in one thread, but it's important to ensure that the order of operations is maintained when using async/await functions, and that any functions that are not idempotent (i.e., perform an action that cannot be safely repeated) are awaited properly to prevent unexpected behavior.

A small example to illustrate the problem

```js
async function updateCart(userId, itemId) {
  const cart = await getCartFromDatabase(userId);
  cart.items.push(itemId);
  await updateCartInDatabase(userId, cart);
  return cart;
}

// Incorrect usage of async function
updateCart(user1, item1); // called without await
updateCart(user1, item2); // called without await
```

The second call might overwrite the changes made by the first call, resulting in wrong items in the cart. 