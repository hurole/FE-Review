// 查找匹配项 再替换
function convert(str) {
  // 获取_a
  let result = str.match(/_([a-zA-Z])/g);
  if(!result){
      return str;
  }
  result.forEach((element) => {
    str = str.replace(element, element[1].toUpperCase());
  });
  return str;
}
let str = "Join_kube_sd";
let res = convert(str);
let res1 = convert1(str);
console.log("res", res, res1);

// 直接使用String.prototype.replace
function convert1(str) {
  function replacement(match) {
    return match[1].toUpperCase();
  }
  return str.replace(/_([a-zA-Z])/g, replacement);
}
