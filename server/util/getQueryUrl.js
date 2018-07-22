const getQueryUrl = (request) => {
  let param = {};
  const paramStr = request.split('?')[1];
  const paramArray = paramStr.split('&');

  paramArray.forEach(item => {
    const arr = item.split('=');
    param[arr[0]] = arr[1];
  })

  return param;
}

module.exports = getQueryUrl;
