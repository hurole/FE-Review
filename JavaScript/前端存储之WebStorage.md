# WebStorage
HTML5增加的WebStorage API用于以键值对的方式存储数据，有sessionStorage和localStorage两种。
## 方法和属性
- `setItem(key,value)` 添加数据，也可以通过对象属行`localStorage[key]=value`和`sessionStorage[key]=value`添加数据
- `getItem(key)` 获取数据，也可以通过获取对象属性`localStorage[key]`和`sessionStorage[key]`获取数据
- `key(index)` 以指定索引获取数据
- `removeItem(key)` 移除数据
- `clear()` 清空数据
- `length` 属性获取数据条数
## sessionStorage
会话存储，当窗口或者标签页关闭数据就会被清除。
### 生命周期
sessionStorage当浏览器的窗口或标签页关闭，数据就会清空。但是刷新页面时sessionStorage并不会被清空。
### 作用范围
sessionStorage是同源的，即协议、域名、端口要相同。
- 在同一个标签，从当前页面跳转到同源的其他页面时，新页面和原页面数据会共享。例如：从`http://a.com:8080/a.html`跳转到`http://a.com:8080/b.html`页面，这两个页面操作的sessionStorage是同一个。
- 在同一个标签，从当前页面跳转到非同源的页面时，由于新旧页面不同源，sessionStorage互相隔离。
- 从当前页面打开一个新的标签页，标签页的地址与原页面同源，会复制原页面的sessionStorage作为新页面的sessionStorage，因为不同标签页，所以sessionStorage并不是同一份。
- 从当前页面打开一个新的标签页，标签页的地址与原页面非同源，新标签页既不会复制原页面的sessionStorage也不会与原页面共享sessionStorage。
### 存储容量
主流浏览器限制每个源的sessionStorage容量为5M
## localStorage
本地存储，数据会持久化到硬盘中，即使关闭浏览器，再次打开浏览器时数据依旧存在。
### 生命周期
长期保留，除非主动清除。
### 作用范围
localStorage是同源的，同源下的所页面都能访问到同一个的localStorage。
### 存储容量
主流浏览器限制每个源的localStorage容量为5M
### storage事件
当修改localStorage会触发storage事件，触发storage事件的标签页监听不到storage事件，其他与它同源的标签页可以监听到事件。例如：标签页a的url`http://a.com:8080/a.html`localStorage修改或添加了数据，在另一个url为`http://a.com:8080/b.html`的标签页可以监听到storage事件。
```js
window.addEventListener('storage',function(event){
  console.log("发生变动的key:",event.key);
  console.log("旧值:",event.oldValue);
  console.log("新值:",event.newValue);
  console.log("触发事件页面的url:",event.url);
  console.log("localStorage数据对象:",event.storageArea);
})
```