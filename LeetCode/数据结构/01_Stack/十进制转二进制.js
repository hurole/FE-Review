const Stack = require("./Stack");

/**
 * @description 使用栈结构实现十进制转二进制，基本思路是【取模倒叙法】
 * 十进制对2取余数，保存余数，存入栈，继续
 */

function DecToBin(num) {
  const result = new Stack();
  let binStr = "";
  while (num >= 1) {
    result.push(num % 2);
    num = Math.floor(num / 2);
  }
  while (result.size() > 0) {
    binStr += result.pop();
  }
  return binStr;
}

module.exports = DecToBin;
