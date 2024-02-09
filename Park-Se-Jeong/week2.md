## 재귀 (Recursion)
**종료 조건**을 만날 때 까지 **자기 자신을 호출**한다.
**재귀함수는 반복문으로 모두 바꿀 수 있다.**

재귀 함수 작성 시 흔히 하는 실수는,
>1. **종료 조건** 부재 
>2. 잘못된 **반환 값** 

이는 `StackOverflow` 오류로 이어진다.
**반드시 정확하게 설정해줘야 함!**

그리고 **가장 중요한 것도 종료 조건과 반환 값이다.**   
포인트를 누락하기 때문에 call stack 에 미친듯이 쌓여서    
난리가 나는 것........   

-> 그래도, `꼬리 재귀 최적화` 라는 게 있다.
**재귀함수를 재해석하고 선형 알고리즘으로 실행해준다.**   
아무리 반복이 많이 일어나도, 스택이 넘치지 않게 해준다.

1. 사용하는 언어가 꼬리 재귀 최적화를 지원하는 지 확인하고,
2. return 값이 함수 자체로만 들어가도록 해주면?   

**꼬리 재귀가 가능하다!**


### 왜 재귀함수를 쓸까..?
강의를 보는 내내 계속 들었던 의문이었다.   
**모두 같은 타입을 다룬다면, for나 while 같은 loop 로 퉁쳐도 좋다.**      
다양한 형태의 데이터가 들어 있다면 재귀함수로 공략하는 게 더 효율적이고 빠르다..   

ㅠㅠ 커헉






---

## 검색 알고리즘
선형 검색, 이진 검색, 나이브 문자열 검색에 대해 다룬다.
<br>

### 선형 검색
말 그대로 선형, linear 적인 탐색이다.
**조건에 맞는 요소를 찾기 위해 처음부터 끝까지 모두 살핀다.**
linear 에서 느껴지는 일차함수의 냄새.. 
그렇다.... 시간복잡도는 `O(n)`이다. 




<br>

### 이진 검색
**반씩 댕강 잘라 비교한다.** 정렬 안 하고 쓰면 미친짓이다.
`O(log n)`의 시간복잡도를 갖는 똑똑한 검색.

arr에서 7을 찾는다고 생각해보자.
여기서 잘리는 기준은 인덱스로 보는 걸 잊지 말자.

```js
const arr = [1, 4, 5, 7, 9]
            S      M      E

```

Middle 에서 한 번 잘랐다. 
**어? Middle인 5보다 커?**

그럼 Middle 에서 스리슬쩍 한 칸 옮겨보자.
그리고, **다시 자른다.**

```js
const slicedArr = [7, 9]
                   SM  E
```

7은 가장 작으면서 중간값이다. **(인덱스의 중간값인거다)**
7을 벌써 이렇게 찾았다.

<br>

그럼 **4를 찾는다고 다시 생각해보면?**
중간보다 작다. 그럼, 중간 빼고 나머지 놈을 보자


```js
const slicedArr = [1, 4]
                  S   ME
```

Middle 과 End 가 같아졌다. 찾았다. 

**여기서 알 수 있는 포인트는,**

1. Middle 과 같아질 때까지 각 포인터를 옮기면서 조건에 맞는 요소를 찾는다.   
2. Middle 을 기준으로 계속 자른다. 정렬 안 된 곳에서 이 짓을 하면 미친 짓이다.

<br>

그리고 **또 하나 포인트는, while이 정확한 시점에서 종료될 수 있도록 해야한다.**   
값을 찾았는데 거기서 안 멈추면? 무한루프 돈다.


지금까지 글을 읽어보면, Middle(인덱스의) 을 찾는 게 중요했다.   
그럼 종료조건도 Middle 에서 포인트를 찾는다.    
`arr[middle] !== elem` 으로.      

그리고, 하나 더 걸어놓을 것은 **start 가 end 보다 작을 수 있게.** 
이건, 배열에 없는 값을 찾으라고 넣었을 때 문제가 생기기 때문이다.

`[1, 4, 5, 7, 9]`에서 **50 찾아봐.** 라고 주면?   
중간으로 자르고, 비교하고, 자르고, 비교하고,   
없는 녀석을 향해 끝없는 모험이 일어난다.   


<br>

```js
function binarySearch(arr, elem) {
    var start = 0;
    var end = arr.length - 1;
    var middle = Math.floor((start + end) / 2);
    while(arr[middle] !== elem && start <= end) {
        if(elem < arr[middle]) end = middle - 1;
        else start = middle + 1;
        middle = Math.floor((start + end) / 2);
    }
    return arr[middle] === elem ? middle : -1;
}

```

<br>

### 나이브 문자열 검색
long을 순회, 각 위치에서 시작해 short가 일치하는 지 확인.   
전체가 일치하면 count를 업한다.   
난.. 정규식이 좋다.. 솔직히 보는데 흐에엑 했다

```js
function naiveSearch(long, short){
    var count = 0;
    for(var i = 0; i < long.length; i++){
        for(var j = 0; j < short.length; j++){
           if(short[j] !== long[i+j]) break;
           if(j === short.length - 1) count++;
        }
    }
    return count;
}

naiveSearch("lorie loled", "lol")
```

.....히..히히

```js
function regexSearch(text, pattern) {
    var regex = new RegExp(pattern, "g"); // 'g' 플래그는 전역 검색을 의미합니다.
    var matches = text.match(regex);
    return matches ? matches.length : 0;
}

regexSearch("lorie loled", "lol");

```