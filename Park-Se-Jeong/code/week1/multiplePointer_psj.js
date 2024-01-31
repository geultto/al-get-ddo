/**
 * write a function called sumZero which accepts a sorted array of integers.
 * The function should find the first pair where the sum is 0.
 * Return an array that includes both values that sum to zero or undefined if a pair does not exist.
 */

/**
 * 1. 배열이 들어왔는 지
 * 2. 오름차순으로 정렬해야 함
 * 3. [-3, -2, -1, 0, 1, 2, 3] 이라면? [-3, 3] 을 리턴한다.
 * 4. [-2, 0, 1, 3] 이라면? undefined 를 리턴한다.
 * 5. 합이 0이 되는 쌍이 없다면 undefined 을 리턴.
 */


/**
 * STEPS
 * 1. 배열이 들어왔는 지 확인
 * 2. 오름차순 정렬
 * 3. 정말 무식하게는 모든 요소를 다 더해보고, 0인 쌍이 있는 지 확인한다.
 * 4. 더 똑똑하게는, 배열의 첫 요소와 마지막 요소를 더해본다.. 핑퐁.
 */

function sumZero(arr) {
  //1. 배열이 들어왔는 지 확인
  if (!Array.isArray(arr)) return undefined;
  if (arr.length === 0) return undefined;

  //2. 오름차순 정렬
  const sortedArr = arr.sort((a, b) => a - b);
  //length 가 n 인 배열이 들어온다고 가정하자..
  // n이 홀수면 짝이 다 만들어지고 한개가 남음
  // n이 짝수면 짝 다 만들어짐

  // 헝억...?
  let result;
  for (let n = 1; n <= sortedArr.length; n++) {
    const startIndex = n - 1;
    const lastIndex = sortedArr.length - n;

    result = sortedArr[startIndex] + sortedArr[lastIndex] === 0 ? [sortedArr[startIndex], sortedArr[lastIndex]] : undefined;
  }

  return result;
}

const result = sumZero([2, 4, -1, 5])
const a = sumZero([-3, -2, -1, 0, 1, 2, 3])
const b = sumZero([-2, 0, 1, 3])
const c = sumZero([1, 2, 3])
console.log(result)
console.log(a)
console.log(b)
console.log(c)