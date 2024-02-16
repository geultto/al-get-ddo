# Sort

## 기본 내장 자바스크립트 정렬

```js
["Steele", "Colt", "Data Structures", "Algorithms"].sort();
// [ "Algorithms", "Colt", "Data Structures", "Steele" ]

[6, 4.15, 10].sort();
// [ 10, 15, 4, 6 ]
```

> 숫자 정렬이 제대로 되지 않는다.

```js
[...].sort((a, b) => {
  return a - b; // return 결과가 음수면 a가 앞으로. 같으면 그대로. 양수면 b가 앞으로 오게된다.
})
```

## 기본 정렬

<img width="692" alt="image" src="https://github.com/geultto/al-get-ddo/assets/23524849/6c1ac008-71d6-418b-a243-2b01ac4b7f9a">

### 버블 정렬

```js
function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let swap = false;
    for (let j = 0; j < i; j++) {
      if (arr[j] <= arr[j + 1]) continue;
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      swap = true;
    }
    if (!swap) break;
  }
  return arr;
}
```

> Stable sort

### 선택 정렬

```js
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}
```

> Unstable sort

### 삽입 정렬

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const target = arr[i];
    for (let j = i - 1; j >= 0 && target < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = target;
  }
  return arr;
}
```

> Stable sort

## 중급 정렬

### 합병 정렬

<img width="742" alt="image" src="https://github.com/geultto/al-get-ddo/assets/23524849/50c7dcf2-e63f-435e-a6ad-efb29667d0f1">

```js
function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merge = (arr1, arr2) => {
    const arr = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i++]);
      } else {
        arr.push(arr2[j++]);
      }
    }
    if (i < arr1.length) arr.push(...arr1.slice(i));
    else if (j < arr2.length) arr.push(...arr2.slice(j));

    return arr;
  };

  return merge(left, right);
}
```

> Stable sort

### 퀵 정렬

<img width="745" alt="image" src="https://github.com/geultto/al-get-ddo/assets/23524849/e78696a7-814d-42d5-b8bf-c2d04180fb30">

```js
function getPivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  const pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const pivot = getPivot(arr, left, right);
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);
}
```

> Unstable sort
