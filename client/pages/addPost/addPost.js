//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')



Page({
    data: {
        requestResult: '',
    },

    onPost: function () {
        util.showBusy('请求中...')
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/demo`,
            login: true,
            success (result) {
                util.showSuccess('发布成功')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },
})
