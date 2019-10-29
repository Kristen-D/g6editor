<template>
<!--工具栏 -->
  <div :class="[advancedFlag ? 'senior-search':'senior-search', clearfloat]">
    <el-form  :model="queryForm" ref="queryForm" label-width="100px">
      <el-form-item label="事件类别" style="display:inline-block;" v-if="!advancedFlag">
        <el-select v-model="queryForm.externalIp_s" clearable  placeholder="事件类别">
          <el-option v-for="item in externalIpList" :label="item.text" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="源IP" style="display:inline-block;" v-if="!advancedFlag">
       <el-input placeholder="源IP" v-model="queryForm.src_ip"> </el-input>
     </el-form-item>
     <!-- <el-form-item label=""  style="display:inline-block;" v-if="!advancedFlag">
       <el-input placeholder="目标IP" v-model="queryForm.dst_ip"> </el-input>
     </el-form-item> -->
     <el-form-item label="开始日期" style="display:inline-block;" v-if="!advancedFlag">
       <el-datePicker v-model="queryForm.startTime_date" type="date" placeholder="告警开始日期" >
       </el-datePicker>
     </el-form-item>
     <el-form-item label="结束日期" style="display:inline-block;" v-if="!advancedFlag">
       <el-datePicker v-model="queryForm.endTime_date" type="date" placeholder="告警结束日期" >
       </el-datePicker>
     </el-form-item>
     <!-- <div class="" v-if="!advancedFlag"  style="display:inline-block;">
        <el-form-item style="display:inline-block;margin-bottom:5px;" class="" v-if="!advancedFlag">
          <el-button type="primary" class="button-p-2"  @click="qryData">搜索</el-button>
          <el-button type="primary" class="button-p-2"  @click="exportReport">导出</el-button>
        </el-form-item>
    </div> -->
        <div class="" v-if="advancedFlag"  style="display:inline-block;">
          <!-- <el-form-item  style="display:inline-block;" label="告警类型" v-if="advancedFlag">
            <el-select v-model="queryForm.alarm_type" clearable placeholder="告警类型">
              <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="事件类别" style="display:inline-block;" v-if="advancedFlag">
            <el-select v-model="queryForm.externalIp_s" clearable placeholder="事件类别" @change="changeCharger()">
              <el-option v-for="item in externalIpList" :label="item.text" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="源IP区域" style="display:inline-block;" v-if="advancedFlag">
            <el-select v-model="queryForm.src_country_name"  filterable clearable style="width:204px;" placeholder="请选择源IP区域">
              <el-option v-for="item in srcData" :label="item.ipSourceName" :value="item.ipSourceName">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="源IP区域" style="display:inline-block;">
            <el-input placeholder="源IP区域" v-model="queryForm.src_country_name"> </el-input>
          </el-form-item> -->
          <el-form-item label="省内区域" style="display:inline-block;"  v-if="advancedFlag">
            <el-select v-model="queryForm.src_city_name" filterable clearable style="width:204px;" placeholder="请选择区域">
              <el-option v-for="item in orgInfoData" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="资产" style="display:inline-block;" v-if="advancedFlag">
            <el-select v-model="queryForm.asset_id" clearable style="width:204px;" placeholder="请选择资产">
              <el-option v-for="item in amassetInfoData" :label="item.assetName" :value="item.assetId">
              </el-option>
            </el-select>
          </el-form-item> -->

      <el-form-item label="风险级别" style="display:inline-block;">
        <el-select v-model="queryForm.alarm_grade" clearable style="width:204px;" placeholder="告警等级">
          <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="资产" style="display:inline-block;">
        <el-input placeholder="只支持完全匹配" v-model="queryForm.asset_id"> </el-input>
      </el-form-item>

       <el-form-item label="源IP" style="display:inline-block;">
        <el-input placeholder="源IP" v-model="queryForm.src_ip"> </el-input>
      </el-form-item>

      <el-form-item label="目标IP"  style="display:inline-block;">
        <el-input placeholder="目标IP" v-model="queryForm.dst_ip"> </el-input>
      </el-form-item>

      <el-form-item label="事件ID"  style="display:inline-block;">
        <el-input placeholder="事件ID" v-model="queryForm.event_id"> </el-input>
      </el-form-item>

      <el-form-item label="设备IP"  style="display:inline-block;">
        <el-input placeholder="设备IP" v-model="queryForm.device_ip"> </el-input>
      </el-form-item>

      <el-form-item label="告警内容"  style="display:inline-block;">
        <el-input placeholder="告警内容" v-model="queryForm.alarm_desc"> </el-input>
      </el-form-item>
      <!-- <el-form-item label="状态" style="display:inline-block;">
        <el-select v-model="queryForm.status"  placeholder="状态">
          <el-option   label="未处理" value="0">
          </el-option>
          <el-option   label="待审核" value="0">
          </el-option>
          <el-option   label="待处理" value="1">
          </el-option>
          <el-option   label="已完成" value="2">
          </el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="告警时间" style="display:inline-block;">
        <el-datePicker v-model="queryForm.alarm_time_date" type="date" placeholder="告警时间" >
        </el-datePicker>
      </el-form-item> -->
      <el-form-item label="开始日期" style="display:inline-block;">
        <el-datePicker v-model="queryForm.startTime_date" type="date" placeholder="告警开始日期" >
        </el-datePicker>
      </el-form-item>
      <el-form-item label="结束日期" style="display:inline-block;">
        <el-datePicker v-model="queryForm.endTime_date" type="date" placeholder="告警结束日期" >
        </el-datePicker>
      </el-form-item>
    </div>
    <el-form-item  style="display:inline-block;margin-bottom:5px;">
      <el-button type="primary" class="button-p-2" @click="qryData">搜索</el-button>
        <el-button type="primary" class="button-p-2" @click="exportReport">导出</el-button>
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
      alarmTypeList:state=>state.context.alarmTypeList,
      alarmGradeList:state=>state.context.alarmGradeList,
    })
  },
  data() {
    return {
      advancedFlag:false,
      amassetInfoData:[],
      orgInfoData:[],
      countyData:["阿富汗","安哥拉","阿尔巴尼亚","阿联酋","阿根廷","亚美尼亚","法属南半球和南极领地","澳大利亚","奥地利","阿塞拜疆","布隆迪","比利时","贝宁","布基纳法索","孟加拉国","保加利亚","巴哈马","波斯尼亚和黑塞哥维那","白俄罗斯","伯利兹","百慕大","玻利维亚","巴西","文莱",
      "不丹","博茨瓦纳","中非共和国","加拿大","瑞士","智利","中国","象牙海岸","喀麦隆","刚果民主共和国","刚果共和国","哥伦比亚","哥斯达黎加","古巴","北塞浦路斯","塞浦路斯","捷克共和国","德国","吉布提","丹麦","多明尼加共和国","阿尔及利亚","厄瓜多尔","埃及","厄立特里亚",
      "西班牙","爱沙尼亚","埃塞俄比亚","芬兰","斐","福克兰群岛","法国","加蓬","英国","格鲁吉亚","加纳","几内亚","冈比亚","几内亚比绍","赤道几内亚","希腊","格陵兰","危地马拉","法属圭亚那","圭亚那","洪都拉斯","克罗地亚","海地","匈牙利","印尼",
      "印度","爱尔兰","伊朗","伊拉克","冰岛","以色列","意大利","牙买加","约旦","日本","哈萨克斯坦","肯尼亚","吉尔吉斯斯坦","柬埔寨","韩国","科索沃","科威特","老挝","黎巴嫩","利比里亚","利比亚","斯里兰卡","莱索托","立陶宛","卢森堡",
      "拉脱维亚","摩洛哥","摩尔多瓦","马达加斯加","墨西哥","马其顿","马里","缅甸","黑山","蒙古","莫桑比克","毛里塔尼亚","马拉维","马来西亚","纳米比亚","新喀里多尼亚","尼日尔","尼日利亚","尼加拉瓜","荷兰","挪威","尼泊尔","新西兰","阿曼","巴基斯坦",
      "巴拿马","秘鲁","菲律宾","巴布亚新几内亚","波兰","波多黎各","北朝鲜","葡萄牙","巴拉圭","卡塔尔","罗马尼亚","俄罗斯","卢旺达","西撒哈拉","沙特阿拉伯","苏丹","南苏丹","塞内加尔","所罗门群岛","塞拉利昂","萨尔瓦多","索马里兰","索马里","塞尔维亚共和国","苏里南",
      "斯洛伐克","斯洛文尼亚","瑞典","斯威士兰","叙利亚","乍得","多哥","泰国","塔吉克斯坦","土库曼斯坦","东帝汶","特里尼达和多巴哥","突尼斯","土耳其","坦桑尼亚联合共和国","乌干达","乌克兰","乌拉圭","美国","乌兹别克斯坦","委内瑞拉","越南","瓦努阿图","西岸","也门",
      "南非","赞比亚","津巴布韦","印度尼西亚","香港","中国香港"],
      srcData:[],
      externalIpList:[{text:"内部安全事件",id:'0'},{text:"外部安全事件",id:'1'}],
      queryForm: {
        alarm_type:"",
      	alarm_grade:"",
        externalIp_s:"",
      	src_ip:"",
        asset_id:"",
        event_id:"",
        device_ip:"",
        src_country_name:"",
        src_city_name:"",
      	dst_ip:"",
      	user_id:"",
      	alarm_desc:"",
      	org_id:"",
        start_time:null,
        startTime_date:null,
        end_time:null,
        endTime_date:null,
      	alarm_time:null,
        alarm_time_date:null,
        product_type:""
      },
    }
  },
  methods: {
    showAdvanced(){
      this.advancedFlag = true;
    },
    async changeCharger(){
      var param={};
      param.externalIp_s = this.queryForm.externalIp_s;
      var recordData = await this.common.req("/ssa/screenExhibit/getEventSrcIpOnMap_GD.do",param,this);
      this.srcData = recordData.result;
    },
    hideAdvanced(){
      this.advancedFlag = false;
      this.queryForm.alarm_type="";
      this.queryForm.alarm_grade="";
      this.queryForm.externalIp_s="";
      this.queryForm.src_ip="";
      this.queryForm.asset_id="";
      this.queryForm.src_country_name="";
      this.queryForm.src_city_name="";
      this.queryForm.dst_ip="";
      this.queryForm.user_id="";
      this.queryForm.alarm_desc="";
      this.queryForm.start_time="";
      this.queryForm.end_time="";
      this.queryForm.alarm_time="";
      this.queryForm.startTime_date=null;
      this.queryForm.endTime_date=null;
      this.queryForm.alarm_time_date=null;
      this.queryForm.org_id="";
      this.queryForm.product_type="";
    },
    qryData() {
        // this.queryForm.alarm_time = this.common.formatDate(this.queryForm.alarm_time_date,"yyyy-MM-dd");
        // if(this.queryForm.externalIp_s==1 && this.queryForm.src_city_name!=""){
        //   this.$alert('外部安全事件不能和省内区域查询条件同时选!', '警告', {
        //     type: "warning"
        //   });
        //   return;
        // }

        // if(this.queryForm.externalIp_s==0 && this.queryForm.src_country_name!=""){
        //   this.$alert('内部安全事件不能和国家查询条件同时选!', '警告', {
        //     type: "warning"
        //   });
        //   return ;
        // }
        //
        // if (this.queryForm.externalIp_s=='' && (this.queryForm.src_country_name!="" && this.queryForm.src_city_name!="")){
        //   this.$alert('区域和国家查询条件不能同时选!', '警告', {
        //     type: "warning"
        //   });
        //   return ;
        // }
        // if (this.queryForm.externalIp_s=='' && this.queryForm.src_country_name!=""){
        //   this.queryForm.externalIp_s=1;
        // }
        //
        this.queryForm.start_time = this.common.formatDate(this.queryForm.startTime_date,"yyyy-MM-dd");
        this.queryForm.end_time = this.common.formatDate(this.queryForm.endTime_date,"yyyy-MM-dd");
        if (this.queryForm.externalIp_s=='' && this.queryForm.src_country_name!=""){
          this.$alert('按源IP区域查询必须选事件类别!', '警告', {
             type: "warning"
           });
           return ;
        }
        // this.queryForm.alarm_time = this.common.formatDate(this.queryForm.alarm_time_date,"yyyy-MM-dd");
        var params = this.queryForm;
        this.$store.commit('setParams', [this.id, params]);
        this.$store.dispatch('reloadTable', this.id);
    },
    exportReport() {
      var param = "exportFileName=" + "告警信息表";
      //var params = this.queryForm;
      if (this.queryForm.alarm_time != null && this.queryForm.alarm_time != "") {
        param = param + "&alarm_time=" + this.queryForm.alarm_time;
      }

      if (this.queryForm.alarm_grade != null && this.queryForm.alarm_grade != "") {
        param = param + "&alarm_grade=" + this.queryForm.alarm_grade;
      }


      if (this.queryForm.externalIp_s != null && this.queryForm.externalIp_s != "") {
        param = param + "&externalIp_s=" + this.queryForm.externalIp_s;
      }

      if (this.queryForm.asset_id != null && this.queryForm.asset_id != "") {
        param = param + "&asset_id=" + this.queryForm.asset_id;
      }

      if (this.queryForm.src_country_name != null && this.queryForm.src_country_name != "") {
        param = param + "&src_country_name=" + this.queryForm.src_country_name;
      }

      if (this.queryForm.src_city_name != null && this.queryForm.src_city_name != "") {
        param = param + "&src_city_name=" + this.queryForm.src_city_name;
      }

      if (this.queryForm.dst_ip != null && this.queryForm.dst_ip != "") {
        param = param + "&dst_ip=" + this.queryForm.dst_ip;
      }

      if (this.queryForm.src_ip != null && this.queryForm.src_ip != "") {
        param = param + "&src_ip=" + this.queryForm.src_ip;
      }
      if(this.id=='dotableId'){
          param = param + "&finished=finished";
      }else if (this.id=='hisdotableId'){
          param = param + "&finished=finished1&historyed=1";
      }else{
          param = param + "&running=running";
      }
      //alert(params);
      window.location.href = "/ssa/alarmInfoList/exportReport.do?" + param;
    },
  },
  created: async function() {
    // this.amassetInfoData = await this.common.req("/ssa/alarmInfoList/getAmassetInfo.do", null, this);
    this.orgInfoData = await this.common.req("/ssa/alarmInfoList/getOrgInfo.do", null, this);
    var param={};
    param.externalIp_s="2";
    var recordData = await this.common.req("/ssa/screenExhibit/getEventSrcIpOnMap_GD.do",param,this);

    this.srcData = recordData.result;

  }
}
</script>
