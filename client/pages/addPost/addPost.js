//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var zaier = require('../../utils/zaier');
var services = require('../../utils/services')
const getQueryUrl = require('../../utils/getQueryUrl');

Page({
    data: {
        zaierArr: zaier.getZaierArray(),
        services: services.getServiceL1Variable(),
        serviceSelectIndex: [0, 0],
        serviceSelectArray: [services.getServiceL1Name(), services.getServiceL2List(0)],
        title: '',
        note: '',
        zaierQty: new Array(23).fill(0),
        ableToTransfer: false,
    },

    onLoad(option) {
        const serviceSelectArray = this.data.serviceSelectArray;
        const serviceSelectIndex = [
            parseInt(option.serviceL1Index || 0), 
            parseInt(option.serviceL2Index || 0)
        ];
        console.log('Query: ', serviceSelectIndex);
        serviceSelectArray[1] = services.getServiceL2List(serviceSelectIndex[1]);
        this.setData({ 
            serviceSelectIndex,
            serviceSelectArray
        });
    },

    getServiceL1: function () {
        return this.data.serviceSelectArray[0][this.data.serviceSelectIndex[0]];
    },

    getServiceL2: function () {
        return this.data.serviceSelectArray[1][this.data.serviceSelectIndex[1]];
    },

    // 选择器index改变
    onServicesPickerChange: function (e) {
        console.log('Picker value changed: ', e.detail.value);
        this.setData({
            serviceSelectIndex: e.detail.value
        });
        this.onFetchList();
    },

    // 选择器值改变
    onServicesPickerColumnChange: function (e) {
        console.log('Picker column changed: ', e.detail.column, 'Picker value changed: ', e.detail.value);
        const data = {
            serviceSelectArray: this.data.serviceSelectArray,
            serviceSelectIndex: this.data.serviceSelectIndex,
        };

        data.serviceSelectIndex[e.detail.column] = e.detail.value;

        if (e.detail.column === 0) {
            data.serviceSelectIndex[1] = 0;
            data.serviceSelectArray[1] = services.getServiceL2List(e.detail.value);
        }

        this.setData(data);
    },

    onChangeTitle: function(e) {
        console.log('title: ', e.detail.value);
    },

    onChangeQtyInput: function(e) {
        console.log(e)
        const { value } = e.detail;
        const { zaierQty } = this.data;
        const { idx } = e.target.dataset;

        if (isNaN(value)) {
            wx.showToast({ title: '请输入0-999间的数字', icon: 'none' });
            return '0';
        }

        zaierQty[idx] = parseInt(value);
        this.setData({ zaierQty });

        return zaierQty[idx].toString();
    },

    onPost: function () {
        util.showBusy('请求中...');
        var that = this
        const {
            serviceL1,
            serviceL2,
            title,
            note,
            zaierQty,
            ableToTransfer
        } = this.data;
        const postParam = {
            serviceL1,
            serviceL2,
            title,
            note,
            ableToTransfer,
            ...zaierQty,
        };

        qcloud.request({
            url: `${config.service.host}/weapp/onPost`,
            login: false,
            data: {
                postParam
            },
            success(result) {
                util.showSuccess('发布成功')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail(error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },
})