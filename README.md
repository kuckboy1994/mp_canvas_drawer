## canvas drawer

新增 [mpvue_canvas_drawer](https://github.com/kuckboy1994/mpvue_canvas_drawer)。之后同步更新。

新增由[simmzl](https://github.com/simmzl)开发移植的[wepy_canvas_drawer](https://github.com/simmzl/wepy_canvas_drawer)。之后同步更新。

做微信小程序中最好用的 `canvas` 绘图组件之一。

当前环境下，大家都非常需要分享到朋友圈这个功能，但是实现起来各有心酸（坑比较多），所以才有了如下的 `canvas` 绘图工具。 

具有如下特性：

- 简单易用 —— 一个 `json` 搞定绘制图片
- 功能全 —— 满足 `90%` 的使用场景
  - 绘制文本（换行、超出内容省略号、中划线、下划线、文本加粗）
  - 绘制图片
  - 绘制矩形
  - 保存图片
  - 多图绘制
  - ...
- 代码量小

## 体验

```
git clone https://github.com/kuckboy1994/mp_canvas_drawer
```
想在手机上使用配置自己的 `appid` 即可。

编译模式中已经为你配置好比较常用的两种模式：
- 普通绘制，绘制单张分享图。
- 多图绘制，连续绘制分享图

## 演示

![](http://wx3.sinaimg.cn/mw690/ec4d7780gy1ft7eihf9f0g206u0bnhdw.gif)

左侧是 `canvasdrawer` 绘制的，右侧是UI给的图

![](http://wx2.sinaimg.cn/mw690/ec4d7780gy1ft7h2qezidj21140qw1kx.jpg)

## 使用

- `git clone https://github.com/kuckboy1994/mp_canvas_drawer` 到本地
- 把 `components` 中的 `canvasdrawer` 拷贝到自己项目下。
- 在使用页面注册组件
  ```json
  {
    "usingComponents": {
      "canvasdrawer": "/components/canvasdrawer/canvasdrawer"
    }
  }
  ```
- 在页面 `**.wxml` 文件中加入如下代码
  ```html
  <canvasdrawer painting="{{painting}}" bind:getImage="eventGetImage"/>
  ```
  `painting` 是需要传入的 `json`。 `getImage` 方法是绘图完成之后的回调函数，在 `event.detail` 中返回绘制完成的图片地址。
- 当前栗子中的 `painting` 简单展示一下。详细配置请看 [API](https://github.com/kuckboy1994/mp_canvas_drawer#api)


  <details><summary>painting（点击展开）</summary><br>

  ```js
  {
    width: 375,
    height: 555,
    views: [
      {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
        top: 0,
        left: 0,
        width: 375,
        height: 555
      },
      {
        type: 'image',
        url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
        top: 27.5,
        left: 29,
        width: 55,
        height: 55
      },
      {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
        top: 27.5,
        left: 29,
        width: 55,
        height: 55
      },
      {
        type: 'text',
        content: '您的好友【kuckboy】',
        fontSize: 16,
        color: '#402D16',
        textAlign: 'left',
        top: 33,
        left: 96,
        bolder: true
      },
      {
        type: 'text',
        content: '发现一件好货，邀请你一起0元免费拿！',
        fontSize: 15,
        color: '#563D20',
        textAlign: 'left',
        top: 59.5,
        left: 96
      },
      {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
        top: 136,
        left: 42.5,
        width: 290,
        height: 186
      },
      {
        type: 'image',
        url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
        top: 443,
        left: 85,
        width: 68,
        height: 68
      },
      {
        type: 'text',
        content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
        fontSize: 16,
        lineHeight: 21,
        color: '#383549',
        textAlign: 'left',
        top: 336,
        left: 44,
        width: 287,
        MaxLineNumber: 2,
        breakWord: true,
        bolder: true
      },
      {
        type: 'text',
        content: '￥0.00',
        fontSize: 19,
        color: '#E62004',
        textAlign: 'left',
        top: 387,
        left: 44.5,
        bolder: true
      },
      {
        type: 'text',
        content: '原价:￥138.00',
        fontSize: 13,
        color: '#7E7E8B',
        textAlign: 'left',
        top: 391,
        left: 110,
        textDecoration: 'line-through'
      },
      {
        type: 'text',
        content: '长按识别图中二维码帮我砍个价呗~',
        fontSize: 14,
        color: '#383549',
        textAlign: 'left',
        top: 460,
        left: 165.5,
        lineHeight: 20,
        MaxLineNumber: 2,
        breakWord: true,
        width: 125
      }
    ]
  }
  ```
  </details>

## API  

<details><summary>对象结构一览</summary><br>

```js
{
  width: 375,
  height: 555,
  views: [
    {
      type: 'image',
      url: 'url',
      top: 0,
      left: 0,
      width: 375,
      height: 555
    },
    {
      type: 'text',
      content: 'content',
      fontSize: 16,
      color: '#402D16',
      textAlign: 'left',
      top: 33,
      left: 96,
      bolder: true
    },
    {
      type: 'rect',
      background: 'color',
      top: 0,
      left: 0,
      width: 375,
      height: 555
    }
  ]
}
```
</details>  


数据对象的第一层需要三个参数: `width`、`height`、`mode`、`views`。配置中所有的数字都是没有单位的。这就意味着 `canvas` 绘制的是一个比例图。具体显示的大小直接把返回的图片路径放置到 `image` 标签中即可。

`mode` 可选值有 `same`, 默认值为空，常规下尽量不要使用。如要使用请看 Q&A的第1点。

当前可以绘制3种类型的配置: `image`、`text`、`rect`。配置的属性基本上使用的都是 `css` 的驼峰名称，还是比较好理解的。 

### image（图片）
属性 | 含义 | 默认值 | 可选值
---|---|---|---
url | 绘制的图片地址，可以是本地图片，如：`/images/1.jpeg` | | 
top | 左上角距离画板顶部的距离 | | 
left | 左上角距离画板左侧的距离 | | 
width | 要画多宽 | 0 | 
height | 要画多高 | 0 | 

### text（文本）
属性 | 含义 | 默认值 | 可选值
---|---|---|---
content | 绘制文本 | ''（空字符串） | 
color | 颜色 | black | 
fontSize | 字体大小 | 16 | 
textAlign | 文字对齐方式 | left | center、right 
lineHeight | 行高，只有在多行文本中才有用 | 20 | 
top | 文本左上角距离画板顶部的距离 | 0 | 
left | 文本左上角距离画板左侧的距离 | 0 | 
breakWord | 是否需要换行 | false | true 
MaxLineNumber | 最大行数，只有设置 `breakWord: true` ，当前属性才有效，超出行数内容的显示为... | 2 | 
width | 和 `MaxLineNumber` 属性配套使用，`width` 就是达到换行的宽度 |  | 
bolder | 是否加粗 | false | true 
textDecoration | 显示中划线、下划线效果 | none | underline（下划线）、line-through（中划线）

### rect (矩形，线条)
属性 | 含义 | 默认值 | 可选值
---|---|---|---
background | 背景颜色 | black | 
top | 左上角距离画板顶部的距离 | | 
left | 左上角距离画板左侧的距离 | | 
width | 要画多宽 | 0 | 
height | 要画多高 | 0 | 

## Q&A
0. 最佳实践

    绘制操作的时候最好 `锁住屏幕` ，例如在点击绘制的时候
    ```js
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    ```
    绘制完成之后
    ```js
    wx.hideLoading()
    ```
    具体可以参考项目下的 `/pages/multiple`
1. [mpvue] 由于 `canvasdrawer` 不主动呈现绘制内容，而是交给调用者去使用 `image` 来展示，所以在mpvue更新数据就会render整个组件的，之后 `canvasdrawer` 又会重新被渲染，导致无限循环，所以默认情况下我把代码改为，传入的 `painting` 和之前的一样的话，组件就不渲染了。只有出现差异的内容才会更新（触发回调），这种个人认为还是可以接受的。
    增加顶层参数 `mode`, `mode: 'same'` 为可以绘制同样的内容。在 `mpvue` 模式下`勿用`。
2. 二维码和小程序码如何绘制？
    - 二维码和小程序码可以通过调用[微信官方的接口](https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html)产生，需要后端配合。
    - 然后走 `type: image` 类型进行绘制即可。
3. 绘制流程相关
    - `views` 数组中的顺序代表绘画的先后顺序，会有覆盖的现象。请各位使用者注意。
4. 如何实现圆形头像？
    - 由于完成一些效果，例如： `文字下划线` 等。必须要使用微信小程序 `rect` 相关的接口，和 `clip` 接口感觉相处的不好（存在bug）。可以查看 [微信小程序社区的帖子](https://developers.weixin.qq.com/blogdetail?action=get_post_info&docid=00086255ef09d0df4b0751f6651000&highline=clip&token=895863755&lang=zh_CN)。
    - so，提供一种解决方式：使用一张中间镂空的图片盖在头像上。
5. `canvas drawer` 组件为什么不直接显示canvas画板和其内容呢？
    - 考虑到大部分场景，我们都是用来把图片保存到本地，或用以展示。
    - 保存到本地，返回临时文件给调用者一定是最佳的解决方式。
    - 展示，转化成图片之后，就可以使用 `image` 基础组件的所有显示模式了，还能设置宽高。

## 更新计划

- [x] 图片缓存机制 - 加快相同图片绘制的速度
- [x] 增加 `measureText` 方法对于低版本的提示
- [x] 安卓下文本绘制稳定性修复
- [ ] 增加圆角属性 `borderRadius`、`border` 支持
- [x] 错误异常回调支持
- [ ] 预缓存模式
- [ ] 优化 `measureText` 测量模式
- [x] mpvue 版本小程序

## TIPS

如果有什么疑问，欢迎 `issues`。 如果觉得不错，能不能送我小 ✨ ✨ ，让我有更多的动力。


