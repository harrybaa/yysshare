// 发布帖子
const { mysql } = require('../qcloud')
const uuid = require('node-uuid');
const _ = require('lodash');

module.exports = async (ctx, next) => {
  const serviceL1 = 'test';
  const serviceL2 = 'test';

  const res = await mysql("yysPost").where({ serviceL1, serviceL2 });

  ctx.state.data = { 
    code: 0,
    res
  }
}