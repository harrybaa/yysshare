// 发布帖子
const { mysql } = require('../qcloud')
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  const pid = uuid.v1();
  const postParam = {
    pid,
    cid: null,
    title: null,
    note: null,
    serviceL1: null,
    serviceL2: null,
    ableToTransfer: false,
    zaier_DTG: 0,
    zaier_JTTZ: 0,
    zaier_CMTZ: 0,
    zaier_H: 0,
    target: null,
    viewTimes: 0,
    date: Date.now(),
  };
  
  if (ctx.state.$wxInfo.loginState) {
    postParam.cid = ctx.state.$wxInfo.userinfo
  } else {
    ctx.state.data = { code: -1 }
    return;
  }

  // TODO: post
  await mysql("yysPost").insert(postParam);

  ctx.state.data = { code: 0 }
}