// pages/user/user.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPart:[],
    // numberFunction:null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    app.globalData.numberFunction=options._id;
    console.log(app.globalData.numberFunction)
    console.log(options._id)
    const db = wx.cloud.database()
    db.collection('userData').where({
      _id: options._id
    }).get({
      success: res => {
        that.setData({
          userPart: res.data,
          number:options._id
        })
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log("执行查询操作开始------------------")
        // console.log(number)
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  delPart: function (){
    console.log("执行删除操作")
    console.log(app.globalData.numberFunction)
    const db = wx.cloud.database()
    db.collection('userData').doc(app.globalData.numberFunction).remove({
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          duration:2000
        })
        console.log("删除成功")
        console.log(res.data)
      },
      fail:function(res){
          wx.showToast({
            title:"删除失败",
            duration:2000
          })
      }
    })

  },













// 精确查询操作
//  btnSbmit: function (e) {
//    let that=this
//     const db = wx.cloud.database()
//     db.collection('userData').where({
//       name: e.detail.value.inputName
//     }).get({
//       success: res => {
//         that.setData({
//           ne: res.data
//         })
//         this.setData({
//           queryResult: JSON.stringify(res.data, null, 2)
//         })
//         console.log(res.data)
//         console.log(this)
//         console.log('[数据库] [查询记录] 成功: ', res)
//       },
//       fail: err => {
//         wx.showToast({
//           icon: 'none',
//           title: '查询记录失败'
//         })
//         console.error('[数据库] [查询记录] 失败：', err)
//       }
//     })
//   }










/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

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

}
})