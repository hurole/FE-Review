# HTML页面的生命周期

## 生命周期相关的事件

### 1. `DOMContentLoaded`

初始的HTML文档加载和解析完毕后，触发`DOMContentLoaded`事件，DOM已经生成，此时CSS样式表、图片和子框架可能尚未加载完毕。

`DOMContentLoaded`是document、window对象的事件。

### 2. `load`

页面加载完毕，触发`load`事件。此时DOM树和CSSOM树已经合成渲染树。

`load`是window对象的事件。

### 3. `beforeunload`

离开页面（刷新页面和关闭）之前，触发`beforeunload`事件。

`beforeunload`是window对象的事件。

### 4. `unload`

关闭页面后触发`unload`事件。

`unload`是window对象的事件。

