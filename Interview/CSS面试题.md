# CSS面试题汇总

## 1、问题：css实现一个三角形？

通过边框实现三角形。

```css
#div{
	width:100px;
    height:100px;
    border:50px solid  transparent;
    border-bottom-color: red;
    box-sizing: border-box;
}
```

## 2、介绍position属性？

position属性用于设置元素的定位类型。

- static 默认值。没有定位，处于正常的文档流中，忽略元素的top，right，bottom，left、z-index属性。
- absolute 绝对定位。相对于最近的已被定位的父级元素定位。
- relative 相对定位。相对于元素在文档流中正常位置进行定位。
- fixed 固定定位。相对浏览器窗口定位定位。
- inherit 继承。继承父级的定位属性值。
- sticky  粘性定位。元素在滚动的可视区时以relative，将要离开可视区以fixed定位。css3新增，兼容性较差。