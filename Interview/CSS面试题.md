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

## 3、介绍background属性？

### css1

- background-color
设置背景色 可以颜色名称、十六进制颜色、rgb()颜色
- background-image
设置背景图 `url('./a.png')`
- background-position
设置背景图的位置 默认值:`left top` 左上，`left`左中，`right`右中，还可以指定像素等等。
- background-repeat
设置背景图重复方式 `repeat-x`横向重复平铺 `repeat-y`纵向重复平铺 `no-repeat`不重复 `repeat`默认值横纵都重复
- background-attachment
设置背景图的附着效果，`fixed`页面滚动背景图不滚定，始终在可见范围之内，`scroll`默认值，页面滚定背景也滚动，`inherit`继承父元素相同属性的值
### css3

- background-size
设置背景图的大小，可以为
> 默认图片原始大小
> 像素 100px 120px 设置背景图的宽为100px 高为150px；
> 百分比 100% 50%设置背景图也的宽为容器的宽的100%，设置背景图的高为容器高的50%；
> 关键字 cover 等比放大或者缩小 使背景图填满容器；contain 等比放大或者缩小使图片的宽或高适应容器的宽或高，背景图在容器内部
- background-clip
规定背景图的绘制区域，默认padding-box内边距和内容区域，content-box内容区域，border-content边框到内容区域
- background-origin
背景图相对于内容框定位，border-box相对于边框盒子定位 content-box相对于内容盒子定位 padding-box相对于内边距盒子定位。