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

## 기본 정렬

강의에서는 아이템들간의 비교 로직을 구현하지 않았는데 하지 않았는데 compare 인자를 추가하여 보충하였다.  
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
