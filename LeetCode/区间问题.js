/**
 *  区间问题 
 *  区间是个对象包含两个属性 stat en 
 */

function handle(intervals) {
  let result = [];
  // 记录不能合并的区间
  let record = [];
  while (intervals.length) {
    let item = intervals.shift()
    for (let i = 0; i < intervals.length; i++) {
      let curr = intervals[i];
      if (isOverlap(item, curr)) {
        item = {
          start: item.start > curr.start ? curr.start : item.start,
          end: item.end > curr.end ? item.end : curr.end
        }
      } else {
        record.push(curr)
      }
    }
    result.push(item)
    intervals = record;
    record = [];
  }
  return result;
}
// 检测first和second是否存在重叠
function isOverlap(first, second) {
  if ((first.start > second.end) || (second.start > first.end)) {
    return false
  }
  return true;
}

// test
console.log("————————————————测试————————————————————————");
let a = { start: 1, end: 9 }
let b = { start: 2, end: 10 }
let c = { start: 11, end: 12 }
let d = { start: 12, end: 14 }
let f = { start: 5, end: 9 }

let s = handle([a, b, c, d, f])
console.log(s);