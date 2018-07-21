// 发布帖子
const { mysql } = require('../qcloud')
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  const pid = uuid.v1();
  const postParam = {
    pid,
    time: Math.floor(Date.now() / 1000),
  };
  
  if (ctx.state.$wxInfo.loginState) {
      ctx.state.data = ctx.state.$wxInfo.userinfo
      ctx.state.data['time'] = Math.floor(Date.now() / 1000)
  }

  // TODO: post
  await mysql("yysPost").insert(book)
}