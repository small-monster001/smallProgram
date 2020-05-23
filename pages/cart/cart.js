// pages/cart/cart.js
import {getSetting,openSetting,chooseAddress} from "../../util/asyncMethods.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    totalPrice:0,
    num:0,
    isTotal:true,
    addressInfo:{
      address:"",
      phone:"",
      name:"",
    }, 
    isShowAddress:false
  },
  // 添加地址
  addAddress(v){
  // 查看权限
   getSetting().then(res=>{
     console.log(res.authSetting["scope.address"]);
     let scopeAddress=res.authSetting["scope.address"];
     if(scopeAddress===false){
      openSetting().then(res=>{
        chooseAddress().then(res=>{
          let {addressInfo}=this.data;
          addressInfo.address=res.provinceName+res.cityName+res.countyName+res.detailInfo;
          addressInfo.phone=res.telNumber;
          addressInfo.name=res.userName;
          this.setData({
            addressInfo,
            isShowAddress:true
          })
          wx.setStorageSync('addressInfo',addressInfo)
        })  
      })  
     } else{
       chooseAddress().then(res=>{
         let {addressInfo}=this.data;
         addressInfo.address=res.provinceName+res.cityName+res.countyName+res.detailInfo;
         addressInfo.phone=res.telNumber;
         addressInfo.name=res.userName;
         this.setData({
          addressInfo,
          isShowAddress:true
         })
         wx.setStorageSync('addressInfo',addressInfo)
       })  
     }
   })
   
  
  },
  handleCheckChange(e){
    let index= this.data.cartList.findIndex(v=>v.goods_id===e.currentTarget.dataset.id)
    this.data.cartList[index].check=!this.data.cartList[index].check;
    let {cartList}=this.data;
    this.refreshInfo(cartList);
  },
  handleSubCLick(e){
    let {cartList}=this.data;
    let index=cartList.findIndex(v=>v.goods_id===e.currentTarget.dataset.id)
    if(cartList[index].num<=1){
      console.log("商品不能为空")
    }else{
      cartList[index].num--;
    }
    this.refreshInfo(cartList);
  },
  handleAddCLick(e){
    let {cartList}=this.data;
    let index=cartList.findIndex(v=>v.goods_id===e.currentTarget.dataset.id)
    this.data.cartList[index].num++;
    this.refreshInfo(cartList);
  },
  // 处理全选按钮点击
  handleTotalCLick(){
    let {cartList}=this.data; 
    let checkNum=cartList.filter(v=>{
      return v.check===true
    }).length
    if(checkNum===cartList.length){
      cartList.map(v=>{
        return v.check=!v.check
      })
      this.setData({
        isTotal:false,
        cartList
      })
    }else if(checkNum===0){
      cartList.map(v=>{
        return v.check=!v.check
      });
      this.setData({
        isTotal:true,
        cartList
      }) 
    }else{
      cartList.map(v=>{
        return v.check=true
      });
      this.setData({
        isTotal:true,
        cartList
      }) 
    }
  },
  // 处理购物车数据变化
  refreshInfo(cartList){
    this.setData({
      cartList
    })
    wx.setStorageSync('cart',cartList);
    let totalPrice=cartList.filter(res=>{
      if(res.check===true){
        return res
      }
    }).reduce((pre,cur)=>{
      return pre+cur.num*cur.goods_price
    },0);
    // 数量计算
    let num=cartList.filter(res=>{
      if(res.check===true){
        return res
      }
    }).reduce((pre,cur)=>{
      return pre+cur.num
    },0);
    // 自动显示是否全选
    let isTotal= cartList.filter(v=>{
      return v.check===false
    }).length;
    if(isTotal===0){
      this.setData({
        isTotal:true
      })
    }else{
      this.setData({
        isTotal:false
      })
    }
    this.setData({
      totalPrice,
      num
    })
    let totalInfo={totalPrice,num}
    wx.setStorageSync('totalInfo',totalInfo)
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
    this.setData({
      isShowAddress:false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let value=wx.getStorageSync('cart')||[];
    this.setData({
      cartList:value
    })
    let {cartList}=this.data;
    // console.log(this.data.cartList)
    this.refreshInfo(cartList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})