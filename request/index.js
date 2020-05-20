export const request=(option)=>{
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '加载中',
    })
    const baseURL="https://api-hmugo-web.itheima.net/api/public/v1"
    wx.request({
      ...option,
      url:baseURL+option.url,
      success:(res)=>{
        resolve(res);
        wx.hideLoading()
      },
      fail:(err)=>{
        resolve(err)
      }
    })   
  })
}