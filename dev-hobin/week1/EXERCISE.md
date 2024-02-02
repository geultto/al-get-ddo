### 1. 빈도수 세기- validAnagram

```js
function validAnagram(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;

  const aBag = {};
  const bBag = {};

  a.split("").forEach((v) => (aBag[v] = (aBag[v] || 0) + 1));
  b.split("").forEach((v) => (bBag[v] = (bBag[v] || 0) + 1));

  return (
    a.length === b.length && Object.keys(aBag).every((v) => aBag[v] === bBag[v])
  );
}
```

### 2. 다중 포인터 - countUniqueValues

```js
function countUniqueValues(arr) {
  if (arr.length < 2) return arr.length;

  let left = 0;
  let right = 0;
  let count = 0;
  while (right < arr.length) {
    right += 1;
    if (arr[left] === arr[right]) {
      continue;
    } else {
      left = right;
      count += 1;
    }
  }

  return count;
}
```

### 3. 빈도수 세기 - sameFrequency

```js
function sameFrequency(n1, n2) {
  const memo = {};

  while (n1 > 0) {
    const v = n1 % 10;
    memo[v] = (memo[v] || 0) + 1;
    n1 = Math.floor(n1 / 10);
  }

  while (n2 > 0) {
    const v = n2 % 10;
    if (memo[v] === undefined || memo[v] <= 0) return false;
    memo[v] -= 1;
    n2 = Math.floor(n2 / 10);
  }

  return true;
}
```

### 4. 빈도수 세기 / 다중 포인터 - areThereDuplicates

```js
function areThereDuplicates(...args) {
  const memo = {};
  for (const arg of args) {
    if (memo[arg]) return true;
    memo[arg] = true;
  }
  return false;
}
```

### 5. 다중 포인터 - averagePair

```js
function averagePair(arr, targetAvg) {
  if (arr.length < 2) return false;
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg < targetAvg) {
      left += 1;
    } else if (avg > targetAvg) {
      right -= 1;
    } else return true;
  }

  return false;
}
```

### 6. 다중 포인터 - isSubsequence

```js
function isSubsequence(targetStr, baseStr) {
  let i = 0;
  for (let j = 0; j < baseStr.length; j++) {
    if (targetStr[i] === baseStr[j]) ++i;
  }

  if (i < targetStr.length) return false;
  return true;
}
```

### 7. Sliding Window - maxSubarraySum

```js
function maxSubarraySum(arr, len) {
  if (len <= 0) return null;
  if (arr.length < len) return null;

  let initial = 0;
  for (let i = 0; i < len; i++) initial += arr[i];

  let maxSum = initial;
  let current = initial;
  for (let i = 1; i < arr.length - len + 1; i++) {
    current = current - arr[i - 1] + arr[i + len - 1];
    maxSum = Math.max(current, maxSum);
  }

  return maxSum;
}
```

### 8. Sliding Window - minSubArrayLen

```js
function minSubArrayLen(arr, n) {
  let left = 0;
  let right = 0;
  let sum = arr[0];
  let min = Infinity;

  while (right < arr.length) {
    if (sum < n) {
      if (right === arr.length - 1) break;
      right += 1;
      sum += arr[right];
    } else {
      min = Math.min(min, right - left + 1);
      if (left === right) break;
      sum -= arr[left];
      left += 1;
    }
  }

  return min === Infinity ? 0 : min;
}
```

### 9. Sliding Window - findLongestSubstring

```js
function findLongestSubstring(str) {
  if (str.length <= 1) return str.length;

  let left = 0;
  let right = 0;
  let max = -Infinity;
  const memo = {};

  while (right < str.length) {
    if (memo[str[right]]) {
      while (str[left] !== str[right]) {
        memo[str[left]] = false;
        left += 1;
      }
      left += 1;
      max = Math.max(max, right - left + 1);
      right += 1;
    } else {
      max = Math.max(max, right - left + 1);
      memo[str[right]] = true;
      right += 1;
    }
  }

  return Number.isFinite(max) ? max : 0;
}
```
