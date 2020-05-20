// pages/category/category.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    currentIndex:0,
    contentList:[],
    scrollTop:0
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryData();
  },
  getCategoryData(){
    request({url:"/categories"})
    .then(res=>{
      // console.log(res);
      this.setData({
        categoryList:res.data.message,
        contentList:res.data.message[0].children
      })
    })
  },
  itemClick(event){
    let {index}=event.currentTarget.dataset;
    console.log(index)
    let contentList=this.data.categoryList[index].children;
    this.setData({
      currentIndex:index,
      contentList:contentList,
      scrollTop:0
    })
  }
})