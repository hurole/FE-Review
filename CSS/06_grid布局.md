# Grid布局
## 容器上的属性

## 项目属性
### grid-row-start，grid-row-end
项目上边框所在的网格线，项目下边框所在的网格线
### grid-column-start,grid-column-end
项目左边框所在的网格线，项目有边框所在的网格线
### grid-row,grid-column
grid-row：是grid-row-start和grid-row-end的简写属性。
grid-column：是grid-column-start和grid-column-end的简写属性。
`grid-row:1/2`,`grid-column:2/4`占据第一行和二三列 ，斜杠后面省略 grid-row：1 表示项目占一个格
span关键字：表示跨越多少格

### grid-area
指定项目放在哪一个区域。先要对容器指定grid-template-areas属性，为区域起名。
```css
.container{
    grid-template-areas:'a b c' 'd e f' 'g h i';
}
/* a项目放到d区域*/
.item-a{
    grid-area: d;
}
```
grid-area也可以作为 grid-row-start,grid-column-start,grid-row-end,grid-column-end
### align-self
定义单元格内容在水平上的对齐方式，同align-items类似 值：start end center stretch
### jusitify-self
定义单元格内容在垂直方向对齐方式，同jusitify-items类似 值：start end center stretch
### place-self
是jusitify-self和align-self的复合写法 place-self：[align-self] [jusitify]
