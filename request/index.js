export const request=(option)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...option,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        resolve(err)
      }
    })   
  })
}