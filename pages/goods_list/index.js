// pages/goods_list/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controlItem:["综合","销量","价格"],
    currentIndex:0,
    goodsListParam:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },
    goodsList:[],
    totalPages:1
  },
 
 
  controlClick(event){
    // console.log(event)
    this.setData({
      currentIndex:event.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goodsListParam.cid=options.cid;
    this.getGoodsList();
  },
  getGoodsList(){
    request({url:"/goods/search",data:this.data.goodsListParam})
    .then(res=>{
      // console.log(res);
      this.data.totalPages=Math.ceil(res.data.message.total/this.data.goodsListParam.pagesize)
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
     
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log("下拉刷新了")
    this.setData({
      goodsList:[]
    }),
    this.data.goodsListParam.pagenum=1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("上拉触底")
    this.data.goodsListParam.pagenum=this.data.goodsListParam.pagenum+1;
    this.getGoodsList();   
  },
})