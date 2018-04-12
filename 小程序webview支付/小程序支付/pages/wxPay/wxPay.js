// pages/wxPay/wxPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payParam: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('option:' + JSON.stringify(options));
    let param = decodeURIComponent(options.payParam);
    // console.log(param);
    let pay = JSON.parse(param);
    this.setData({
      payParam: pay,
    })
    console.log('payParam:' + param);
    console.log('timeStamp:' + this.data.payParam.timeStamp);
  },
  //采用小程序支付
  confirmPay: function () {
    console.log('wxpay');
    const _this = this;
    wx.requestPayment(
      {
        "timeStamp": _this.data.payParam.timeStamp,
        "package": _this.data.payParam.package,
        "paySign": _this.data.payParam.paySign,
        "signType": _this.data.payParam.signType,
        "nonceStr": _this.data.payParam.nonceStr,
        "paySign": _this.data.payParam.paySign,
         //支付成功的回调
        'success': function (res) {      
          console.log('success:' + JSON.stringify(res));
        },
        //支付失败的回调
        'fail': function (res) {
          console.log('fail:' + JSON.stringify(res));
          wx.showToast({
            title: '支付失败:' + JSON.stringify(res),
            icon: 'none',
          })

        },
        'complete': function (res) {
          console.log('complete:' + JSON.stringify(res));
        }
      })
  }

})