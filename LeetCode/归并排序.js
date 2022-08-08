// 一个数组拆分两份，保证两个数组都是
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let middleIndex = Math.floor(arr.length / 2);
  let arr1 = arr.slice(0, middleIndex);
  let arr2 = arr.slice(middleIndex);
  return merge(mergeSort(arr1), mergeSort(arr2));
}

/**
 * @description 合并两个有序数组，按照从小到大排列
 * @param {Array} arr1
 * @param {Array} arr2
 */
function merge(arr1, arr2) {
  let result = [];
  // 如果两个数组都有值，
  while (arr1.length && arr2.length) {
    if (arr1[0] <= arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift());
    }
  }
  while (arr1.length) {
    result.push(arr1.shift());
  }
  while (arr2.length) {
    result.push(arr2.shift());
  }
  return result;
}

let s = [1, 2, 3, 5, 8, 4, 11, 0, 3];
console.log(mergeSort(s));
