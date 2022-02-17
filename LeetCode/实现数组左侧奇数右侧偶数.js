/**
 * @description 实现一个方法付要求将输入的整数数组，变成奇数在左，偶数在右。
 * 要求：时间复杂度O(n),空间复杂度O(1)。思路是双指针实现。
 * @param {Number} arr
 * @returns {Array<Number>}
 */
function sortArr(arr) {
  // 左指针
  let i = 0,
    // 右指针
    j = arr.length - 1,
    // 用于交换数组元素
    temp;
  // 左右指针重合退出循环
  while (i !== j) {
    if (arr[i] % 2 === 0) {
      // 元素为偶数那么，左指针指向的元素有右指针指向的元素互换位置，此时右指针前移
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      j--;
    } else {
      // 元素为奇数 就将左指针后移
      i++;
    }
  }
  return arr;
}
let arr = [1, 2, 3, 4, 5, 6];
let res = sortArr(arr);
console.log('res', res);
