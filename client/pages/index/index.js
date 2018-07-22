//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var services = require('../../utils/services')
var aboutLogin = require('../../utils/aboutLogin');

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        listData: [],
        requestResult: '',
        services: services.getServiceL1Variable(),
        serviceSelectIndex: [0, 0],
        serviceSelectArray: [services.getServiceL1Name(), services.getServiceL2List(0)],
    },

    onShow: function () {
        this.bindGetUserInfo();
        this.onFetchList();
    },

    bindGetUserInfo: function () {
        aboutLogin.login(this);
    },

    // 切换是否带有登录态
    switchRequestMode: function (e) {
        this.setData({
            takeSession: e.detail.value
        })
        this.doRequest()
    },

    doRequest: function () {
        util.showBusy('请求中...')
        var that = this
        var options = {
            url: config.service.requestUrl,
            login: true,
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success', result)
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        }
        if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
            qcloud.request(options)
        } else {    // 使用 wx.request 则不带登录态
            wx.request(options)
        }
    },

    getServiceL1: function () {
      return this.data.serviceSelectArray[0][this.data.serviceSelectIndex[0]];
    },

    getServiceL2: function () {
      return this.data.serviceSelectArray[1][this.data.serviceSelectIndex[1]];
    },

    onFetchList: function () {
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/onFetchList`,
            login: false,
            data: {
              serviceL1: that.getServiceL1(),
              serviceL2: that.getServiceL2(),
            },
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

    // 选择器index改变
    onServicesPickerChange: function (e) {
      console.log('Picker value changed: ', e.detail.value);
      this.setData({ serviceSelectIndex: e.detail.value });
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

    goPostPage: function () {
        wx.navigateTo({
            url: `../addPost/addPost?serviceL1Index=${this.data.serviceSelectIndex[0]}&serviceL2Index=${this.data.serviceSelectIndex[1]}&cid=${this.data.userInfo.openId}`
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
