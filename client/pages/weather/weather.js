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
      '/images/timg.jpeg',
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
    // 是否切换了城市
    cityChanged: false,
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
    this.getCityDatas();
    if (!this.data.cityChanged) {
      this.init({})
    } else {
      this.search(this.data.searchCity)
      this.setData({
        cityChanged: false,
        searchCity: '',
      })
    }
    this.setData({
      message: messages.messages(),
    })
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
  chooseBcg(e) {
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    this.setBcgImg(index)
    wx.setStorage({
      key: 'bcgImageIndex',
      data: index,
    })
  },
  //通过Storage获取城市信息
  getCityDatas() {
    let cityDatas = wx.getStorage({
      key: 'cityDatas',
      success: (res) => {
        this.setData({
          cityDatas: res.data,
        })
      },
    })
  },
  //通过百度API，获取天气信息
  init(params) {
    let BMap = new bmap.BMapWX({
      ak: globalData.ak,
    })
    BMap.weather({
      location: params.location,
      fail: this.fail,
      success: this.success,
    })
  },
  //
  success(data) {
    console.log(data) 

    this.setData({
      openSettingButtonShow: false,
    })
    wx.stopPullDownRefresh()
    let now = new Date()
    // 存下来源数据
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    let results = data.originalData.results[0] || {}
    data.pm = this.calcPM(results['pm25'])
    // 当天实时温度
    data.temperature = `${results.weather_data[0].date.match(/\d+/g)[2]}`
    wx.setStorage({
      key: 'cityDatas',
      data: data,
    })
    this.setData({
      cityDatas: data,
    })
  },
  //PM 2.5的数值对应的提示
  calcPM(value) {
    if (value > 0 && value <= 50) {
      return {
        val: value,
        desc: '优',
        detail: '',
      }
    } else if (value > 50 && value <= 100) {
      return {
        val: value,
        desc: '良',
        detail: '',
      }
    } else if (value > 100 && value <= 150) {
      return {
        val: value,
        desc: '轻度污染',
        detail: '对敏感人群不健康',
      }
    } else if (value > 150 && value <= 200) {
      return {
        val: value,
        desc: '中度污染',
        detail: '不健康',
      }
    } else if (value > 200 && value <= 300) {
      return {
        val: value,
        desc: '重度污染',
        detail: '非常不健康',
      }
    } else if (value > 300 && value <= 500) {
      return {
        val: value,
        desc: '严重污染',
        detail: '有毒物',
      }
    } else if (value > 500) {
      return {
        val: value,
        desc: '爆表',
        detail: '能出来的都是条汉子',
      }
    }
  },
})