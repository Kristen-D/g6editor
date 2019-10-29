<template>
  <div class="content" >
    <div class="container-fluid"  >
      <div class="el-panel">
       	   <span class="left-top"></span><span class="left-bottom"></span>
		   <span class="right-top"></span><span class="right-bottom"></span>
           <div class="el-panel-body shine">
          	  <ul class="search-list">
          	  	 <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>Url</label>
          	  	 	<span class="text-danger">{{urlInfoForm.url}}</span>
          	  	 </li>
          	  	  <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>IP</label>
          	  	 	<span>{{urlInfoForm.ip}}</span>
          	  	 </li>
          	  	  <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>ASN编号</label>
          	  	 	<span>{{urlInfoForm.asn}}</span>
          	  	 </li> <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>国家</label>
          	  	 	<span>{{urlInfoForm.country}}</span>
          	  	 </li>
          	  	  <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>经度</label>
          	  	 	<span>{{urlInfoForm.longitude}}</span>
          	  	 </li>
          	  	 <li>
          	  	 	<span class="circle circle-green"></span>
          	  	 	<label>纬度</label>
          	  	 	<span>{{urlInfoForm.latitude}}</span>
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
       								<label>类型</label>
       								<span>{{urlInfoForm.type}}</span>
       							 </li>
       							 <li>
       								<span class="circle circle-green"></span>
       								<label>描述</label>
       								<span class="">{{urlInfoForm.description}}</span>
       							 </li>
       							 <li>
       								<span class="circle circle-green"></span>
       								<label>黑客关联</label>
       								<span class="">{{urlInfoForm.registrant}}</span>
       							 </li>
       						</ul>
       					</el-tab-pane>
       					<el-tab-pane label="反查域名" name="second">
       						 <ul class="search-list">
       							 <li>
       								<span class="circle circle-green"></span>
       								<label>反查信息</label>
       								<span>{{urlInfoForm.lookup}}</span>
       							 </li>
       							 <li>
       								<span class="circle circle-green"></span>
       								<label>域名</label>
       								<span class="">{{urlInfoForm.domain}}</span>
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
import {mapState} from 'vuex'
import tableCommon from 'components/table/tableCommon.js'
export default {
  components: { },
    data(){
        return {
          activeName: 'first',
          urlInfoForm:{},
          advancedFlag:true,
          row:{},
          detail:false,
        }

    },
  props:['params'],
  mixins:[tableCommon],
  computed:{
    ...mapState({

   })
  },
   methods:{


//methods end
   },
   created :function() {
     if (this.$route.params) {
        this.urlInfoForm = this.$route.params;
        if (this.urlInfoForm==null) {
          this.urlInfoForm={};
        }
        // let urlInfo = JSON.stringify(this.$route.params);
        // sessionStorage.urlInfoForm = urlInfo;
      }

  }
}
</script>
