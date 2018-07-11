//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    painting: {
      
      views: [
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
          top: 0,
          left: 0,
          width: 300,
          height: 400
        },
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
          top: 100,
          left: 100,
          width: 100,
          height: 100
        },
        {
          type: 'text',
          content: '我是文字啊我是文字啊1我是文字啊我是文字啊2我是文字啊我是文字啊3我是文字啊我是文字啊4',
          breakWord: true,
          lineHeight: 20,
          fontSize: 14,
          color: 'red',
          textAlign: 'left',
          top: 20,
          left: 0,
          width: 230,
          MaxLineNumber: 2,
          bolder: true
        },
        {
          type: 'text',
          content: '我是文字啊我是文字啊1我是文字啊我是文字啊2我是文字啊我是文字啊3我是文字啊我是文字啊4',
          breakWord: true,
          lineHeight: 20,
          fontSize: 14,
          color: 'red',
          textAlign: 'left',
          top: 120,
          left: 0,
          width: 230,
          MaxLineNumber: 1
        },
        {
          type: 'rect',
          background: 'red',
          top: 100,
          left: 0,
          width: 300,
          height: 5
        },
        {
          type: 'image',
          url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
          top: 200,
          left: 100,
          width: 100,
          height: 100
        }
      ]
    }
  }
})
