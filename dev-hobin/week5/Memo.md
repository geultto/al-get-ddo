## 이진 힙

1. 노드 하나당 최대 2개의 자식 노드를 가지는 트리이며
2. 자식 노드는 부모 노드보다 작아야 하며 (최대 이진힙인 경우)
3. 채울때 왼쪽부터 순서대로 채워야한다. => 이게 노드를 찾을 때의 규칙성을 만들어낸다.

### 공식

- 왼쪽 자식 노드 : 2n + 1
- 오른쪽 자식 노드 : 2n + 2
- 부모 노드 : floor((n - 1) / 2)

### 코드

```js
export class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    let index = this.values.length - 1;
    const element = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];
      if (element <= parent) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length <= 0) return max;

    this.values[0] = end;
    const length = this.values.length;
    let index = 0;
    const element = this.values[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      let leftChild;
      let swap = null;
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap == null && rightChild > element) ||
          (swap != null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap == null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = element;
      index = swap;
    }

    return max;
  }
}
```

## 우선순위큐

새로운 자료라기보다는 개념적인 자료구조로 내부적으로 이진힙을 사용하여 자료의 추가, 삭제시 우선순위순으로 자동으로 정렬이 되게하는 것이다.

```js
export class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    let newNode = new Node(value, priority);
    this.values.push(newNode);
    let index = this.values.length - 1;
    const node = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];
      if (node.priority >= parent.priority) break;
      this.values[parentIndex] = node;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length <= 0) return min;

    this.values[0] = end;
    const length = this.values.length;
    let index = 0;
    const node = this.values[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      let leftChild;
      let swap = null;
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.priority > node.priority) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap == null && rightChild.priority < node.priority) ||
          (swap != null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap == null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = node;
      index = swap;
    }

    return min;
  }
}
```

## 해시테이블

1. 어떤 값이든 한번에 접근할 수 있게 키-값 쌍으로 저장하고 싶다.

2. 해시 함수를 이용해서 키를 해시값으로 만들어서 쓴다. (O(1)로 한번에 접근할 수 있는 인덱스를 만드는 것)
3. 해시값을 만들어내는 과정에서 중복된 해시값이 생겨 충돌하는 상황이 생긴다.
   - 개별 체이닝 : 충돌이 생길 경우 해시값은 같이 쓰면서 키-값쌍들을 함께 보관하고 필요할 때 순회하여 특정 값을 찾는다. (이중 데이터 구조)
   - 직선 탐색법 : 충돌이 생길 경우 그 다음 빈칸에 키-값쌍을 저장한다.

### 시간복잡도

해시테이블의 최악의 시간 복잡도는 해시 함수의 성능이 중요하다. 최대한 충돌이 없게 데이터를 분배하고 해시값을 만드는 성능 자체가 좋아야한다.

## 경선식 다익스트라

여러 지역을 돌아다니며 실제 경로를 전수 조사하는 사람이라고 생각하자.

### 키워드

1. 지도
   지도를 가중치 그래프로 표현하기

2. 이동
   현재 지역에서 다음 지역들에 대한 조사를 끝내고 최신화를 한 뒤에 아직 가지 않은 지역 중 시작 지역과의 거리가 더 가까운 쪽으로 이동

3. 최신화

   - 각 지역들마다의 처음 시작 지역으로부터의 최단거리 정보

   - 위의 자료를 바탕으로하여 최단 경로로 갔을 때의 각 지역마다의 경로상 이전 지역 (현재 지역으로 업데이트 할지 말지)

결과적으로 다 돌았을 때 목적지부터 출발지까지의 이전 경로들을 역순으로 돌리면 출발지부터의 최단 경로를 완성시킬 수 있다.

## 동적 프로그래밍

동적 프로그래밍은 문제를 더 작은 문제로 쪼개어 해결하는 것은 재귀와 같지만

1. 그 쪼개어진 작은 문제들이 불필요하게 중복 수행이 된다.
2. 쪼개진 문제를 해결하는데 다른 쪼개진 문제의 해결을 필요로 한다.

위 두 가지를 만족할 때 해결할 수 있는 방법을 의미한다.

### 해결방법

- 메모이제이션 (하향식)
  작은 문제를 해결할 때마다 그 결과를 저장해두어 이미 해결한 문제를 또다시 해결하지 않도록 함
- 타뷸레이션 (상향식)
  애초에 가장 작은 문제 해결부터 시작하여 결과를 누적해 최종 결과를 만들어 냄
