// 实现一个函数，判断字符串删掉一个字符是否为回文字符串，例如：输入'aa','aabbaca'返回 true。输入'abc'返回 false
function isReal(str) {
  if (str.length === 0) {
    return false;
  }
  if (str.length === 1) {
    return true;
  }
  let i = 0;
  let j = str.length - 1;
  let arr = [];
  while (i <= j) {
    if (str[i] !== str[j]) {
      if (str[i] === str[j - 1]) {
        arr.push(str[j]);
        j--;
      } else {
        arr.push(str[i]);
        i++;
      }
    } else {
      i++;
      j--;
    }
  }
  // 回文串一定可以同过删掉某一个字符 仍然是回文串
  if (arr.length <= 1) {
    return true;
  }
  return false;
}
console.log(isReal("a"));
