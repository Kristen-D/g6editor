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
                     <label>CVE编号</label>
                     <span class="text-danger">{{LoopholeInfo.cveid}}</span>
                    </li>
                    <li>
                     <span class="circle circle-green"></span>
                     <label>名称</label>
                     <span class="">{{LoopholeInfo.title}}</span>
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
               								<label>发布时间</label>
               								<span>{{LoopholeInfo.publish_time}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>修改时间</label>
               								<span class="">{{LoopholeInfo.collect_date}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>严重程度</label>
               								<span class="">{{LoopholeInfo.level}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>类别</label>
               								<span class="">{{LoopholeInfo.type}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>描述</label>
               								<span class="">{{LoopholeInfo.description}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>补丁</label>
               								<span class="">{{LoopholeInfo.patch}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>影响产品</label>
               								<span class="">{{LoopholeInfo.affected_product}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>参考链接</label>
               								<span class="">{{LoopholeInfo.reference_link}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>解决方案</label>
               								<span class="">{{LoopholeInfo.solution}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>发现者</label>
               								<span class="">{{LoopholeInfo.discoverer}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>验证信息</label>
               								<span class="">{{LoopholeInfo.verify_message}}</span>
               							 </li>
               							 <li>
               								<span class="circle circle-green"></span>
               								<label>漏洞附件</label>
               								<span class="">{{LoopholeInfo.attachment}}</span>
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
      LoopholeInfo:'',

    }
  },
  methods: {


  },
  created: function() {
    if (this.$route.params) {
    this.LoopholeInfo = this.$route.params
    if (this.LoopholeInfo==null) {
      this.LoopholeInfo={}
    }
    // let LoopholeInfo = JSON.stringify(this.LoopholeInfo);
    // sessionStorage.LoopholeInfoData = LoopholeInfo;
    }
  },
  destroyed: function() {
    // sessionStorage.removeItem('LoopholeInfoData');
  }

}
</script>

<style scoped="">

</style>
