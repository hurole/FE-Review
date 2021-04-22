// 数组去重 数组中可能包含对象、数组、函数
function uniqueArray(arr) {
  let container = [];
  arr.forEach(element => {
    if (container.length === 0) {
      container.push(element)
    } else {
      let s = container.some(item => {
        return compare(element, item)
      })
      if (!s) {
        container.push(element)
      }
    }
  });
  return container;
}

// 比较相等
function compare(a, b) {
  if (typeof a !== 'object') {
    if (typeof a === 'function') {
      return a.toString() === b.toString();
    }
    return a === b;
  }
  for (const key in a) {
    const aVal = a[key];
    const bVal = b[key];
    let res = compare(aVal, bVal);
    if (!res) {
      return false;
    }
  }
  return true
}
// 测试
let arr = [{ a: 12 }, { a: 12 }, 's', 1, 2, 22, 11, 2, [1, 2], [1, 2]]
let result = uniqueArray(arr);
console.log(result)