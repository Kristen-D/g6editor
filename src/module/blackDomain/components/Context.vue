<template>
<section class="content">
<div class="container-fluid">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item >恶意Domain</el-breadcrumb-item>
        <el-breadcrumb-item>数据视图 </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-panel">
                <span class="left-top"></span><span class="left-bottom"></span>
                <span class="right-top"></span><span class="right-bottom"></span>
                <div class="el-panel-body shine">
                    <div class="" style="position: relative">
                        <el-form :model="params" :rules="rules" ref="params" label-width="80px" class="demo-form-inline elform">
                                <div v-if="!advancedFlag" style="display:inline-block;">
                                      <div style="display:inline-block;">
                                          <el-form-item label="" style="display:inline-block;" prop="attribute" class="test" label-width="3px" >
                                                <el-select v-model="params.attribute" clearable placeholder="选择属性" size="mini" >
                                                   <el-option   v-for="item in attributes"  :key="item.value"  :label="item.label"  :value="item.value">
                                                   </el-option>
                                                </el-select>
                                          </el-form-item>
                                          <el-form-item label=""  style="display:inline-block; "  label-width="20px">
                                                <el-input size="mini" v-if="params.attribute===''" placeholder="属性值" ></el-input>
                                                <el-input size="mini" v-if="params.attribute==='domain'" v-model="params.domain" placeholder="属性值" ></el-input>
                                                <!-- <el-select size="mini" v-if="params.attribute==='type'" v-model="params.category" clearable placeholder="选择属性值" >
                                                   <el-option   v-for="item in categorys"  :key="item.value"  :label="item.label"  :value="item.value">
                                                   </el-option>
                                                </el-select> -->
                                                <el-input size="mini" v-if="params.attribute==='type'" v-model="params.type" placeholder="属性值" ></el-input>
                                                <el-input size="mini" v-if="params.attribute==='source'" v-model="params.source" placeholder="属性值" ></el-input>
                                                <el-select size="mini" v-if="params.attribute==='level'" v-model="params.level" clearable placeholder="选择属性值" >
                                                   <el-option   v-for="item in levels"  :key="item.value"  :label="item.label"  :value="item.value">
                                                   </el-option>
                                                </el-select>
                                                <el-input size="mini" v-if="params.attribute==='score'" v-model="params.score" placeholder="属性值" ></el-input>

                                                <el-date-picker size="mini" v-if="params.attribute==='firstSeen'" v-model="params.firstSeen" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                                                </el-date-picker>
                                                <el-date-picker size="mini" v-if="params.attribute==='lastSeen'" v-model="params.lastSeen" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                                                </el-date-picker>

                                          </el-form-item>
                                          <el-form-item style="display:inline-block; " label-width="20px">
                                                  <el-button type="deepblue" size="mini" @click="search" >搜索</el-button>
                              					  </el-form-item>
                                      </div>

                                </div>

                                <div class="" v-if="advancedFlag" style="margin-top: 20px;">
                                  <div style="display:inline-block;">
                                      <el-form-item label="域名" style="display:inline-block;"  key='domain' >
                                        <el-input size="mini" v-model="params.domain" placeholder="所有域名"></el-input>
                                      </el-form-item>
                                      <!-- <el-form-item label="类型" style="display:inline-block;  "  key="category">
                                          <el-select size="mini" v-model="params.category" clearable placeholder="所有类型" > <el-option
                                            v-for="item in categorys"  :key="item.category"  :label="item.type"  :value="item.category">
                                           </el-option>
                                          </el-select>
                                      </el-form-item> -->
                                      <el-form-item label="类型" style="display:inline-block;"class="test" key='type'>
                                          <el-input size="mini" v-model="params.type" placeholder="类型" ></el-input>
                                      </el-form-item>
                                      <el-form-item label="来源" style="display:inline-block; "  key="source">
                                        <el-input size="mini" v-model="params.source" placeholder="所有来源"></el-input>
                                      </el-form-item>
                                      <el-form-item label="等级" style="display:inline-block;  "  key="level">
                                        <el-select size="mini"  v-model="params.level" clearable placeholder="所有等级" >
                                           <el-option   v-for="item in levels"  :key="item.value"  :label="item.label"  :value="item.value">
                                           </el-option>
                                        </el-select>
                                      </el-form-item>
                                      <el-form-item label="得分" style="display:inline-block; "  key="score">
                                        <el-input size="mini" v-model="params.score" placeholder="所有得分"></el-input>
                                      </el-form-item>
                                      <el-form-item label="首次时间" style="display:inline-block;  "  key="firstSeen">
                                        <el-date-picker size="mini"  v-model="params.firstSeen" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                                        </el-date-picker>
                                      </el-form-item>
                                      <el-form-item label="末次时间" style="display:inline-block;  "  key="lastSeen">
                                          <el-date-picker size="mini"  v-model="params.lastSeen" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                                          </el-date-picker>
                                      </el-form-item>
                                    </div>
                                </div>


                          <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:5px;">
                            <el-button type="deepblue" size="mini" @click="search">搜索</el-button>
                            <el-button type="deepblue" size="mini" @click="resetForm('params')">清空</el-button>
                          </el-form-item>

                        </el-form>
                        <el-button type="text"  @click="hideAdvanced" v-if="advancedFlag" class="btn-search ">普通搜索<i class="el-icon-caret-top m-l-6"></i></el-button>
				                 <el-button type="text" @click="showAdvanced" v-if="!advancedFlag" class="btn-search">高级搜索<i class="el-icon-caret-bottom m-l-6"></i></el-button>
                    </div>


                          <editTable :checkList="attributes" :id="tableId"></editTable>

              </div>
    </div>
