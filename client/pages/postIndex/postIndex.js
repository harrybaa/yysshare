//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var zaier = require('../../utils/zaier')

Page({
    data: {
        cid: null,
        zaierObj: zaier.getZaierObj(),
        postParam: {
            cid: null,
            title: null,
            note: null,
            serviceL1: null,
            serviceL2: null,
            ableToTransfer: false,
            zaierQty: [],
            target: null,
            viewTimes: 0,
            date: null,
        }
    },

    onLoad(option) {
        const { cid, pid } = option;

        this.setData({ cid });
        this.fetchPostParam(pid);
    },

    setQty(param) {
        const { zaierObj } = this.data;

        for(const name in param) {
            if (name.startsWith('zaier_')) {
                const zaierName = name.split('_')[1];
                zaierObj[zaierName].qty = param[name];
            }
        }
        console.log('Old param: ', param);
        console.log('New zaierObj: ', zaierObj);
        this.setData({ zaierObj });
    },

    fetchPostParam: function (pid) {
        if (!pid) {
            wx.showToast({title: '错误的请求'});
            return;
        }
        util.showBusy('请求中...');
        var that = this

        qcloud.request({
            url: `${config.service.host}/weapp/fetchPost`,
            login: true,
            data: { pid },
            success(result) {
                if (result.data && result.data.code === 0 && result.data.data) {
                    that.setData({
                        postParam: result.data.data
                    });
                    that.setQty(result.data.data);
                } else {
                    util.showModel('请求结果错误', result);
                }
            },
            fail(error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },
})