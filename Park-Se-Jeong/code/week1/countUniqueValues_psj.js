/**
 * Implement a function called countUniqueValues, which accepts a sorted array,
 * and counts the unique values in the array.
 * There can be negative numbers in the array, but it will always be sorted.
 */

/**
 * STEPS
 * 1. 배열 들어오는 지 확인
 * 2. 길이 0으로 들어오면 0 나오게
 * 3. 음수도 받을 수 있어야 함...
 * 음... set에 넣고 말 것 같은데.
 */
function countUniqueValue(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('배열만 넣어주세염..ㅠ')
  }

  const setArr = new Set(arr)
  return setArr.size;
}


const a = countUniqueValue([1, 1, 1, 1, 1, 2])
const b = countUniqueValue([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])
const c = countUniqueValue([])
const d = countUniqueValue([-2. - 1, -1, 0, 1])

console.log(a)
console.log(b)
console.log(c)
console.log(d)
