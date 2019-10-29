<template>
<div class="whitebackground Whitespace">
  <div class="top-title">组织机构管理</div>
  <div :class="['ordinary-search', 'clearfloat']">

    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input placeholder="组织机构名称" v-model="queryForm.namelike"></el-input>
      </el-form-item>
      <el-form-item>
        <cap :loadData="loadData" clearable change-on-select placeholder="选择地区" v-model="queryForm.areaIdArr" root-id="0">
        </cap>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.pid" filterable clearable placeholder="选择组织机构类型">
          <el-option v-for="item in orgList" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
  </div>


  <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <el-button type="primary" size="small" @click="handleAdd()"><i class="icon-add m-r-8"></i>新增</el-button>
    <el-button type="primary" size="small" @click="delCheckedRows()"><i class="icon-delet m-r-8"></i>删除</el-button>
  </div>

  <el-table :id="tableId" :data="defConf.tableData" v-loading="defConf.loading" @selection-change="handleSelectionChange" style="width: 100%">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="organization_id" label="id" align="center" sortable>
    </el-table-column>
    <el-table-column prop="name" label="名称" align="center" sortable>
    </el-table-column>
    <el-table-column prop="realname" label="责任人" align="center" sortable>
    </el-table-column>
    <el-table-column prop="description" label="描述" align="center">
    </el-table-column>
    <el-table-column prop="out_ip" label="外网ip" align="center">
    </el-table-column>
    <el-table-column prop="inner_ip_range" label="内网ip网段" align="center">
    </el-table-column>
    <el-table-column prop="merger_name" label="地区" align="center">
    </el-table-column>
    <el-table-column label="操作" min-width="100" align="center">
      <template scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)" class="operate-left">编辑</el-button>
          <span class="vert-bar-color">|</span>
          <el-button type="text" @click="handleDelete(scope.row)" class="operate-center">删除</el-button>
</template>
      </el-table-column>
    </el-table>

    <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize"
      :current-page="defConf.pageIndex" layout="total,sizes,  prev, pager, next, jumper" :total="defConf.total">
    </el-pagination>
  </div>

</template>

