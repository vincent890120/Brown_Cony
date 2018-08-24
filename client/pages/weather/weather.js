// pm2.5 浓度对应的指数等级
// 0-50 优
// 50-100 良
// 100-150 轻度污染：对敏感人群不健康
// 150-200 中度污染：不健康
// 200-300 重度污染：非常不健康
// 300-500 严重污染：有毒物
// 500以上 爆表：有毒物
let messages = require('../../data/messages.js')
let bmap = require('../../lib/bmap-wx.js')
let utils = require('../../utils/util')
let globalData = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneX: globalData.isIPhoneX,
    bcgImgList: [
      '/images/backlit-dawn-dusk-327466.jpg',
      '/images/back-view-beautiful-bloom-906002.jpg',
      '/images/afterglow-background-beautiful-552791.jpg',
      '/images/animal-aquatic-corals-847393.jpg',
      '/images/background-clouds-countryside-733031.jpg',
      '/images/beach-calm-clouds-457882.jpg',
      '/images/beautiful-cold-dawn-547115.jpg'
    ],
    bcgImgIndex: 0,
    bcgImg: '',
    bcgImgAreaShow: false,
    bcgColor: '#444',
    enableSearch: true,
    // 用来清空 input
    searchText: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setBcgImg();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  setBcgImg(index) {
    if (index) {
      this.setData({
        bcgImgIndex: index,
        bcgImg: this.data.bcgImgList[index],
      })
      return
    }
    wx.getStorage({
      key: 'bcgImgIndex',
      success: (res) => {
        let bcgImgIndex = res.data || 0
        this.setData({
          bcgImgIndex,
          bcgImg: this.data.bcgImgList[bcgImgIndex],
        })
      },
      fail: () => {
        this.setData({
          bcgImgIndex: 0,
          bcgImg: this.data.bcgImgList[0],
        })
      },
    })
  },
  commitSearch(res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '');
    console.log("查询这个城市：" + val);
  },
  showBcgImgArea() {
    this.setData({
      bcgImgAreaShow: true,
    })
  },
  hideBcgImgArea() {
    this.setData({
      bcgImgAreaShow: false,
    })
  },
})