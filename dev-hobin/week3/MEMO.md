## 정렬

특정 기준으로 컬렉션의 아이템들을 재배치하는 것

정렬 알고리즘은 여러가지가 있고 각각의 접근법이 다르기 때문에 알고리즘마다의 장단점이 있다.  
따라서 상황에 맞게 더 유리한 정렬 알고리즘을 선택하는 것이 중요하다.

## 자바스크립트 sort 메서드

```js
sort((a, b) => a - b);
```

개인적으로 위와 같이 쓸 때마다 이게 오름차순 정렬인지 내림차순 정렬인지.. a, b 중 어느게 이전값이고 다음값인지 헷갈린다.

```js
// 멘탈 모델
sort((다음값, 이전값) => {
  return (
    음수 -> 자리변경
    0, 양수 -> 자리유지
  )
})

// 실제 사용
sort((next, prev) => prev > next ? -1 : 1);
```

위와 같이 쓰면 헷갈리지 않게 정렬을 쓸 수 있었다.

## 여러 정렬 알고리즘

강의에서는 아이템들간의 비교 로직을 구현하지 않았는데 compare 인자를 추가하여 보충하였다.  
compare의 시그니처는 자연스럽게 자바스크립트 내장 메서드 sort와 같게 하였다.

### 버블 정렬

```js
function bubbleSort(arr, compare) {
  for (let limit = arr.length - 1; limit >= 0; limit--) {
    let swapped = false;
    for (let i = 0; i < limit; i++) {
      if (compare(arr[i + 1], arr[i]) < 0) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    // 한 바퀴 다 돌았을 때 한번도 swap이 안일어났으면 이미 모두 정렬되었다는 뜻이다.
    if (!swapped) break;
  }
}
```

### 선택 정렬

```js
function selectionSort(arr, compare) {
  for (let start = 0; start < arr.length; start++) {
    let selectIdx = start;
    for (let i = start + 1; i < arr.length; i++) {
      if (compare(arr[i], arr[selectIdx]) < 0) selectIdx = i;
    }
    // 한바퀴 돌아봤는데 이미 모두 정렬돼있는 경우
    if (selectIdx === start) break;

    const temp = arr[start];
    arr[start] = arr[selectIdx];
    arr[selectIdx] = temp;
  }
}
```

### 삽입 정렬

```js
function insertionSort(arr, compare) {
  for (let i = 1; i < arr.length; i++) {
    const lastIdx = i - 1;
    for (let j = 0; j <= lastIdx; j++) {
      if (compare(arr[i], arr[j]) < 0) {
        arr.splice(j, 0, arr.splice(i, 1)[0]);
      }
    }
  }
}
```

### 합병 정렬

```js
function merge(left, right, compare) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (compare(right[j], left[i]) < 0) {
      result.push(right[j++]);
    } else {
      result.push(left[i++]);
    }
  }

  if (i < left.length) result.push(...left.slice(i));
  if (j < right.length) result.push(...right.slice(j));

  return result;
}

function mergeSort(arr, compare) {
  if (arr.length <= 1) return [...arr];

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left, compare), mergeSort(right, compare), compare);
}
```

처음에는 합병 정렬의 공간 복잡도가 왜 O(n)인지 이해가 안갔다.  
찾아본 결과 재귀함수의 공간 복잡도를 생각할 때는 호출 스택이 쌓이고 해소되는 과정까지 생각해보아야 한다. 스택이 해소될 때 메모리가 함께 해제되기 때문이다.  
(시간 복잡도와는 다른것이 이미 로직을 수행하는데 사용한 시간은 되돌릴 수 없는 것이지만 공간은 필요한만큼 사용했으면 이후에 정리하여 다시 사용 가능한 공간이 될 수 있다.)

참고 : [왜 합병 정렬의 공간 복잡도가 O(n)인가?](https://stackoverflow.com/questions/10342890/merge-sort-time-and-space-complexity)

### 퀵 정렬

```js
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function pivot(arr, compare, start = 0, end = arr.length - 1) {
  let pivotIndex = start;
  const pivotValue = arr[pivotIndex];
  for (let i = start; i <= end; i++) {
    if (compare(arr[i], pivotValue) < 0) {
      swap(arr, pivotIndex + 1, i);
      pivotIndex += 1;
    }
  }
  swap(arr, pivotIndex, start);

  console.log(start, end, arr);
  return pivotIndex;
}

function quickSort(arr, compare, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const pivotIndex = pivot(arr, compare, start, end);

  quickSort(arr, compare, start, pivotIndex - 1);
  quickSort(arr, compare, pivotIndex + 1, end);
}
```

### 기수 정렬

(코드 생략)

여러 조합으로 모든 데이터를 표현할 수 있는 바구니(0 ~ 9)를 만들고 바구니에 데이터를 반복하여 재배치하는 과정에서 자연스럽게 정렬이 되는 방식이 참 신기한 접근이라고 생각했다. (default로 0 바구니를 사용한 것도...)
