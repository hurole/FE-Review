/**
 * 统计字符串中 每个字符出现次数
 */

function computedStr(str) {
  let chartObj = {};
  for (const item of str) {
    if (chartObj[item]) {
      chartObj[item]++;
    } else {
      chartObj[item] = 1;
    }
  }
  return chartObj;
}

// test
let str = "adjkhsjkhgaksjfhgkash";
let res = computedStr(str);
console.log('res', res)
