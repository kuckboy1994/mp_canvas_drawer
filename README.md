## canvas drawer

做微信小程序中最好用的 `canvas` 绘图组件之一。

当前环境下，大家都非常需要分享到朋友圈这个功能，但是实现起来各有心酸（坑比较多），所以才有了如下的 `canvas` 绘图工具。 

具有如下特性：

- 简单易用 —— 一个 `json` 搞定绘制图片
- 功能全 —— 满足 `90%` 的使用场景
  - 绘制文本（换行、超出内容省略号、中划线、下划线、文本加粗）
  - 绘制图片
  - 绘制矩形
  - 保存图片
  - ...
- 代码量小 —— 未压缩20k

## 演示

![](http://wx3.sinaimg.cn/mw690/ec4d7780gy1ft7eihf9f0g206u0bnhdw.gif)

如未正常显示，[点击查看](ttp://wx3.sinaimg.cn/mw690/ec4d7780gy1ft7eihf9f0g206u0bnhdw.gif) 

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
- 当前栗子中的 `painting` 简单展示一下。详细配置请看 [API](https://github.com/kuckboy1994/mp_canvas_drawer#API)


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

数据对象的第一层需要三个参数: `width`、`height`、`views`。当前配置中所有的数字都是没有单位的。这就意味着 `canvas` 绘制的是一个比例图。具体显示的大小直接把返回的图片路径放置到 `image` 标签中即可。

当前可以绘制3种类型的配置: `image`、`text`、`rect`。配置的属性基本上使用的都是 `css` 的驼峰名称，还是比较好理解的。 

### image（图片）
属性 | 含义 | 默认值 | 可选值
---|---|---|---
url | 绘制的图片地址 | | 
top | 左上角距离画板顶部的距离 | | 
left | 左上角距离画板左侧的距离 | | 
width | 要画多宽 | 0 | 
height | 要画多高 | 0 | 

### text（文本）
属性 | 含义 | 默认值 | 可选值
---|---|---|---
content | 绘制的图片地址 | ''（空字符串） | 
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

## TIPS

如果有什么疑问，欢迎 `issues`。 如果觉得不错，能不能送我小✨✨
