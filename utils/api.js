/**
 * 网络请求接口 
 */
  let host;
  const wxHost = 'https://api.weixin.qq.com'

  wx.getSystemInfo({
    success: (result) => {
      console.log(result)
      if(result.platform == "devtools"){
        //开发环境
        host  = "http://127.0.0.1:8081/ft"
      }else{
        //部署环境
        host = "https://aksdj.icu/ft"
        
      }
    },
  })

  let resultParam = {
    statusCode: 0,
    message: '',
    data: {}
  }

 /**
  * 

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

/**
 * 获取课程列表
 * @param {} type 
 * @param {*} success 
 */
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

 /**
  * 获取openId
  * @param {*} appId 
  * @param {*} secret 
  * @param {*} code 
  */
 function getOpenId(appId, secret, code, complete){
  request({
    url: wxHost+'/sns/jscode2session',
    data: {
      "appId": appId,
      "secret": secret,
      "js_code": code
    },
    method: 'GET'
  })
    .then((res) => {
      complete(res)
    })
    .catch((err) => {
      // resultParam.data = ''
      // resultParam.statusCode = 111
      // resultParam.message = err.errMsg
      // complete(resultParam)
    });
 }

 /**
  * 登陆
  * @param {*} data 
  * @param {*} complete 
  */
 function login(data, complete){
   
  request({
    url: host+'/user/signIn',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    method: 'POST'
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err)
    });
 }

/**
 * 发布课程
 * @param {*} data 
 * @param {*} complete 
 */
 function postCourse(data, complete){
  request({
    url: host+'/post/course',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded" // 默认值
    },
    method: 'POST'
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err)
    });
 }

 /**
  * 获取订单列表
  * @param {*} data 
  * @param {*} complete 
  */
 function getOrderList(data, complete){
  request({
    url: host+'/order/list',
    data: data,
    method: 'GET'
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err)
    });
 }

/**
 * 文件上传
 * @param {*} data 
 * @param {*} complete 
 */
 function uploadFile(data, complete){
  wx.uploadFile({
    url: host+'/post/upload',      
    filePath: data,
    name: 'file',
    header: {  
      "Content-Type": "multipart/form-data",
      'accept': 'application/json',
    },
    success: function(res){
      complete({
        code: 200,
        data: res
      })
    },
    fail: function(res){
      complete({
        code: 500,
        data: res
      })
    },
  })

 }

/**
 * 获取课程详情
 * @param {*} data 
 * @param {*} complete 
 */
 function getCourseDetails(data, complete){
  request({
    url: host+'/app/course/details',
    data: data,
    method: 'GET'
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }

 /**
  * 获取评论列表
  * @param {*} data 
  * @param {*} complete 
  */
 function getCommentList(data, complete){
  request({
    url: host+'/comment/list',
    data: data,
    method: 'GET'
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }

 /**
  * 预约课程
  * @param {*} data 
  * @param {*} complete 
  */
 function reservationCourse(data, complete){
  request({
    url: host+'/app/course/reservation',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }
/**
 * 订单操作
 * @param {*} data 
 * @param {*} complete 
 */
 function orderDo(data, complete){
  request({
    url: host+'/order/orderDo',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }

 /**
  * 提价评论
  * @param {*} data 
  * @param {*} complete 
  */
 function commentPost(data, complete){
  request({
    url: host+'/comment/post',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }

 /**
  * 用户评论列表
  * @param {*} data 
  * @param {*} complete 
  */
 function userComment(data, complete){
  request({
    url: host+'/comment/userComment',
    data: data,
    method: 'GET',
  })
    .then((res) => {
      complete(res.data)
    })
    .catch((err) => {
      complete(err.data)
    });
 }

/**
 * 搜索课程
 * @param {*} data 
 * @param {*} complete 
 */
 function search(data, complete){
  request({
    url: host+'/app/course/search',
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
  })
    .then((res) => {
      
      complete(res.data)
    })
    .catch((err) => {
      console.log(2222)
      resultParam.status = 'fail'
      resultParam.code = 111
      resultParam.message = err.errMsg
      complete(resultParam)
    });
 }

 module.exports.getCourseList = getCourseList
 module.exports.getOpenId= getOpenId
 module.exports.login= login
 module.exports.postCourse= postCourse
 module.exports.getOrderList= getOrderList 
 module.exports.uploadFile= uploadFile
 module.exports.getCourseDetails = getCourseDetails
 module.exports.getCommentList = getCommentList
 module.exports.reservationCourse = reservationCourse
 module.exports.orderDo = orderDo
 module.exports.commentPost = commentPost
 module.exports.userComment = userComment
 module.exports.search = search
 
 
 