<script>
import {
  mapState
} from 'vuex'
import cap from 'components/Cascader/CascaderPlus'
export default {
  components: {
    cap
  },
  data() {
    return {
      loadData: {
        url: "/ssa/organization/getAreaByPid.do",
        maxLevel: 3,
        backFillUrl: "/ssa/organization/getAllPaerntById.do"
      },
      queryForm: {
        namelike: "",
        area_id: null,
        pid: null,
        areaIdArr: null

      },
      defConf: {},
      tableId: "organizationTable",
      orgData: [],
      attr: [],
      orgPidArr: [],
      allNodes: [],
      //转换后的数组
      aaa:[]
    }



  },

  computed: {
    ...mapState({
      areaList: state => state.context.areaList,
      orgList: state => state.context.orgList
    })
  },
  methods: {
    queryData() {

      if (this.queryForm.areaIdArr != null) {
        this.queryForm.area_id = this.queryForm.areaIdArr[this.queryForm.areaIdArr.length - 1];

      }

      var params = this.queryForm;
      this.$store.commit('setParams', [this.tableId, params]);
      this.$store.dispatch('reloadTable', this.tableId);
    },
    handleAdd() {
      var params = {};
      params.handle = "add";
      this.$router.push({
        name: 'organizationForm',
        params: params
      })
    },
    getPath(node, pid) {
      // console.log('node：'+JSON.stringify(node));

      for (var i = 0; i < node.length; i++) {

        var item = node[i];
        console.log(JSON.stringify(item.name) + item.id);


        if (item.children != null) {
          if (item.id == pid) {

            this.attr.push(item.id);
            this.allNodes[item.id] = item;
            this.aaa = this.allNodes;
            return;
          }
          this.attr.push(item.id);
          this.allNodes[item.id] = item;
          // console.log(JSON.stringify(this.test));
          this.getPath(item.children, pid)
          if (item.pid == 1) {
            this.attr = ["1"];
            this.allNodes =[];
            this.allNodes[1] = {pid:"-1",name:"总部",id:"1"};
          }
        }
      }
    },

    getNode(pid) {
      for (var key in this.aaa) {
        var p = this.aaa[key];
        if (p.id == pid) {
          this.orgPidArr.push(p.id)
          this.getNode(p.pid);
        }
        // if (p.pid == -1) {
        //   return ;
        // }
      }
    },
    handleEdit(row) {
      var params = {};
      params.handle = "update";
      params.organizationForm = row;
      params.organizationForm.areaIdArr = row.area_id.toString().split(",");
      //alert( row.pid.toString());
      console.log('row.pid:' + row.pid);
      this.getPath(this.orgData, row.pid);

      this.getNode(row.pid);

      console.log(JSON.stringify(this.orgPidArr));
      this.orgPidArr.reverse();
      params.organizationForm.pidArr = this.orgPidArr;
      // var arr=[];
      //       for (var group of this.orgData){
      //          if (row.pid==group.id){
      //            arr[0]=group.id+"";
      //              break;
      //          }
      //          if (group.children!=null){
      //            for (var item of group.children){
      //              if (row.pid==item.id){
      //                 arr[0]=group.id+"";
      //                 arr[1]=item.id+"";
      //                   break;
      //              }
      //              if (item.children!=null){
      //                for (var item1 of item.children){
      //                  if (row.pid==item1.id){
      //                     arr[0]=group.id+"";
      //                     arr[1]=item.id+"";
      //                     arr[2]=item1.id+"";
      //                       break;
      //                  }
      //                  if(item1.children!=null){
      //                    for (var item2 of item1.children){
      //                      if (row.pid==item2.id){
      //                         arr[0]=group.id+"";
      //                         arr[1]=item.id+"";
      //                         arr[2]=item1.id+"";
      //                         arr[3]=item2.id+"";
      //                         break;
      //                       }
      //                         if(item2.children!=null){
      //                           for (var item3 of item2.children){
      //                             if (row.pid==item3.id){
      //                                arr[0]=group.id+"";
      //                                arr[1]=item.id+"";
      //                                arr[2]=item1.id+"";
      //                                arr[3]=item2.id+"";
      //                                arr[4]=item3.id+"";
      //                                break;
      //                             }
      //                         }
      //                      }
      //                    }
      //                  }
      //                }
      //              }
      //            }
      //          }
      //        }
      // params.organizationForm.pidArr=arr;
      this.$router.push({
        name: 'organizationForm',
        params: params
      })

    },
    async handleDelete(row) {
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var msg = await this.utils.req("/ssa/organization/deleteOrganization.do", row, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.$store.dispatch('reloadTable', this.tableId);
      })

    },
    handleSelectionChange(selectedRow) {
      this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
      return;
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
    },
    async delCheckedRows() {
      var rows = this.$store.state.table[this.tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请选中删除数据!", {
          type: 'warning'
        });
        return;
      }
      this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var organizationIds = [];
        rows.forEach(row => {
          organizationIds.push(row.organization_id);
        });
        var msg = await this.utils.req("/ssa/organization/deleteSelectedOrganization.do", {
          organizationIds: organizationIds
        }, this);
        this.$message({
          type: 'success',
          message: msg
        });
        this.$store.dispatch('reloadTable', this.tableId);
      })
    },


  },
  created: async function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/organization/getOrganization.do",
      params: {},
    };
    this.$store.commit('registerConf', [this.tableId, defConf]);
    this.defConf = this.$store.state.table[this.tableId];
    this.$store.dispatch('reloadTable', this.tableId);
    this.$store.dispatch('loadOrgList');
    this.orgData = await this.utils.req('/ssa/organization/getChildRenOrg.do', {}, this)
    //this.$store.dispatch('loadAreaList');

  }

}
</script>
