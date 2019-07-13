//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  submitform: function(e) {
    const db = wx.cloud.database()
    console.log(e.detail.value.inputName)
    console.log(e.detail.value.inputNumber)
    console.log(e.detail.value.inputAge)
    console.log(e.detail.value.inputSymptom)
    console.log(e.detail.value.inputTime)
    db.collection('userData').add({
      data: {
        name: e.detail.value.inputName,
        number: e.detail.value.inputNumber,
        age: e.detail.value.inputAge,
        symptom: e.detail.value.inputSymptom,
        time: e.detail.value.inputTime
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          userId: res._id,
          name: e.detail.value.inputName,
          number: e.detail.value.inputNumber,
          age: e.detail.value.inputAge,
          symptom: e.detail.value.inputSymptom,
          time: e.detail.value.inputTime

        })
        wx.showToast({
          title: '用户录入成功',
          icon: 'success',
          duration: 2000
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  clearInputEvent: function (res) {
    data:{
      inputValue: null
    }
    this.setData({
      'inputValue': ''
    })
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})