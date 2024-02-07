### 10. power

#### 재귀

```js
function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
```

#### 꼬리재귀

```js
function power(base, exponent, acc = 1) {
  if (exponent === 0) return acc;
  return power(base, exponent - 1, acc * base);
}
```

#### 반복문

```js
function power(base, exponent) {
  let acc = 1;
  for (let i = exponent; i > 0; i--) {
    acc *= base;
  }
  return acc;
}
```

### 11. factorial

#### 재귀

```js
function factorial(n) {
  if (n <= 0) return 1;
  return n * factorial(n - 1);
}
```

#### 꼬리재귀

```js
function factorial(n, acc = 1) {
  if (n <= 0) return acc;
  return factorial(n - 1, n * acc);
}
```

#### 반복문

```js
function factorial(n) {
  let acc = 1;
  for (let i = n; i > 0; i--) {
    acc *= n;
  }
  return acc;
}
```

### 14. fib

#### 재귀

```js
function fib(n) {
  let m = n - 1;
  if (m < 0) return -1;
  if (m === 0 || m === 1) return 1;

  return fib(n - 2) + fib(n - 1);
}
```

#### 꼬리재귀

```js
function fib(n) {
  const m = n - 1;
  if (m < 0) return -1;
  if (m === 0 || m === 1) return 1;

  function go(i = 2, pp = 1, p = 1) {
    const curr = pp + p;
    if (i === m) return curr;

    return go(i + 1, p, curr);
  }

  return go();
}
```

#### 반복문

```js
function fib(n) {
  const m = n - 1;
  if (m < 0) return -1;
  if (m === 0 || m === 1) return 1;

  let curr;
  for (let i = 2, pp = 1, p = 1; i <= m; i++) {
    curr = pp + p;
    pp = p;
    p = curr;
  }
  return curr;
}
```

### 18. flatten

#### 꼬리재귀

```js
function flatten(arr) {
  return arr.flatMap((v) => (Array.isArray(v) ? flatten(v) : v));
}
```

#### 반복문 (gpt 이용)

```js
function flatten(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }

  return result;
}
```

### 19. nestedEvenSum

#### 재귀

```js
function nestedEvenSum(obj) {
  function evenSum(obj) {
    let acc = 0;
    for (const prop in obj) {
      if (obj[prop] != null && typeof obj[prop] === "object") {
        acc += evenSum(obj[prop]);
      } else if (typeof obj[prop] === "number" && obj[prop] % 2 === 0) {
        acc += obj[prop];
      } else continue;
    }
    return acc;
  }

  return evenSum(obj);
}
```
