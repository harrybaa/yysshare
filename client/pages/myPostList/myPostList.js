//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        cid: null,
        userInfo: {},
        logged: false,
        listData: [],
        requestResult: '',
    },

    onLoad(option) {
        const { cid } = option;

        this.setData({ cid });
        this.onFetchList(cid);
    },

    onFetchList: function (cid) {
        var that = this;

        if (!cid) {
            wx.showToast({title: '登陆信息丢失'});
            return;
        }

        qcloud.request({
            url: `${config.service.host}/weapp/onFetchMyPosts`,
            login: false,
            data: { cid },
            success (result) {
                console.log('response: ', result.data);
                if (result.data && result.data.code === 0 && result.data.data) {
                    that.setData({
                        listData: result.data.data
                    })
                } else {
                    util.showModel('请求结果错误', result);
                }
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },

    goPostIndex: function (e) {
        const { pid } = e.currentTarget.dataset;
        
        console.log('Clicked pid: ', pid);
        wx.navigateTo({
            url: `../postIndex/postIndex?pid=${pid}&cid=${this.data.userInfo.openId}`
        })
    }
})
