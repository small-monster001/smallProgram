export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err);
      },
      complete: (res) => {},
    })
  })
}
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success:function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err);
      },
      complete: (res) => {},
    })
  })
}
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err);
      },
      complete: (res) => {},
    })
  })
}