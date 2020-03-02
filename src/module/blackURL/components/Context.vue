<template>
  <section class="content">
     <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
 		  	<el-breadcrumb-item :to="{ path: '/' }">恶意URL</el-breadcrumb-item>
 		  	<el-breadcrumb-item>数据视图 </el-breadcrumb-item>
 		  </el-breadcrumb>
        <div class="el-panel">
        	<span class="left-top"></span><span class="left-bottom"></span>
 		      <span class="right-top"></span><span class="right-bottom"></span>
          <div class="el-panel-body shine">
         	   <div class="" style="position: relative">
                   <!-- <el-form   :inline="true" :model="params" :rules="rules" ref="params" label-width="80px" class="demo-form-inline elform"> -->
                     <el-form :model="params" :rules="rules" ref="params" label-width="80px" class="demo-form-inline elform">
                       <div v-if="!advancedFlag" style="display:inline-block;">
                     <div style="display:inline-block;">
                         <el-form-item label="" style="display:inline-block;" prop="attribute" label-width="3px" >
                               <el-select v-model="params.name" clearable placeholder="选择属性" size="mini">
                                  <el-option   v-for="item in attributes"  :key="item.value"  :label="item.label"  :value="item.value">
                                  </el-option>
                               </el-select>
                         </el-form-item>
                         <el-form-item label=""  style="display:inline-block; " label-width="20px" >
                               <el-input size="mini" v-if="params.name===''" placeholder="属性值" ></el-input>
                               <el-input size="mini" v-if="params.name==='url'" v-model="params.url" placeholder="属性值" ></el-input>
                               <el-input size="mini" v-if="params.name==='type'" v-model="params.type" placeholder="属性值" ></el-input>
                               <el-input size="mini" v-if="params.name==='source'" v-model="params.source" placeholder="属性值" ></el-input>
                               <el-select size="mini" v-if="params.name==='level'" v-model="params.level" clearable placeholder="选择属性值" >
                                  <el-option   v-for="item in levels"  :key="item.value"  :label="item.label"  :value="item.value">
                                  </el-option>
                               </el-select>
                               <el-input size="mini" v-if="params.name==='score'" v-model="params.score" placeholder="属性值" ></el-input>

                               <el-date-picker size="mini" v-if="params.name==='first_seen'" v-model="params.first_seen" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                               </el-date-picker>
                               <el-date-picker size="mini" v-if="params.name==='collect_date'" v-model="params.collect_date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                               </el-date-picker>

                         </el-form-item>
                         <el-form-item  style="display:inline-block;" prop="attribute" label-width="20px" >
                             <el-button type="deepblue"  size="mini" @click="search" >搜索</el-button>
                         </el-form-item>
                     </div>
                    </div>
                     <div v-if="advancedFlag" style="margin-top: 20px;">
                         <el-form-item label="URL"  style="display:inline-block;  ">
                           <el-input placeholder="所有URL"  clearable v-model="params.url" size="mini"></el-input>
                         </el-form-item>
                         <el-form-item label="类型" style="display:inline-block;  ">
                          <el-input placeholder="所有描述" clearable v-model="params.type" size="mini"></el-input>
                         </el-form-item>
                         <el-form-item label="来源" style="display:inline-block;  ">
                           <el-input placeholder="所有来源" clearable v-model="params.source" size="mini"></el-input>
                         </el-form-item>
                         <el-form-item label="类型" style="display:inline-block;  ">
                           <el-input placeholder="所有类型" clearable v-model="params.type" size="mini"></el-input>
                         </el-form-item>
                         <el-form-item label="等级" style="display:inline-block;  "  key="level">
                           <el-select  v-model="params.level" clearable placeholder="所有等级" size="mini">
                              <el-option   v-for="item in levels"  :key="item.value"  :label="item.label"  :value="item.value">
                              </el-option>
                           </el-select>
                         </el-form-item>
                         <el-form-item label="得分"  style="display:inline-block;  ">
                           <el-input placeholder="所有编号" clearable v-model="params.score" size="mini"></el-input>
                         </el-form-item>
                         <el-form-item label="采集时间" style="display:inline-block;  " >
                            <el-date-picker v-model="params.collect_date" type="daterange" placeholder="所有时间" size="mini" style="width:186px">
                          </el-date-picker>
                         </el-form-item>
                       </div>
                       <el-form-item   v-if="advancedFlag"  style="display:inline-block;margin-bottom:5px;margin-left:80px;" >
                         <el-button type="deepblue" size="mini"  @click="search">搜索</el-button>
                         <el-button type="deepblue" size="mini"  @click="resetForm('params')">清空</el-button>
                       </el-form-item>


              </el-form>
                       <el-button type="text" class="btn-search" id="common-search" @click="hideAdvanced" v-if="advancedFlag">普通搜索<i class="el-icon-caret-top m-l-6"></i></el-button>
                       <el-button type="text" class="btn-search "@click="showAdvanced" v-if="!advancedFlag"  id="advanced-search">高级搜索<i class="el-icon-caret-bottom m-l-6"></i></el-button>
              </div>
                      <editTable :id="tableId" :checkList="attributes" :params="params" ref="URLTable"></editTable>
          </div>
        </div>
    </div>

 </section>
