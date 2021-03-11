# 计算属性

计算属性是基于响应式依赖缓存的，只有当相关的响应式依赖发生变化时没计算属性才会重新求值。method是每次调用的时候都会计算一次值。

computed

```html
<script>
    export default{
        data(){
            return{
                num:12
            }
        },
        computed:{
            double:function(){
                get:function(){
                  return this.num*2;  
                },
                set:function(val){
                    this.num = val/2;
                }
            }
        }
    }
</script>
```



