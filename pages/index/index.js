// index.js
// 获取应用实例
import {translate} from '../../utils/api'
const app = getApp()

Page({
  data: {
    hasShow: true,
    query: '',
    curLang: {},
    result: []
  },
  // 事件处理函数
  onLoad: function(options) {
    console.log(options)
    if(options.query) {
      this.setData({ query: options.query })
    }
  },
  onShow() {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({ curLang: app.globalData.curLang })
      this.outInput()
    }
  },
  onInput(e){
    this.setData({'query': e.detail.value})
      if(this.data.query.length > 0){
        this.setData({'hasShow': false})
      }else{
        this.setData({'hasShow': true})
      }
  },
  onTapClose(){
    this.setData({query: '', hasShow: true, result: '',})
  },
   outInput() {
    if (!this.data.query) return

    translate(this.data.query, {from: 'auto', to: this.data.curLang.lang}).then(res=>{
      this.setData({result: res.trans_result})  
      
      let history = wx.getStorageSync('history')||[]
      history.unshift({ query: this.data.query, result: res.trans_result[0].dst})
      console.log(history)
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  },
})
