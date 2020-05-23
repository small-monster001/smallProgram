// pages/goods_detail/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailParam:{
      goods_id:''
    },
    goodsDetail:{},
    previewImage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.data.goodsDetailParam.goods_id=options.goods_id; 
    this.getGoodsDetail()
  },
  // 处理图片预览函数
  handleImage(event){
    // console.log(event);
    let current=event.currentTarget.dataset.current
    let urls=this.data.previewImage.map(v=>{
      return v.pics_big
    })
    wx.previewImage({
      current,
      urls
    })
  },
  addToCart(){
    let cart=wx.getStorageSync('cart')||[];
    let idList=cart.map(v=>{
      return v.goods_id
    })
    let index=idList.findIndex(v=>v===this.data.goodsDetail.goods_id);
    console.log(index)
    if(index===-1){
      this.data.goodsDetail.num=1;
      this.data.goodsDetail.check=true;
      cart.push(this.data.goodsDetail); 
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 100
    })
  },
 
  // 请求详情页数据
  getGoodsDetail(){
    request({url:"/goods/detail",data:this.data.goodsDetailParam})
    .then((res)=>{
      console.log(res.data.message);
      this.setData({
        goodsDetail:res.data.message,
        previewImage:res.data.message.pics
      })
    })
  },
 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})