<template>


</template>

<script>



export default {
  components: {

  },
  data() {
    return {
      qryInfo:[],
      qryId:'',
      activeIndex:'',
      qryUrl:"/ssa/blackHomePage/getBlackSearchData.do"
    }
  },
  methods: {
     async qryAll(){
        // var result = await this.common.reqBackState(this.qryUrl, {
        //   "qryId": this.qryId}, this);
        // if(result.state) {
        //   this.$message({ type: 'success', message: result.message});
        // }else {
        //   this.$message({ type: 'error', message: result.message});
        // }
      // this.$router.push({name:'blackIpInfoForm', params:row })

    },
  },
  mounted: function() {
    // var loophole = /^.*CVE.*$/;
    // var ipVerification = /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/;
    // var url = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
    // var domain = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    //   this.qryId=window.top.aa();
    // if(ipVerification.test(this.qryId)){
    //   console.log("IP地址格式!");let typ =this.common.req(this.qryUrl, {"qryId": this.qryId}, this);
    //   this.qryInfo = typ;console.log(typ);
    //   this.$router.push({name:'blackIpInfoForm', params:typ })
    // }else if(loophole.test(this.qryId)){
    //     console.log("漏洞格式!");let typ =this.common.req(this.qryUrl, {"qryId": this.qryId}, this);
    //     this.qryInfo = typ;console.log(typ);
    // }else if(domain.test(this.qryId)){
    //   console.log("domain格式!");let typ =this.common.req(this.qryUrl, {"qryId": this.qryId}, this);
    //   this.qryInfo = typ;console.log(typ);
    // }else if(url.test(this.qryId)){
    //   console.log("url地址格式");let typ =this.common.req(this.qryUrl, {"qryId": this.qryId}, this);
    //   this.qryInfo = typ;console.log(typ);
    // }else{
    //   console.log("无效");
    // }

  }
}
</script>
<style>


</style>
