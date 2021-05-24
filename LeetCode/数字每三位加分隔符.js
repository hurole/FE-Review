/**
 * 要求：将数字转换成含有分隔符的字符串。
 * 例如：输入12345678->12,345,678
 */

function formatNumber(num) {
  // 转成字符串
  let numStr = String(num);
  if (numStr.length <= 3) {
    return numStr;
  }
  // 变成字符串数组
  let strArr = numStr.split('');
  // 定义计数器
  let counter = 0;
  let result = '';
  // 从后向前遍历数组 每三个数后面拼接一个','
  for (let i = strArr.length - 1; i >= 0; i--) {
    result += strArr[i];
    counter++;
    if (counter % 3 == 0) {
      result += ',';
    }
  }
  // 字符串转换数组，然后反转字符串，
  let s = result
    .split(',')
    .map(item => {
      return item.split('').reverse().join('');
    })
    .reverse()
    .join();
  return s;
}
// 测试
let str = formatNumber(1234567890);
console.log(str);
/**
 * 方法二，先找到第一个应该插分隔符的位置，然后向后每三个数插入一个分隔符','
*/
function formatNumber1(num) {
  // 数字转换字符串
  let numStr = String(num);
  // 字符串长度小于4，直接返回
  if (numStr <= 3) {
    return numStr;
  }
  // 正则从后开始3个数为一个分组，有若干个
  let reg = /([0-9]{3})+$/g;
  // exce获取字符串中匹配规则的起始索引 result.index
  let result = reg.exec(numStr);
  // 也可以通过String.prototype.
  let str = '';
  // 字符串转换成数组，遍历数组，数组索引对3取模，result.index是符合规则字符串的起始索引
  numStr.split('').forEach((item, index) => {
    if (index % 3 === result.index) {
      str += ',';
    }
    str += item;
  });
  return str;
}
// 测试
let str1 = formatNumber1(1234567890);
console.log(str1);