// 替换s中的空格为20%
let s = "we are happy";
// 输出 we20%are20%happy

function replaceStr(str) {
  return str.replace(/\s/g, "20%");
}

let res = replaceStr(s);
console.log('res', res)