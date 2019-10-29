<template>
<div>
  <!-- <container></container> -->
  <div >
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      qryInfo:{},
      qryId:'',
      activeIndex:'',
      qryIp:"/ssa/blackHomePage/getBlackSearchData.do",
      qryUrlInfo:"/ssa/blackHomePage/qryUrlInfo.do",
      qryDomainInfo:"/ssa/blackHomePage/qryDomainInfo.do",
      qryVulInfo:"/ssa/blackHomePage/qryVulnerabilityInfo.do",
    }
  },
  mounted:async function() {
    var loophole = /^.*CVE.*$/;
    var ipVerification = /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/;
    var url = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
    var domain = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
      this.qryId=window.top.qryall();
    if(ipVerification.test(this.qryId)){
        let ip =await  this.common.req(this.qryIp, {"qryId": this.qryId}, this);
        this.qryInfo = ip;
        this.$router.push({name:'blackSearchIp', params:this.qryInfo})
    }else if(loophole.test(this.qryId)){
        let vul =await  this.common.req(this.qryVulInfo, {"qryId": this.qryId}, this);
        this.qryInfo = vul;
        this.$router.push({name:'blackSearchLoophole', params:this.qryInfo })
    }else if(domain.test(this.qryId)){
      let domain =await  this.common.req(this.qryDomainInfo, {"qryId": this.qryId}, this);
      this.qryInfo = domain;
      this.$router.push({name:'blackSearchDomain', params:this.qryInfo })
    }else if(url.test(this.qryId)){
      let url =await  this.common.req(this.qryUrlInfo, {"qryId": this.qryId}, this);
      this.qryInfo = url;
      this.$router.push({name:'blackSearchUrl', params:this.qryInfo})
    }else {
      this.$message({
          showClose: true,
          message: '所搜索数据不存在'
        });
    }
    // if(url.test(this.qryId)){
    //   console.log("url地址格式");let url =await  this.common.req(this.qryUrlInfo, {"qryId": this.qryId}, this);
    //   this.qryInfo = url;
    //   this.$router.push({name:'blackSearchUrl', params:this.this.qryInfo[0]})
    // }else{
    //   console.log("无效");
  }
}
</script>
<style>
.fadeOutLeft{
animation-duration: 0.3s;

}
.fadeInRight{
  animation-duration: 0.3s;
}
</style>
