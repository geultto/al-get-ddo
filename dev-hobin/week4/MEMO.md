## 단일 연결 리스트는 데이터의 우선순위를 나타낸다고 볼 수 있다

단일 연결 리스트는 자료에 대한 탐색을 할 때 head부터 순서대로 탐색할 수 밖에 없다
이것을 자료의 우선순위로 생각할 수 있다.

즉, head가 가장 우선순위가 높고 tail이 가장 우선순위가 낮다.

### 스택과 큐

자료의 추가와 삭제가 빈번히 일어난다.
스택과 큐는 단일 연결 리스트가 우선순위를 나타내는 성질을 활용한 것이다.

스택 - 먼저 추가된 자료가 나중에 삭제된다. (선입후출)
큐 - 먼저 추가된 자료가 먼저 삭제된다. (선입선출)

#### 단일 연결 리스트 활용

자료의 우선순위라는 표현을 사용해보면

스택 - 나중에 추가된 자료가 우선순위가 높다.
큐 - 먼저 추가된 자료구조가 우선순위가 높다.

따라서, 스택은 자료가 추가될 때마다 head쪽에 추가해야하며 큐는 tail쪽에 추가해야한다.

## 자료구조는 자료를 구성하는게 절반, 사용하는게 절반이다.

자료구조를 사용한다는 건 특수한 목적에 맞게 효율적으로 자료를 사용하기 위해 임의의 입력값을 구조화한다는 것이다.

1 단계로 자료를 추가하는 과정에서 자료의 구성이 선행되고  
2 단계로 자료를 사용하게 된다.

자료구조의 연산중에 자료를 사용할 때 쓰는 연산의 효율성을 가장 신경써야 하며 자료를 구성하는 연산도 효율성이 너무 낮아서는 안된다.

### 이진 탐색 트리

이진 탐색 트리는 자료를 구성할 때, 각 노드의 왼쪽 자식은 현재 노드보다 작은 값으로, 오른쪽 자식은 현재 노드보다 큰 값으로 배치하여 구성된다. 이러한 자료 구성은 나중에 탐색할 때 O(log N)의 시간 복잡도를 가지게 한다.

#### 한쪽으로 치우친 트리

이진 탐색 트리의 특이한 점은 자료를 추가하는 연산 뿐만 아니라 추가하려는 자료의 순서도 자료의 구성에 영향을 미친다는 것이다.

애초에 정렬이 되어 있는 상태로 이진 탐색 트리의 자료를 구성하면 한쪽으로 치우쳐 진 트리가 만들어져 사용할 때의 시간 복잡도가 O(N)까지 늘어난다.

## 탐색의 종류

### 깊이 우선 탐색

깊이 우선 탐색은 결국 스택의 성질(선입후출)을 이용하여 반복문을 돌리는 것에 불과하다.
또한, `스택 + 반복문 = 재귀`이기 때문에 재귀로 탐색을 하는 것과 같다.

### 너비 우선 탐색

너비우선 탐색은 결국 큐의 성질(선입선출)을 이용하여 반복문을 돌리는 것에 불과하다.
