/**
 * 给定一个html代码字符串，验证html代码的合法性（标签是否闭合，标签是否对应）
 */
function valideHtml(str) {
  const reg = /<\/?[a-z,A-Z,0-9]+>/g;
  const list = str.match(reg);
  const stack = [];
  const map = {
    '<div>': '</div>',
    '<h1>': '</h1>',
    '<span>': '</span>',
  };
  for (let i = 0; i < list.length; i++) {
    if (map[list[i]]) {
      stack.push(list[i]);
    } else {
      if (map[stack.pop()] !== list[i]) {
        return false;
      }
    }
  }
  return stack.length > 0 ? false : true;
}
// 测试
let str = `
      <div>
        <h1>111</h1>
        <span>222</span>
        <div>
          <h1>333</h1>
          <span>444</span>
        </div>
      </div>
      `;
let res = valideHtml(str);
console.log(res);
