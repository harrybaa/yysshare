// 发布帖子
const { mysql } = require('../qcloud')
const getQueryUrl = require('../util/getQueryUrl');

module.exports = async (ctx, next) => {
  const queryUrl = getQueryUrl(ctx.request.url);

  let serviceQuery = {};

  if (queryUrl.serviceL1 !== '--') {
    serviceQuery.serviceL1 = queryUrl.serviceL1;
  }
  if (queryUrl.serviceL2 !== '--') {
    serviceQuery.serviceL2 = queryUrl.serviceL2;
  }

  const res = await mysql("yysPost").where(serviceQuery);
  const response = res.map(item => {
    const { pid, serviceL1, serviceL2, title, viewTimes } = item;
    return { pid, serviceL1, serviceL2, title, viewTimes };
  })

  // ctx.state.data = {
  //   res,
  //   queryUrl,
  //   serviceQuery
  // };
  ctx.state.data = response;
}
