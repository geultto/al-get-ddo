
/*
Write a function called same, which accepts two arrays.
The function should return true if every value in the array has it's corresponding
value squared in the second array. The frequency of values must be the same.

same([1, 2, 3], [4, 1, 9]) true
same([1, 2, 3], [1, 9]) false
same([1, 2, 1], [4, 4, 1]) false

*/

// 1. 배열 2개를 받는다. arr1에 있는 내부 요소에 제곱한 값이 모두 arr2에 있다면 true.
// 2. length 가 같아야한다.


//첫번째시도... 무지성으로 읽고 짰음.
// function same(arr1, arr2) {
//     // step1 : 배열이 2개 들어왔는 지, 각 배열의 length 가 같은지 비교한다
//     if(!arr1 || !arr2) return false;
//     if(!(arr1.length === arr2.length)) return false;
//     // step2 : arr1의 모든 요소에 제곱을 한다. 그리고 각 요소가 arr2에 포함되어 있는 지 체크한다.    
//     let result = false;
//     // step3 : 모두 포함되어 있다면 true, 아니면 false.
//     arr1.forEach(el => {
//         // 제곱 기억안난다... 
//         const squared = el * el
//         return result = arr2.includes(squared)
//     })
//     console.log(result);
//    return result; 
// }


//arr1Report에서 for문 돌려서 
//const arr1 = [1, 2, 4, 3]
//const arr2 = [4, 1, 1, 16]
//이렇게 넣으니까 true뱉음.. 막판에서 비교를 이상하게했네용
function same(arr1, arr2) {
  // step1 : 배열이 2개 들어왔는 지, 각 배열의 length 가 같은지 비교한다
  if (!arr1 || !arr2) return false;
  if (!(arr1.length === arr2.length)) return false;
  // step2 : arr1의 모든 요소에 제곱을 한다. 그리고 각 요소가 arr2에 포함되어 있는 지 체크한다.    
  let result = false;
  // step3 : 모두 포함되어 있다면 true, 아니면 false.
  let arr1Report = {}
  let arr2Report = {}

  arr1.forEach(el => {
    if (arr1Report[el ** 2] > 0) {
      arr1Report[el ** 2] += 1
    } else {
      arr1Report[el ** 2] = 1
    }
  })
  // { 1: 2, 4: 1}

  arr2.forEach(el => {
    if (arr2Report[el] > 0) {
      arr2Report[el] += 1
    } else {
      arr2Report[el] = 1
    }
  })
  // { 1: 1, 4: 2}

  console.log(arr1Report);
  console.log(arr2Report);

  for (const key in arr1Report) {
    console.log("key", key)
    result = arr1Report[key] === arr2Report[key]
  }

  console.log(result);


  return result;
}
const arr1 = [1, 2, 4, 3]
const arr2 = [4, 1, 1, 16]

same(arr1, arr2)