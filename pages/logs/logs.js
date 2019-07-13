const app = getApp()
Page({

  data: {
    userPart:[]
  },
  onLoad :function(options){
    let that = this;
    const db = wx.cloud.database()
    db.collection('userData').get({
      success: res => {
        that.setData({
          userPart: res.data
        })
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
  }
  
})
