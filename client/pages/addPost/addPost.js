//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var zaier = require('../../utils/zaier');
var services = require('../../utils/services')

Page({
    data: {
        cid: null,
        zaierArr: zaier.getZaierArray(),
        zaierQty: new Array(zaier.getLength()).fill(0),
        services: services.getServiceL1Variable(),
        serviceSelectIndex: [0, 0],
        serviceSelectArray: [services.getServiceL1Name(), services.getServiceL2List(0)],
        title: '',
        note: '',
        ableToTransfer: false,
    },

    onLoad(option) {
        const serviceSelectArray = this.data.serviceSelectArray;
        const serviceSelectIndex = [
            parseInt(option.serviceL1Index || 0), 
            parseInt(option.serviceL2Index || 0)
        ];
        console.log('Query: ', serviceSelectIndex);
        serviceSelectArray[1] = services.getServiceL2List(serviceSelectIndex[0]);
        this.setData({ 
            serviceSelectIndex,
            serviceSelectArray,
            cid: option.cid,
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
        this.setData({ title: e.detail.value });
    },

    onChangeNote: function(e) {
        console.log('note: ', e.detail.value);
        this.setData({ note: e.detail.value });
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

    toZaierQtyObj: function(qtyArr) {
        const qtyObj = {};
        const { zaierArr } = this.data;

        qtyArr.forEach((ele, idx) => {
            const name = 'zaier_' + zaierArr[idx].id;
            qtyObj[name] = ele;
        })

        console.log('Converted zaierQty: ', qtyObj);
        return qtyObj;
    },

    validParam: function(param) {
        if (param.serviceL1 === '--' || param.serviceL2 === '--') {
            wx.showToast({ title: '请选择区服' });
            return false;
        }

        if (!param.title) {
            wx.showToast({ title: '取个标题吧' });
            return false;
        }

        if (!param.cid) {
            wx.showToast({ title: '登陆信息丢失' });
            return false;
        }

        return true;
    },

    onPost: function () {
        util.showBusy('请求中...');
        var that = this
        const {
            cid,
            title,
            note,
            zaierQty,
            ableToTransfer
        } = this.data;
        const postParam = {
            cid,
            serviceL1: this.getServiceL1(),
            serviceL2: this.getServiceL2(),
            title: title.replace(/(^\s*)|(\s*$)/g, ''),
            note: note.replace(/(^\s*)|(\s*$)/g, ''),
            ableToTransfer: ableToTransfer ? 1 : 0,
        };

        const zaierQtyObj = this.toZaierQtyObj(zaierQty);
        for (const name in zaierQtyObj) {
            if (zaierQtyObj[name]) {
                postParam[name] = zaierQtyObj[name];
            }
        }

        if (!this.validParam(postParam)) {
            return;
        }

        console.log('Request param: ', postParam);
        qcloud.request({
            url: `${config.service.host}/weapp/onPost`,
            login: true,
            data: {
                ...postParam
            },
            success(result) {
                util.showSuccess('发布成功')
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
                that.goPostIndex(result.data.data.pid)
            },
            fail(error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },

    goPostIndex: function (pid) {
        wx.redirectTo({
            url: `../postIndex/postIndex?pid=${pid}&cid=${this.data.cid}`
        })
    },
})