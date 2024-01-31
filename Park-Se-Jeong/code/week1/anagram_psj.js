
/*

1. 두 개의 문자열을 받는다.
2. 두 번째 문자열이, 첫 번째 문자열의 anagram 인 지 판별한다.
3. 글자를 재배열한 것이 anagram 이다. 
4. 공백, 마침표, 대소문자는 관계없다.

(ex) cinema -> iceman

validAnagram('aaz', 'zza') // false
validAnagram('anagram', 'nagaram') // true
validAnagram('rat', 'car') // false
validAnagram('awesome', 'awesom') // false
validAnagram('qwerty', 'qeywrt') // true


STEPS
1. 문자열이 두 개 들어왔는 지
2. 두 문자열의 length 는 같은 지
3. 재배열 했을 뿐 내용은 달라지지 않는다. 각 키가 몇 개 있는 지 체크한다.
+ 공백 없애고, 마침표 없애고, 소문자로 변환
4. 그 키에 담긴 value 들이 전부 일치한다면 true.
5. 그렇지 않다면 false 를 리턴한다.

*/

function validAnagram(str1, str2) {
  // 1. 문자열이 두 개 들어왔는 지
  if (!str1 || !str2) return false;
  // 2. 두 문자열의 length 는 같은 지
  if (str1.length !== str2.length) return false;

  // 3. 각 문자열에 대해 기록해놓을 객체 선언
  let str1Report = {}
  let str2Report = {}

  // + 공백 없애고, 마침표 없애고, 소문자로 변환
  // .... 정규표현식 몰겠음
  let processedStr1 = str1.trim().toLowerCase();
  let processedStr2 = str2.trim().toLowerCase();

  for (let el of processedStr1) {
    str1Report[el] = (str1Report[el] || 0) + 1;
  }

  for (let el of processedStr2) {
    str2Report[el] = (str2Report[el] || 0) + 1;
  }

  for (let key in str1Report) {

    if (!(key in str2Report)) {
      return false;
    }
    if (str1Report[key] !== str2Report[key]) {
      console.log(str1Report[key], str2Report[key])
      return false;
    }
  }
  return true;
}

console.log(validAnagram('aaz', 'zza'))
console.log(validAnagram('anagram', 'nagaram'))
console.log(validAnagram('ra t', 'c  ar'))
console.log(validAnagram('awesome', 'awesom'))
console.log(validAnagram('qwerty', 'qeywrt'))

