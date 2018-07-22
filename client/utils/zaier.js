const zaier = [
  {
    id: 'YML',
    index: 0,
    name: '一目连',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'QXD',
    index: 1,
    name: '青行灯',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'YDJ',
    index: 2,
    name: '妖刀姬',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'XLN',
    index: 3,
    name: '小鹿男',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'CMTZ',
    index: 4,
    name: '茨木童子',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'YM',
    index: 5,
    name: '阎魔',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'JTTZ',
    index: 6,
    name: '酒吞童子',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'HCZZ',
    index: 7,
    name: '荒川之主',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'HYJ',
    index: 8,
    name: '辉夜姬',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'DTG',
    index: 9,
    name: '大天狗',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'H',
    index: 10,
    name: '荒',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'HNJ',
    index: 11,
    name: '花鸟卷',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'XTZ',
    index: 12,
    name: '雪童子',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'BAH',
    index: 13,
    name: '彼岸花',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'YZJ',
    index: 14,
    name: '御馔津',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'YZQ',
    index: 15,
    name: '玉藻前',
    avater: '',
    isHot: true,
    isNew: false,
  },
  {
    id: 'MLQ',
    index: 16,
    name: '面灵气',
    avater: '',
    isHot: true,
    isNew: false,
  },
  {
    id: 'SF',
    index: 17,
    name: '山风',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'NLLS',
    index: 18,
    name: '奴良陆生',
    avater: 'https://yys.res.netease.com/pc/gw/20160929201016/data/shishen/294.png',
    isHot: false,
    isNew: false,
  },
  {
    id: 'GD',
    index: 19,
    name: '鬼灯',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'MYL',
    index: 20,
    name: '卖药郎',
    avater: '',
    isHot: false,
    isNew: false,
  },
  {
    id: 'SSW',
    index: 21,
    name: '杀生丸',
    avater: '',
    isHot: false,
    isNew: true,
  },
  {
    id: 'QYC',
    index: 22,
    name: '犬夜叉',
    avater: '',
    isHot: false,
    isNew: true,
  },
]

const getZaierObj = () => {
  const result = {};
  zaier.forEach(item => {
    result[item.name] = item;
  });
  return result;
}

const getZaierArray = () => {
  return zaier;
}

module.exports = {
  getZaierArray,
  getZaierObj,
}