var util = require('../../utils/util.js')
var config = require('../../config')
Page({
  data: {
    imgUrl: "https://brownandcony-1254245823.cos.ap-shanghai.myqcloud.com/punchcard_bg.png"
  },
  onLoad: function (option) {
  },
  selectPic: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0]
        that.setData({
          imgUrl: filePath
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  commit :function(e){
    util.showShortToast("又变帅了");
    // 上传图片
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: this.data.imgUrl,
      name: 'file',

      success: function (res) {
        util.showSuccess('打卡成功')
        res = JSON.parse(res.data)
        // console.log(res)
      },

      fail: function (e) {
        util.showModel('打卡失败')
      }
    })
  }
})