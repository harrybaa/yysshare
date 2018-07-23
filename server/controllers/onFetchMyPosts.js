// 发布帖子
const { mysql } = require('../qcloud')
const getQueryUrl = require('../util/getQueryUrl');

module.exports = async (ctx, next) => {
  const queryUrl = getQueryUrl(ctx.request.url);

  const searchQuery = {
    cid: queryUrl.cid
  };

  const res = await mysql("yysPost").where(searchQuery);
  const response = res.map(item => {
    const { pid, serviceL1, serviceL2, title, target, viewTimes } = item;
    return { pid, serviceL1, serviceL2, title, target, viewTimes };
  })

  ctx.state.data = response;
}
