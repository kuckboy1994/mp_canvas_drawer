//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    painting: {},
    paintingIndex: 0,
    paintingList: [
      {
        width: 375,
        height: 555,
        clear: true,
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
      },
      {
        width: 375,
        height: 555,
        clear: true,
        views: [
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531447237017.jpeg',
            top: 0,
            left: 0,
            width: 375,
            height: 555
          }
        ]
      }
    ],
    shareImage: '',

    mode: 'normal' // cry
  },
  eventDraw () {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    const { paintingList, paintingIndex } = this.data
    this.setData({
      mode: 'normal',
      painting: paintingList[paintingIndex],
      paintingIndex: paintingIndex === 0 ? 1 : 0
    })
  },
  eventSave () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success (res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage (event) {
    wx.hideLoading()
    const { tempFilePath } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
    if (this.data.mode === 'cry') {
      this.eventDrawCry()
    }
  },
  eventDrawCry () {
    wx.showLoading({
      title: '刷新后停止绘制',
      mask: true
    })
    const { paintingList, paintingIndex } = this.data
    this.setData({
      mode: 'cry',
      painting: paintingList[paintingIndex],
      paintingIndex: paintingIndex === 0 ? 1 : 0
    })
  }
})
