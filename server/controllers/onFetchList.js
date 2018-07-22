// 发布帖子
const { mysql } = require('../qcloud')
const uuid = require('node-uuid');
const _ = require('lodash');
const getQueryUrl = require('../util/getQueryUrl');

module.exports = async (ctx, next) => {
  const queryUrl = getQueryUrl(ctx.request.url);

  let serviceQuery = {};

  if (queryUrl.serviceL1 !== '--') {
    serviceQuery.serviceL1 = decodeURI(queryUrl.serviceL1);
  }
  if (queryUrl.serviceL2 !== '--') {
    serviceQuery.serviceL2 = decodeURI(queryUrl.serviceL2);
  }

  let res = await mysql("yysPost").where(serviceQuery);

  ctx.state.data = {
    res,
    serviceQuery
  };
  ctx.state.data = res;
}
