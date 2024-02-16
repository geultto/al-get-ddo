
## 정렬
데이터 구조와 상황에 따라 최적의 성능을 발휘한다.   

### 버블 정렬
쓰레기! 쓰지마라! (by 제로초님)   
**한 번에 두 수를 비교하면서 끝까지 비교한다.**
이중 for문이 돌기 때문에 `O(n^2)`의 시간 복잡도.

```js
function bubbleSort(arr){
  var noSwaps;
  for(var i = arr.length; i > 0; i--){
    noSwaps = true;
    for(var j = 0; j < i - 1; j++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        noSwaps = false;         
      }
    }
    if(noSwaps) break;
  }
  return arr;
}

bubbleSort([8,1,2,3,4,5,6,7]);
```

### 선택 정렬
버블 정렬만큼 간단하고 쓰레기!!   
그래도 **30 이하의 작은 수에선 효과적이다.** 간단하다.
array를 리턴해서, **메모리를 추가적으로 사용하지 않는다.**

과정을 나름 요약해봤다.
1. 처음부터 훑는다
2. 가장 작은 수를 제일 앞에 놓는다
3. 다시 훑는다
4. 두 번째로 작은 수를 두 번째 칸으로 옮긴다
5. 반복한다

**한 번 훑으면 -> 하나 정렬, 최솟값을 찾아서 던진다!**
이정도면 컴퓨터가 아니라 사람이다!!
역시 `O(n^2)`의 복잡도를 갖는다.

```js
function sselectionSort(arr){
    for(var i = 0; i < arr.length; i++){
        var lowest = i;
        for(var j = i+1; j < arr.length; j++){
            if(arr[j] < arr[lowest]){
                lowest = j;
            }
        }
        if(i !== lowest){
            //SWAP!
            var temp = arr[i];
            arr[i] = arr[lowest];
            arr[lowest] = temp;
        }
    }
    return arr;
}

// ES2015 VERSION
function selectionSort(arr) {
  const swap = (arr, idx1, idx2) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) swap(arr, i, lowest);
  }

  return arr;
}

selectionSort([0,2,34,22,10,19,17]);
```

### 삽입 정렬
첫 숫자가 기준이다.   
기준보다 **크면,** **오른쪽**   
기준보다 **작으면,** **왼쪽**

오른쪽에 쥔 카드를 왼쪽에 옮기는 거랑 다를 바 없다!!

뭔가 무식해보이면 우선 O(n^2)으로 의심하자!! 보통 정답이다.


```js
function insertionSort(arr){
	var currentVal;
    for(var i = 1; i < arr.length; i++){
        currentVal = arr[i];
        for(var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = currentVal;
    }
    return arr;
}

insertionSort([2,1,9,76,4])
```

### 합병 정렬
잘게 잘게 쪼개고 각각 정렬한다!   
그리고 merge 한다!   
`분할 -> 정렬 -> 합병`이다.

`O(N log n)`의 준수한 복잡도를 갖는다.   
**오는 게 있으면 가는 게 있다~!! 메모리를 많이 쓴다.**   
공간 복잡도가 `O(n)`이나 됨~!! 

일관성도 충실한 녀석이다..
**best, average, worst 가 다 O(n log n)!!**
```js
function merge(arr1, arr2){
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr2[j] > arr1[i]){
            results.push(arr1[i]);
            i++;
        } else {
            results.push(arr2[j])
            j++;
        }
    }
    while(i < arr1.length) {
        results.push(arr1[i])
        i++;
    }
    while(j < arr2.length) {
        results.push(arr2[j])
        j++;
    }
    return results;
}
merge([100,200], [1,2,3,5,6])
```
#### by zerocho
삽입정렬보다는 복잡한데 훨씬 성능 좋다.   
**데이터 30개 이하면 딱히 차이도 별로 없고 정렬하는 데 메모리만 쓴다.**




### 퀵 정렬 (제로초님꺼 보고 이해했어요)
합병 정렬보다 평균 2배 빠르다. 그래서 퀵이다   
**대신 재수 없으면 느리다.**

퀵 정렬에서 중요한 건, 
1. **pivot**을 기준으로 정리한다.
2. **pivot에서 맨 왼쪽 놈**은, 얘보다 **작으면 다음으로** 넘겨라. **크면 가만히**
3. **pivot에서 맨 오른쪽 놈**은, 얘보다 **크면 가만히** 있고 **작으면 넘겨라**.
4. `왼쪽놈이 기준보다 크고, 오른쪽놈이 기준보다 작으면 서로 바꿔라.`
5. 이 짓을 반복하다보면 **둘이 만난다**
6. 그럼 **만난 놈이랑 기준을 바꿔라**
7. 그럼 **기준 왼쪽엔 작은 넘, 오른쪽엔 큰 넘이 남는다**

```js
function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}


function quickSort(arr, left = 0, right = arr.length -1){
    if(left < right){
        let pivotIndex = pivot(arr, left, right) //3
        //left
        quickSort(arr,left,pivotIndex-1);
        //right
        quickSort(arr,pivotIndex+1,right);
      }
     return arr;
} 
           
quickSort([100,-3,2,4,6,9,1,2,5,3,23])
```

### 기수 정렬
**자리수 비교해서 정렬한다.**   
문자열, 정수는 거의 다 정렬 가능하고,   
복잡도는 `O(dn)`. (d는 가장 큰 데이터의 자리수)

**1의 자리수, 10의 자리수, 100의 자리수.... 기준으로 정렬한다.**

`[125, 383, 274, 96, 0, 9, 81, 72]` 가 있다.

<br>

**1의 자리수를 기준으로 정리한다.** 
`[0], [81], [72], [383], [274], [125], [96], [9]`

**10의 자리수를 기준으로 정렬한다.** 
(0이나 9 - 10의 자리수가 0이라고 생각한다)
`[0, 9], [125], [72, 274], [81, 383], [96]`

**100의 자리수를 기준으로 정렬한다.**
`[0, 9, 72, 81, 96], [125, 274, 383]`

정렬 끝.


```js
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums){
    let maxDigitCount = mostDigits(nums);
    for(let k = 0; k < maxDigitCount; k++){
        let digitBuckets = Array.from({length: 10}, () => []);
        for(let i = 0; i < nums.length; i++){
            let digit = getDigit(nums[i],k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

radixSort([23,345,5467,12,2345,9852])
```


## 느낀 점
재귀, 분할정복 개념에 대해 익숙하다면 문제 없이 이해했을 것 같습니다.   
으음....... 어우... 사실 전 좀 힘들었어요 ^_^