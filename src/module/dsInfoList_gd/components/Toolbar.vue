<template>
<!--工具栏 -->
  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
    <el-form  :model="queryForm" ref="queryForm" label-width="100px">
      <el-form-item label="" style="display:inline-block;" v-if="!advancedFlag">
      </el-form-item>
      <el-form-item label="" style="display:inline-block;" v-if="!advancedFlag">
       <el-input placeholder="机器IP" v-model="queryForm.ip_addr"> </el-input>
     </el-form-item>
     <el-form-item label=""  style="display:inline-block;" v-if="!advancedFlag">
       <el-input placeholder="检测名称" v-model="queryForm.detect_name"> </el-input>
     </el-form-item>
     <el-form-item label="级别" style="display:inline-block;" v-if="!advancedFlag">
       <el-select v-model="queryForm.risk_level" clearable style="width:204px;" placeholder="级别">
         <el-option v-for="item in risk_levelList" :label="item.text" :value="item.id">
         </el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="" style="display:inline-block;" v-if="!advancedFlag">
       <el-datePicker v-model="queryForm.update_date" type="date" placeholder="更新时间" >
       </el-datePicker>
     </el-form-item>
      <el-form-item style="display:inline-block;" v-if="!advancedFlag">
        <el-button type="primary" class="button-p-2" @click="qryData">搜索</el-button>
      </el-form-item>
        <div class="" v-if="advancedFlag"  style="display:inline-block;">
          <el-form-item label="" style="display:inline-block;" v-if="advancedFlag">
           <el-input placeholder="机器IP" v-model="queryForm.ip_addr"> </el-input>
         </el-form-item>
         <el-form-item label=""  style="display:inline-block;" v-if="advancedFlag">
           <el-input placeholder="检测名称" v-model="queryForm.detect_name"> </el-input>
         </el-form-item>
         <el-form-item label="" style="display:inline-block;" v-if="advancedFlag">
          <el-input placeholder="应用程序类型" v-model="queryForm.app_type"> </el-input>
        </el-form-item>
         <el-form-item label="" style="display:inline-block;" v-if="advancedFlag">
          <el-input placeholder="CVE编号" v-model="queryForm.cve"> </el-input>
        </el-form-item>
        <el-form-item label=""  style="display:inline-block;" v-if="advancedFlag">
          <el-input placeholder="CVSS版本" v-model="queryForm.cvss"> </el-input>
        </el-form-item>

          <el-form-item label="优先级" style="display:inline-block;" v-if="advancedFlag">
            <el-select v-model="queryForm.priority" clearable placeholder="优先级" @change="changeCharger()">
              <el-option v-for="item in priorityList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="级别" style="display:inline-block;">
            <el-select v-model="queryForm.risk_level" clearable style="width:204px;" placeholder="级别">
              <el-option v-for="item in risk_levelList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模式" style="display:inline-block;" v-if="advancedFlag">
            <el-select v-model="queryForm.mode" clearable placeholder="模式" @change="changeCharger()">
              <el-option v-for="item in modeList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型" style="display:inline-block;">
            <el-select v-model="queryForm.type" clearable style="width:204px;" placeholder="类型">
              <el-option v-for="item in typeList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" style="display:inline-block;" v-if="advancedFlag">
            <el-datePicker v-model="queryForm.update_date" type="date" placeholder="更新时间" >
            </el-datePicker>
          </el-form-item>


    </div>
    <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:5px;">
      <el-button type="primary" class="button-p-2" @click="qryData">搜索</el-button>
    </el-form-item>

    <div class="float-r">
      <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
        <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
      </p>
      <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
        <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
      </p>
    </div>
    </el-form>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
//import selectOrganization from 'components/selectOrganization/selectOrganization.vue'
export default {
  components: {
  //  selectOrganization
  },
  props: ["id"],
  computed: {
    ...mapState({
      // alarmTypeList:state=>state.context.alarmTypeList,
      // alarmGradeList:state=>state.context.alarmGradeList,
    })
  },
  data() {
    return {
      advancedFlag:false,
      queryForm: {
        ip_addr:"",
      	detect_name:"",
        app_type:"",
      	priority:"",
        risk_level:"",
        mode:"",
        type:"",
        cve:"",
        cvss:"",
      	update_date:null,
      },
      priorityList:[{text:"低",id:1},{text:"正常",id:2},{text:"高",id:3},{text:"最高",id:4}],
      risk_levelList:[{text:"低",id:1},{text:"正常",id:2},{text:"高",id:3},{text:"严重",id:4}],
      modeList:[{text:"仅检测",id:1},{text:"阻止",id:2}],
      typeList:[{text:"智能",id:1},{text:"入侵",id:2},{text:"漏洞",id:3}],
    }
  },
  methods: {
    showAdvanced(){
      this.advancedFlag = true;
    },

    hideAdvanced(){
      this.advancedFlag = false;
      this.queryForm.ip_addr="";
      this.queryForm.detect_name="";
      this.queryForm.app_type="";
      this.queryForm.priority="";
      this.queryForm.risk_level="";
      this.queryForm.mode="";
      this.queryForm.type="";
      this.queryForm.cve="";
      this.queryForm.cvss="";
      this.queryForm.update_date=null;

    },
    qryData() {
        this.queryForm.update_date = this.common.formatDate(this.queryForm.update_date,"yyyy-MM-dd");
        // this.queryForm.alarm_time = this.common.formatDate(this.queryForm.alarm_time_date,"yyyy-MM-dd");
        var params = this.queryForm;
        this.$store.commit('setParams', [this.id, params]);
        this.$store.dispatch('reloadTable', this.id);
    },
  },
  created: async function() {
  }
}
</script>