</div>
</section>
</template>

<script>
import editTable from './BlackDomainEditTable.vue'

export default {
  components: {
    editTable,
  },
  computed: {

  },
  data() {

    return {
      tableId: 'blackDomainInfoTable',
      params: {
        attribute:'',
        domain: '',
        category: '',
        source: '',
        level: '',
        score:'',
        firstSeen:'',
        lastSeen:'',
        type:'',

      },
      attributes: [{ value: 'domain', label: '域名' },
                { value: 'type', label: '类型' },
                { value: 'source', label: '来源' },
                { value: 'level', label: '等级' },
                { value: 'score', label: '得分' },
                { value: 'firstSeen', label: '首次出现时间' },
                { value: 'lastSeen', label: '末次出现时间' },
      ],
      levels: [{ value: 1, label: '低' },
                { value: 2, label: '中' },
                { value: 3, label: '高' },
      ],
      rules: {
        attribute: [
          { required: true, message: '请选择属性！', trigger: 'change' },
        ],
      },
      categorys:[],
      advancedFlag: false,
      exportDialogShow: false,
      customColShow: false,
      // 自定义列表所有列
      columns: [],
      // 自定义列
      customColumnList: [],
      // 默认列
      defaultColumns: [],
      // 向子组件传递的列
      columnList: [],
      //暂存的列，取消时用
      tempColumns: []
    }
  },
  methods: {
    resetForm(formName) {
      this.params = {
        attribute:'',
        domain: '',
        category: '',
        source: '',
        level: '',
        score:'',
        firstSeen:'',
        lastSeen:'',
        type:'',
      };
    },


    // 高级搜索
    showAdvanced() {
      this.advancedFlag = true;
    },
    // 普通搜索
    hideAdvanced() {
      this.resetForm('params');
      this.advancedFlag = false;
    },
    // 刷新列表
    reload() {
      this.resetForm('params');
      this.search();
    },
    // 恢复默认列
    recoverColumns() {
      this.customColumnList = this.defaultColumns;
      this.common.req("/ssa/customColumn/recoverDefalutColumns.do", {
        "tableName": this.tableId
      }, this);
      this.columnList = this.defaultColumns;
    },
    // 保存自定义列
    saveColumns() {
      this.columnList = this.customColumnList;
      this.common.req("/ssa/customColumn/saveColumns.do", {
        "customColumns": this.customColumnList,
        "tableName": this.tableId
      }, this);
      this.customColShow = false;
      this.$store.dispatch('reloadTable', this.tableId);
    },
    // 取消自定义列
    cancelColumns() {
      this.customColumnList = this.tempColumns;
      this.customColShow = false;
    },
    // 打开自定义列窗口
    customCol() {
      this.tempColumns = this.customColumnList;
      this.customColShow = true;
    },
    // 搜索
    search() {
      this.$refs.params.validate((valid) => {
          if (valid) {
            this.params.firstSeenSt = this.common.formatDate(this.params.firstSeen[0]);
            this.params.firstSeenEt = this.common.formatDate(this.params.firstSeen[1]);
            this.params.lastSeenSt = this.common.formatDate(this.params.lastSeen[0]);
            this.params.lastSeenEt = this.common.formatDate(this.params.lastSeen[1]);
            this.$store.commit('setParams', [this.tableId, this.params]);
            this.$store.dispatch('reloadTable', this.tableId);
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },

    async initDataList() {
      let typ = await this.common.req('/ssa/blackDomain/getTypeList.do', {}, this);
      this.categorys = typ;

    }

  },
  created: async function() {
    // this.initDataList();
  }
}
</script>
