var qcloud = require('../vendor/wafer2-client-sdk/index')

const login = (that) => {
  if (that.data.logged) return

  const session = qcloud.Session.get()

  if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
          success: res => {
              that.setData({ userInfo: res, logged: true })
              console.log('登录成功', res)
          },
          fail: err => {
              console.error(err)
              util.showModel('登录错误', err.message)
          }
      })
  } else {
      // 首次登录
      qcloud.login({
          success: res => {
              that.setData({ userInfo: res, logged: true })
              console.log('登录成功', res);
          },
          fail: err => {
              console.error(err)
              util.showModel('登录错误', err.message)
          }
      })
  }
};

module.exports = {
  login,
}