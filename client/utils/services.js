const services = [
  [
    '--'
  ],
  [
    '云之遏',
    '松之苍',
    '桂之馥',
    '莲之净',
    '竹之幽',
    '夜之月',
    '夏之蝉',
    '兰之雅',
    '春之樱',
    '雀之羽',
  ],
  [
    '樱之华',
    '梅之寒',
    '安卓体验服',
    '风之清',
    '桃之华',
    '雨之霁',
    '秋之枫',
    '冬之雪',
    '暮之霞',
    '雀之灵',
    '菊之逸',
  ],
  [
    '迷之暗影',
    '春樱共赏',
    '永生之谜',
    '心意相通',
    '孤高之心',
    '遥远之忆',
    '相知相依',
    '情比金坚',
    '同心一意',
    '相伴相随',
    '形影不离',
    '结伴同游',
    '携手同心',
    '缥缈之旅',
    '风雨同行',
    '两情相悦',
    '抢先体验服',
  ],
  [
    '犬夜叉',
    '狐之宴',
    '初心未改',
    '鬼灯的冷彻',
    '樱之忆',
    '暖风春穗',
    '相依相偎',
    '追月逐兔',
    '欢庆鼓舞',
    '举手相庆',
    '携手共度',
    '朝夕相伴',
    '相伴长情',
    '深情厚谊',
    'B站-情谊相投',
    '旧朋新友',
    '相伴同行',
    '情深意长',
    '亲密无间',
    '两心无间'
  ],
  [
    '海外加速区',
    '港澳台区',
    '日本区',
    '欧美区',
    '泰国区',
    '越南区',
    '韩国区',
  ]
]

// const serviceL1Name = {
//   ios: 'IOS',
//   android: '安卓',
//   double: '双平台',
//   all: '全平台',
//   outland: '海外',
// }
const serviceL1Name = [
  '--',
  'IOS',
  '安卓',
  '双平台',
  '全平台',
  '海外',
];

const getServiceL1List = () => {
  return Object.keys(services);
}

// const getServiceL2List = (serviceL1) => {
//   return services[serviceL1];
// }
const getServiceL2List = (idx) => {
  return services[idx];
}

const getServiceL1Variable = () => {
  return Object.keys(services);
}

const getServiceL1Name = (serviceL1) => {
  // return serviceL1Name[serviceL1];
  return serviceL1Name;
}

module.exports = {
  getServiceL1List,
  getServiceL2List,
  getServiceL1Variable,
  getServiceL1Name,
}
