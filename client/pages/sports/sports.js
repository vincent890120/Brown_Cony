var util = require('../../utils/util.js')
Page({
  data: {
  },
  onLoad: function () {
  },
  PunchCard: function (e) {
    wx.navigateTo({
      url: '../punchcard/punchcard',
    })
  }
})