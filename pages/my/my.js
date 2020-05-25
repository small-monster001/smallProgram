// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isLogin:false
  },
  handleLogin(){
    wx.getUserInfo({
      success:res=>{
        console.log(res.userInfo)
        let userInfo=res.userInfo
        this.setData({
          userInfo,
          isLogin:true
        })
       
      },
      complete: (res) => {
        
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})