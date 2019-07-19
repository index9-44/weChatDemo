// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPart:[]
  },
 // 精确查询操作
//  btnSbmit: function (e) {
//    let that=this
//     const db = wx.cloud.database()
//     db.collection('userData').where({
//       //这里是判断语句 判断我数据库的数据name是否等于e.detail.value.inputName(前端传过来需要查询的人)
//       name: e.detail.value.inputName
//     }).get({
//       success: res => {
//         that.setData({
//           //赋值语句，这里的userPart是我在这个page页面里面的data里定义的一个数组，为什么要定义一个数组呢？
//           //因为我下面的案例是模糊查找，既然是模糊查找，那必然不可能只查出一个数据，自然是多条数据，所以用数组来进行赋值。
//           userPart: res.data
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
  //正则查询
  btnSbmit: function (e) {
    let that = this;
    const db = wx.cloud.database()
    db.collection('userData').where({
      name:/e.detail.value.inputName/i
    })
    db.collection('userData').where({
      name:db.RegExp({
        regexp:e.detail.value.inputName,
        options:'i',
      })
    }).get({
      success: res => {
        that.setData({
          userPart: res.data
        })
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),       
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
  },
})