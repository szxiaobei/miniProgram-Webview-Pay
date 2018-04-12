<template>
  <div class="hello">
    <button @click="navigateToPay()">跳转回小程序</button>
  </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            isMiniProgram:false,
        };
    },
    created(){
      const _this = this;
      this.checkIsFromMiniProgram(function(res){
          _this.isMiniProgram = res;
       })
    },
    methods: {
        //判断来源是否是小程序
        checkIsFromMiniProgram: function(callback) {
            wx.miniProgram.getEnv(function(res) {
                console.log("minprogram:" + res.miniprogram); // true
                //  alert(JSON.stringify(res));
                if (res.miniprogram === true) {
                    callback && callback(true);
                    // alert('isMiniprogram:' + res.miniprogram);
                } else {
                    callback && callback(false);
                    // alert("========公众号");
                }
            });
        },
        //跳转到小程序
        navigateToMiniProgram: function(payParam) {
            const url =
                "/pages/wxPay/wxPay?payParam=" + encodeURIComponent(payParam);
            alert('url:' + url);
            wx.miniProgram.navigateTo({
                url: url
            });
        },
        //小程序和公众号跳转不同页面
        navigateToPay: function() {
            if (this.isMiniProgram === true) {
                // alert('小程序')
                //由后台协商好返回的数据格式，该代码仅供参考，不能实际使用
              const    payParam = {
                    appId: "wxd678efh567hg6787",
                    nonceStr: "5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
                    package: "prepay_id=wx2017033010242291fcfe0db70013231072",
                    signType: "MD5",
                    timeStamp: "1490840662",
                    paySign:"BB2B9BD3F2F8A1CB270C6ACE3D7BDB9"
                };
                // alert(payParam);
                this.navigateToMiniProgram(JSON.stringify(payParam));
            } else {
                alert('公众号');
                //原先支付逻辑不用修改;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
