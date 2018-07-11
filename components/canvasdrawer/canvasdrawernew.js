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
        // console.log(newVal)
        // this.paint(newVal)
        this.paint()
      }
    }
  },
  data: {
    screenWidth: wx.getSystemInfoSync().screenWidth,
    screenHeight: wx.getSystemInfoSync().screenHeight,

    index: 0,
  },
  ctx: null,
  ready () {
    this.ctx = wx.createCanvasContext('canvasdrawer', this)
    console.log(this.ctx)
  },
  methods: {
    paint () {
      const { views } = this.data.painting
      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter)

          const promiseList = []
          for (let i = 0; i < views.length; i++) {
            if (views[i].type === 'image') {
              // const { url, top = 0, left = 0, width = 0, height = 0 } = views[i]
              // promiseList.push(new Promise((resolve, reject) => {
              //   this.getImageInfo(url).then(path => {
              //     console.log(url)
              //     this.ctx.drawImage(path, left, top, width, height)
                  
              //     resolve()
              //   })
              // }))
              // promiseList.push(this.imagePromise(views[i]))
            } else if (views[i].type === 'text') {
              promiseList.push(this.textPromise(views[i]))
            } else if (views[i].type === 'rect') {
              promiseList.push(this.rectPromise(views[i]))
            } else {

            }
          }
          console.log(promiseList)
          Promise.all(promiseList).then(() => {
            this.ctx.draw()
          })
        }
      }, 300)
    },
    imagePromise (params) {
      console.log(params)
      const { url, top = 0, left = 0, width = 0, height = 0 } = params
      // const np = new Promise((resolve, reject) => {
      //   this.getImageInfo(url).then(path => {
      //     this.ctx.drawImage(path, left, top, width, height)
      //     resolve()
      //   })
      // })
      return this.getImageInfo(url).then(path => {
        this.ctx.drawImage(path, left, top, width, height)
      })
    },
    textPromise (params) {
      console.log(params)
      const { MaxLineNumber, breakWord, color, content, fontSize, left, lineHeight, textAlign, top, width} = params
      return new Promise((resolve, reject) => {
        this.ctx.setTextAlign(textAlign)
        this.ctx.setFillStyle(color)
        this.ctx.setFontSize(fontSize)
        this.ctx.fillText(content, left, top)
        resolve()
      })
    },
    rectPromise (params) {
      console.log(params)
      const { background, top = 0, left = 0, width = 0, height = 0 } = params
      
      return new Promise((resolve, reject) => {
        this.ctx.setFillStyle(background)
        this.ctx.fillRect(left, top, width, height)
        resolve()
      })
    },
    checkType () {
      const { painting: { views }, index } = this.data
      
      if (index < views.length) {
        if (views[index].type === 'image') {
          console.log('checkType', index, views.length, views[index].type)
          this.drawImage(views[index])
          // this.setData({
          //   index: index + 1
          // })
          // this.checkType()
        } else if (views[index].type === 'text') {
          console.log('checkType', index, views.length, views[index].type)
          this.drawText(views[index])
          // this.setData({
          //   index: index + 1
          // })
          // this.checkType()
        } else if (views[index].type === 'rect') {
          console.log('checkType', index, views.length, views[index].type)
          this.drawRect(views[index])
          // this.setData({
          //   index: index + 1
          // })
          // this.checkType()
        } else {
          this.setData({
            index: index + 1
          })
          this.checkType()
        }
      }
    },
    drawImage (params) {
      console.log(params)
      const { url, top = 0, left = 0, width = 0, height = 0 } = params
      this.getImageInfo(url).then(path => {
        this.ctx.drawImage(path, left, top, width, height)
        this.ctx.draw(true, () => {
          this.setData({
            index: this.data.index + 1
          })
          this.checkType()
        })
      })
    },
    drawText (params) {
      console.log(params)
      const { MaxLineNumber, breakWord, color, content, fontSize, left, lineHeight, textAlign, top, width} = params

      this.ctx.setTextAlign(textAlign)
      this.ctx.setFillStyle(color)
      this.ctx.setFontSize(fontSize)
      this.ctx.fillText(content, left, top)
      this.ctx.draw(true, () => {
        this.setData({
          index: this.data.index + 1
        })
        this.checkType()
      })
    },
    drawRect (params) {
      console.log(params)
      const { background, top = 0, left = 0, width = 0, height = 0 } = params
      this.ctx.setFillStyle(background)
      this.ctx.fillRect(left, top, width, height)
      this.ctx.draw(true, () => {
        this.setData({
          index: this.data.index + 1
        })
        this.checkType()
      })
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
