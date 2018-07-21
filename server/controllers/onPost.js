// 发布帖子
const { mysql } = require('../qcloud')
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  const pid = uuid.v1();
  const postParam = {
    pid,
    cid: 'testid_001',
    title: 'test',
    note: 'test',
    serviceL1: 'test',
    serviceL2: 'test',
    ableToTransfer: false,
    zaier_DTG: 0,
    zaier_JTTZ: 0,
    zaier_CMTZ: 0,
    zaier_H: 0,
    target: 'test',
    viewTimes: 0,
    date: Math.floor(Date.now() / 1000),
  };
  
  // if (ctx.state.$wxInfo.loginState) {
  //   postParam.cid = ctx.state.$wxInfo.userinfo
  // } else {
  //   ctx.state.data = { code: -1 }
  //   return;
  // }

  console.log('About to post: ', postParam);

  await mysql("yysPost").insert(postParam);

  const res = await mysql("yysPost").where({ pid });

  ctx.state.data = { 
    code: 0,
    data: res,
  }
}