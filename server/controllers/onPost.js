// 发布帖子
const {
  mysql
} = require('../qcloud')
const uuid = require('node-uuid');
const getQueryUrl = require('../util/getQueryUrl');

module.exports = async (ctx, next) => {
  const pid = uuid.v1();
  const queryUrl = getQueryUrl(ctx.request.url);
  const {
    cid,
    title,
    note,
    serviceL1,
    serviceL2,
    ableToTransfer
  } = queryUrl;
  const {
    zaier_DTG,
    zaier_JTTZ,
    zaier_CMTZ,
    zaier_H,
    zaier_BAH,
    zaier_GD,
    zaier_HCZZ,
    zaier_HNJ,
    zaier_HYJ,
    zaier_MLQ,
    zaier_MYL,
    zaier_NLLS,
    zaier_QXD,
    zaier_QYC,
    zaier_SF,
    zaier_SSW,
    zaier_XLN,
    zaier_XTZ,
    zaier_YDJ,
    zaier_YM,
    zaier_YML,
    zaier_YZJ,
    zaier_YZQ,
  } = queryUrl;

  const postParam = {
    pid,
    cid,
    title,
    note,
    serviceL1,
    serviceL2,
    ableToTransfer,
    zaier_DTG,
    zaier_JTTZ,
    zaier_CMTZ,
    zaier_H,
    zaier_BAH,
    zaier_GD,
    zaier_HCZZ,
    zaier_HNJ,
    zaier_HYJ,
    zaier_MLQ,
    zaier_MYL,
    zaier_NLLS,
    zaier_QXD,
    zaier_QYC,
    zaier_SF,
    zaier_SSW,
    zaier_XLN,
    zaier_XTZ,
    zaier_YDJ,
    zaier_YM,
    zaier_YML,
    zaier_YZJ,
    zaier_YZQ,
    target: 'test',
    viewTimes: 0,
    date: Math.floor(Date.now() / 1000),
  };

  await mysql("yysPost").insert(postParam);

  ctx.state.data = { pid };
}