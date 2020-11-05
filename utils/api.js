/**
 * 网络请求接口 
 */
  const host  = "http://127.0.0.1:8081"

  let resultParam = {
    statusCode: 0,
    message: '',
    data: {}
  }

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


 function getCourseList(type, success){

  request({
    url: host+'/app/course/list',
    data: {
      type: type
    },
    method: 'GET'
  })
    .then((res) => {
      resultParam.data = res.data
      resultParam.statusCode = res.statusCode
      resultParam.message = res.errMsg
      success(resultParam)
    })
    .catch((err) => {
      resultParam.data = ''
      resultParam.statusCode = 111
      resultParam.message = err.errMsg
      success(resultParam)
    });
 }

 module.exports.getCourseList = getCourseList

 