// history.js

Page({
  data: {
    history: []
  },
  onShow: function () {
    this.setData({ history: wx.getStorageSync('history')})
  },
  onTapItem: function(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`
    })
  },
})
