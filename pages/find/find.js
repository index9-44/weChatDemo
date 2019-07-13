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
        // var i=0
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        //可实现打印name
        // do{
        //   console.log(res.data[i].name)
        //   i++
        // } while (res.data)
        
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
  

  // btnSbmit: function (e) {
  //   const db = wx.cloud.database()
  //   db.collection('userData').where({
  //     name: e.detail.value.inputName
  //   }).get({
  //     success: res => {
  //       this.setData({
  //         queryResult: JSON.stringify(res.data, null, 2)
  //       })
  //       console.log('[数据库] [查询记录] 成功: ', res)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //     }
  //   })
  // }
})