</template>

<script>
import { mapState} from 'vuex'
import editTable from './BlackUrlEditTable.vue'
export default {
  components: {
    editTable

  },
  data() {

    return {
      //自定义属性
      tableId: "blackURLtable",
      urlColumns:[],
      advancedFlag: false,
      params: {
        name:'',
        pageSize:10,
        pageIndex:1,
        url:"",
        type: "",
        source:"",
        level: "",
        score: "",
        asn: "",
        collect_date:"",
        value:"",
        st: "",
        et:"",
        first_seen:'',
        firstSeenSt:'',
        firstSeenEt:''
      },
      attributes: [{ value: 'url', label: 'Url' },
                { value: 'type', label: '类型' },
                { value: 'source', label: '来源' },
                { value: 'level', label: '等级' },
                { value: 'score', label: '得分' },
                { value: 'first_seen', label: '首次出现时间' },
                { value: 'collect_date', label: '采集时间' }
      ],
      levels: [{ value: 1, label: '低' },
                { value: 2, label: '中' },
                { value: 3, label: '高' },
                { value: 4, label: '极高' },
      ],
      // rules: {
      //   attribute: [
      //     { required: true, message: '请选择属性！', trigger: 'change' },
      //   ],
      // },
    }
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
    resetForm(formName) {
      this.params = {
        name:'',
        pageSize:10,
        pageIndex:1,
        url:"",
        type: "",
        source:"",
        score: "",
        level: "",
        collect_date:"",
        first_seen:"",
        value:"",
        st: "",
        et:"",
        firstSeenSt:'',
        firstSeenEt:''
      };
    },
    search(){
         this.$refs.URLTable.loadTable();
        // this.$refs.params.validate((valid) => {
        //     if (valid) {
        //       this.params.firstSeenSt = this.common.formatDate(this.params.firstSeen[0]);
        //       this.params.firstSeenEt = this.common.formatDate(this.params.firstSeen[1]);
        //       this.params.st = this.common.formatDate(this.params.collect_date[0]);
        //       this.params.et = this.common.formatDate(this.params.collect_date[1]);
        //       this.$store.commit('setParams', [this.tableId, this.params]);
        //       this.$store.dispatch('reloadTable', this.tableId);
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
    },

    hideAdvanced(){
        this.advancedFlag = false;
    },
    showAdvanced(){
        this.advancedFlag = true;
    },

    closeDialog() {
      this.addShow = false;
      this.$refs.tree.getTree().resetFields();
    },


  },
  created:  function() {


  },
  mounted:function(){

    this.urlColumns =  this.$refs.URLTable.getTableColunms();

  }
}
</script>
