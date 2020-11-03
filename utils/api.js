/**
 * 网络请求接口 
 */
  const host  = "http://127.0.0.1:8081"

 /**
 * promise请求
 * 参数：参考wx.request
 * 返回值：[promise]res
 */
function request(options = {}) {
  const {
    success,
    fail,
  } = options;

  return new Promise((res, rej) => {
    wx.request(Object.assign(
      {},
      options,
      {
        success: res,
        fail: rej,
      },
    ));
  });
}


 function getCourseList(type, success, fail){

  request({
    url: host+'/app/course/list',
    data: {
      type: type
    },
    method: 'GET'
  })
    .then((res) => {
      if(res.statusCode == 200){
        success(res.data)
      }else{
        success(res)
      }
    })
    .catch((err) => {
      fail(err)
    });
 }

 module.exports.getCourseList = getCourseList

 