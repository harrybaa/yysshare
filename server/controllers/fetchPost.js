// 获取帖子详情
const {
  mysql
} = require('../qcloud')
const getQueryUrl = require('../util/getQueryUrl');

module.exports = async (ctx, next) => {
  const queryUrl = getQueryUrl(ctx.request.url);
  const { pid } = queryUrl;

  const res = await mysql("yysPost").where({ pid }).first();

  ctx.state.data = res;
}