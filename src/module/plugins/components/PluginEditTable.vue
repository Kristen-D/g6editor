<template>
<div class="">
  <!-- {{checkList}} {{tableId}} -->
  <el-table border :data="defConf.tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">

    <el-table-column type="selection">
    </el-table-column>
    <el-table-column  prop="plugin_id" label="插件ID"    align="center"></el-table-column>
    <el-table-column  prop="sys_title" label="所属系统"    align="center"> </el-table-column>
      <el-table-column  prop="uri" label="访问路径"    align="center"> </el-table-column>
    <el-table-column  prop="pmenus" label="上级菜单"    align="center"> </el-table-column>
      <el-table-column   label="状态"    align="center">
        <template scope="scope">
          <span style="margin-left: 10px" v-if=" scope.row.status==1" ><a style="color:green">启动</a></span>
          <span style="margin-left: 10px" v-else ><a style="color:red">停止</a></span>
        </template>
      </el-table-column>
    <el-table-column label="操作"  align="center">
      <template scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)" style="color:#00a0fe; margin-right:17px;">设置父菜单</el-button>
        <span style="color: #F3F3F3">|</span>
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)" style="color:#00a0fe; margin-left:17px;">删除</el-button>

      </template>
    </el-table-column>
    <div slot="empty" >
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' === defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
      </div>

      <div class="" v-if="'load' === defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

  </el-table>


    <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
    </el-pagination>


  <el-dialog title="设置菜单" :visible.sync="menuShow" width="30%" @close="onCloseMenu()" >
    <el-form :model="pluginForm" :rules="rules" ref="plugin" label-width="100px">
      <el-form-item label="上级菜单" prop="pid" >
         <cap :options="menus"   clearable change-on-select placeholder="选择菜单" :props="props"  v-model="pluginForm.pid" root-id="-1" > </cap>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" class="button-p-3" @click="submitForm()">提交</el-button>
        <el-button type="gray" class="button-p-3" @click="cancelForm()">取消</el-button>
      </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>

<script>
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {cap},
  props: [ 'id'],
  computed: {

  },
  data() {
    return {
      props:{value:"permission_id",label:"name"},
      pluginForm:{pid:null},
        menuShow:false,
        menus:[],
      defConf: {},
      rules:{pid:[{ required: true, message: '请选择菜单' }]},
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },
    filterType(value, row) {
      return row.type === value;
    },
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      row.tableId = this.id;
  //    this.$router.push({name:'pluginForm', params:row })
      if(this.$refs.plugin){
        this.$refs.plugin.resetFields();
      }
      this.menuShow = true;
      this.pluginForm = {...row}
      this.pluginForm.pid =  [row.pid]

      // this.$store.dispatch('handleEdit', [this.id, i, row]);
    },
    handleDelete(i, row) {
      this.$store.dispatch('handleDelete', [this, i, row]);
    },

    //处理选中多选的row
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.id, selectedRow]);
    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },
    onCloseMenu(){

    },
    submitForm(){
      this.$refs.plugin.validate(async(valid) => {
         if (valid) {
           var url = "/ssa/plugins/updatePluginPid.do";
           this.pluginForm.pid = this.pluginForm.pid[0];
             var msg = await this.common.req(url,this.pluginForm,this);
               this.$message({ type: 'success',   message:msg });
               this.assetShow = false;
               this.$store.dispatch('reloadTable',this.id);
         } else {
           console.log('error submit!!');
           return false;
         }
       });

    },
    cancelForm(){
      this.menuShow = false;
    }
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/plugins/listPluginsGridData.do",
      params: {},
      saveUrl: "",
      delUrl: "/ssa/plugins/deletePlugin.do",
    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);

    this.common.req("/ssa/plugins/listAllNotLeafMenus.do").then(data=>{
      this.menus = data;
    })
  }

}
</script>

<style>

</style>
