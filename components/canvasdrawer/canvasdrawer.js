/* global getApp Component wx */

const app = getApp()

Component({
  properties: {
    width: {
      type: Number,
      value: 640
    },
    height: {
      type: Number,
      value: 800
    },
    show: {
      type: Boolean,
      value: false
    },
    painting: {
      type: Object,
      value: {view: []},
      observer (newVal, oldVal) {
        this.readyPigment()
      }
    }
  },
  data: {
    screenWidth: wx.getSystemInfoSync().screenWidth,
    screenHeight: wx.getSystemInfoSync().screenHeight,

    index: 0,
    imageList: [],
    tempFileList: []
  },
  ctx: null,
  ready () {
    this.ctx = wx.createCanvasContext('canvasdrawer', this)
    console.log(this.ctx)
  },
  methods: {
    readyPigment () {
      const { views } = this.data.painting
      console.log(views)
      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter)
          this.getImageList(views)
          this.downLoadImages(0)
        }
      }, 300)
    },
    getImageList (views) {
      const imageList = []
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(views[i].url)
        }
      }
      this.setData({
        imageList
      })
    },
    downLoadImages (index) {
      const { imageList, tempFileList } = this.data
      if (index < imageList.length) {
        this.getImageInfo(imageList[index]).then(file => {
          tempFileList.push(file)
          this.setData({
            tempFileList
          })
          this.downLoadImages(index + 1)
        })
      } else {
        this.startPainting()
      }
    },
    startPainting () {
      const { tempFileList, painting: { views } } = this.data
      console.log(tempFileList, views)
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            url: tempFileList[imageIndex]
          })
        } else if (views[i].type === 'text') {
          this.drawText(views[i])
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i])
        }
      }
      this.ctx.draw()
    },
    drawImage (params) {
      // console.log(params)
      const { url, top = 0, left = 0, width = 0, height = 0 } = params
      this.ctx.drawImage(url, left, top, width, height)
    },
    drawText (params) {
      // console.log(params)
      const { MaxLineNumber = 2, breakWord, color, content, fontSize, left, lineHeight = 20, textAlign, top, width, bolder} = params

      this.ctx.setTextAlign(textAlign)
      this.ctx.setFillStyle(color)
      this.ctx.setFontSize(fontSize)

      let fillText = ''
      let fillTop = top
      let lineNum = 1
      for (let i = 0; i < content.length; i++) {
        fillText += [content[i]]
        if (this.ctx.measureText(fillText).width > width) {
          if (lineNum === MaxLineNumber) {
            if (i !== content.length) {
              fillText = fillText.substring(0, fillText.length - 1) + '...'
              this.ctx.fillText(fillText, left, fillTop)
              fillText = ''
              break
            }
          }
          this.ctx.fillText(fillText, left, fillTop)
          fillText = ''
          fillTop += lineHeight
          lineNum ++
        }
      }
      this.ctx.fillText(fillText, left, fillTop)
      
      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false
        })
      }
    },
    drawRect (params) {
      // console.log(params)
      const { background, top = 0, left = 0, width = 0, height = 0 } = params
      this.ctx.setFillStyle(background)
      this.ctx.fillRect(left, top, width, height)
    },
    getImageInfo (url) {
      return new Promise((resolve, reject) => {
        /* 获得要在画布上绘制的图片 */
        wx.getImageInfo({
          src: url,
          complete (res) {
            if (res.errMsg === 'getImageInfo:ok') {
              resolve(res.path)
            } else {
              reject(new Error('getImageInfo fail'))
            }
          }
        })
      })
    }
  }
})
