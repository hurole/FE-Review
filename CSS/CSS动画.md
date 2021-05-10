# CSS动画

## 动画相关属性

### 0.`animation`

animation属性是组合属性。animation:name duration timing-function delay iteration-count direction;

### 1.`animation-name`

由@keyframe定义的动画的名字，默认值none。

### 2.`animation-duration`

动画的播放时间，单位ms和s。默认值0，代表不播放动画。

### 3.`animation-timing-function`

动画播放的速度曲线。默认值ease，以低速快开始，在加快，结束之前再减速。

### 4.`animation-delay`

动画播放前的延迟，单位s和ms。默认0，表示立即播放动画。

### 5.`animation-iteration-count`

动画播放的次数，默认值1，播放一次。infinity一直循环播放动画。

### 6.`animation-direction`

动画播放的方向，默认值normal，从前向后播放。alternate往复播放动画。reverse反向播放动画。alternate-reverse反向开始，往复播放动画。

### 7.`animation-fill-mode`

动画阶段分为等待阶段，播放阶段和结束阶段。动画播放的第一帧样式是keyframe 0%定义的样式，最后一帧是100%时的样式。默认animate-fill-mode:none，即动画的等待阶段和结束阶段，元素的样式都为元素的原始样式。forwards即动画结束阶段元素样式为动画播放最后一帧的样式。backwards即动画等待阶段时元素的样式为动画的第一帧样式。both即动画等待阶段时元素的样式为动画的第一帧样式，动画结束阶段元素样式为动画播放最后一帧的样式。

### 8.`animation-play-state`

动画的播放状态，默认running，播放。paused暂停。通过js控制动画的播放与暂停。

## 定义关键帧@keyframe

```css
@keyframe name{
    from{
        
    }
    to{
        
    }
}
@keyframe name{
    0%{
        
    }
    100%{
        
    }
}
```