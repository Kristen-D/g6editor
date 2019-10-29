<template>
  <div class="content">
<div class="container-fluid">
            <div class="el-panel">
                 <span class="left-top"></span><span class="left-bottom"></span>
                 <span class="right-top"></span><span class="right-bottom"></span>
               <div class="el-panel-body shine">
                  <ul class="search-list">
                     <li>
                      <span class="circle circle-green"></span>
                      <label>IP</label>
                      <span class="text-danger">{{blackIpInfoForm.ip}}</span>
                     </li>
                     <li>
                      <span class="circle circle-green"></span>
                      <label>国家</label>
                      <span class="">{{blackIpInfoForm.country}}</span>
                     </li>
                     <li>
                      <span class="circle circle-green"></span>
                      <label>运营商</label>
                      <span class="">{{blackIpInfoForm.operator}}</span>
                     </li>
                     <li>
                      <span class="circle circle-green"></span>
                      <label>经度</label>
                      <span class="">{{blackIpInfoForm.lgt}}</span>
                     </li>
                     <li>
                      <span class="circle circle-green"></span>
                      <label>纬度</label>
                      <span class="">{{blackIpInfoForm.lat}}</span>
                     </li>
                  </ul>
               </div>
          </div>

          <div class="el-panel">
                  	<span class="left-top"></span><span class="left-bottom"></span>
        		        <span class="right-top"></span><span class="right-bottom"></span>
                   	<div class="el-panel-body shine">
        				<el-tabs v-model="activeName" class="labeltabs tabottom m-b-40">
              					<el-tab-pane label="威胁情报" name="first">
              					    <ul class="search-list">
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>首次出现</label>
              								<span>{{blackIpInfoForm.firstSeen}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>末次出现</label>
              								<span class="">{{blackIpInfoForm.lastSeen}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>得分</label>
              								<span class="">{{blackIpInfoForm.score}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>级别</label>
              								<span class="">{{blackIpInfoForm.levelName}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>分类</label>
              								<span class="">{{blackIpInfoForm.category}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>类别</label>
              								<span class="">{{blackIpInfoForm.type}}</span>
              							 </li>
              						</ul>
              					</el-tab-pane>
              					<el-tab-pane label="端口与服务" name="second">
              						 <ul class="search-list">
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>端口</label>
              								<span>{{blackIpInfoForm.ports}}</span>
              							 </li>
              							 <li>
              								<span class="circle circle-green"></span>
              								<label>服务</label>
              								<span class="">{{blackIpInfoForm.service}}</span>
              							 </li>
              						</ul>
              					</el-tab-pane>
        				</el-tabs>
          	</div>
       </div>
</div>
</div>
</template>

<script>

export default {
  components: {},
  computed: {

  },
  data() {
    return {
      activeName:'first',
      blackIpInfoForm:'',

    }
  },
  methods: {


  },
  created: function() {
    // if (sessionStorage.blackIpInfoFormData) {
    //   this.blackIpInfoForm = JSON.parse(sessionStorage.blackIpInfoFormData);
    // }else{
    this.blackIpInfoForm = this.$route.params
    let blackIpInfo = JSON.stringify(this.blackIpInfoForm);
    sessionStorage.blackIpInfoFormData = blackIpInfo;
    // }
  },
  destroyed: function() {
    sessionStorage.removeItem('blackIpInfoFormData');
  }

}
</script>

<style scoped="">

</style>
