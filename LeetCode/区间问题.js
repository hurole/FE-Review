/**
 *  区间问题leetcode 56
 *
 */

function mergeRange(intervals) {
  // 将区间按照起始值从小到大排序，获得有序区间数组
  let sortIntervals = intervals.sort((a, b) => {
    return a[0] - b[0];
  });
  // 存放不能内合并区间
  let merged = [];
  merged.push(sortIntervals.shift());
  // 循环遍历有序区间数组，如果可以合并就将合并后的区间替换merged
  sortIntervals.forEach((item) => {
    if (item[0] <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] =
        item[1] - merged[merged.length - 1][1] > 0
          ? item[1]
          : merged[merged.length - 1][1];
    } else {
      merged.push(item);
    }
  });
  return merged;
}

// test
console.log("————————————————测试————————————————————————");
let a = [1, 2];
let aa = [3, 5];
let b = [2, 10];
let c = [11, 12];
let d = [12, 14];
let f = [5, 9];

let s = mergeRange([a, aa, b, c, d, f]);
console.log(s);
