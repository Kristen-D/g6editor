<template>
<div>

  <!--
  multiple: 是否多选
  value:   数组 或者 "" 字符串
  orgType: 组织类型 对应organization表中pid
  -->
  <!-- @focus="openDialog()" v-on:input="updateValue($event.target.value)"  -->
  <input type="text" ref="input" v-model="value" class="el-select__input" style="display:none"></input>
  <el-input :value="selectedLabel" :size="size" class="org-input" @focus="openDialog" :placeholder="orgstring" @click="handleIconClick" :icon="iconClass">
  </el-input>

  <el-dialog title="组织机构" :visible.sync="dialogTableVisible">
    <!-- <el-input v-model="input" width="30%" placeholder="单位名称"></el-input> -->

    <el-form :inline="true" :model="queryForm" ref="queryForm">
      <el-form-item label="">
        <el-input placeholder="组织机构名称" v-model="queryForm.namelike"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>

      <el-form-item v-if="multiple">
        <el-button type="primary" @click="getAllOrg">全选</el-button>
      </el-form-item>

      <el-form-item v-if="multiple">
        <el-button type="primary" @click="clearAllOrg">清空</el-button>
      </el-form-item>
    </el-form>
    <div v-if="multiple">
      <span>已选组织机构</span>
      <el-tag style="margin-left:10px;" v-for="tag in selected" @close="handleClose(tag)" type="primary" :closable="true">
        {{tag.name}}
      </el-tag>
    </div>
    <el-table :data="gridData.rowData" highlight-current-row @current-change="handleSelectChange">
      <el-table-column property="value" label="id" width="150"></el-table-column>
      <el-table-column property="label" label="单位名称" width="200"></el-table-column>
      <el-table-column property="description" label="描述"></el-table-column>
    </el-table>
    <el-pagination style="float:right" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="gridData.total">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="getSelected()">确 定</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import utils from 'components/js/common.js'
export default {
  props: {
    multiple: Boolean,
    value: {
      required: true
    },
    orgType: Number,
    orgstring:'组织架构',
    size: String
  },
  computed: {
    iconClass() {

      let criteria = this.value !== undefined && this.value !== '' && !this.multiple && this.value !== null;
      return criteria ? 'circle-close is-show-close' : '';
    }
  },
  watch: {
    value(val) {
      if (this.isSetSelected) {
        this.setSelected();
      } else {
        this.isSetSelected = true;
      }
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      gridData: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      selectedLabel: "",
      selected: [],
      queryForm: {
        namelike: ""
      },
      isSetSelected: true,
      isStored: {}
    }
  },
  methods: {
    handleCurrentChange(pageIndex) {
      var params = {};
      params.namelike = this.queryForm.namelike;
      params.pageIndex = pageIndex;
      params.pageSize = this.pageSize;
      params.pid = this.orgType;
      this.utils.req("/ssa/organization/getOrganization.do", params, this).then(data => {
        this.gridData = data;
      });
    },
    openDialog() {
      this.dialogTableVisible = true;
    },
    clearAllOrg() {
      this.selected = [];
      this.isStored = {};
    },
    async getAllOrg() {
      this.selected = [];
      this.isStored = {};
      var params = {};
      params.pid = this.orgType;
      params.namelike = this.queryForm.namelike;
      var data = await this.utils.req("/ssa/organization/getAllOrganization.do", params, this);
      for (var i = 0; i < data.length; i++) {
        var val = data[i];
        if (!this.isStored[val.value]) {
          this.selected.push(val);
          this.isStored[val.value] = "in";
        }
      }

    },
    getSelected() {
      //多选
      var arr = [];
      var selectedLabels = [];
      if (this.multiple) {
        for (var i = 0; i < this.selected.length; i++) {
          var data = this.selected[i];
          arr.push(data.value);
          selectedLabels.push(data.name);
        }
        this.value = arr;
        this.selectedLabel = selectedLabels.join(";");

      } else {
        if (this.selected != null) {
          this.selectedLabel = this.selected.name;
          this.value = this.selected.value;
        } else {
          this.selectedLabel = "";
          this.value = "";
        }
      }
      this.$emit("input", this.value);
      this.isSetSelected = false;
      this.dialogTableVisible = false;
    },

    handleIconClick(event) {
      if (this.iconClass.indexOf('circle-close') > -1) {
        this.deleteSelected(event);
      } else {
        this.openDialog();
      }
    },

    deleteSelected(event) {
      this.$emit('input', '');
      this.selectedLabel = "";
      this.$emit('clear');
      this.isSetSelected = false;
    },

    async setSelected() {
      var params = this.queryForm;
      if (this.multiple) {
        params.organization_ids = this.value.join(",");
      } else {
        params.organization_id = this.value;
      }
      params.pid = this.orgType;
      var data = await this.utils.req("/ssa/organization/getAllOrganization.do", params, this);
      var arr = [];
      var selectedLabels = [];
      if (this.multiple) {
        for (var i = 0; i < data.length; i++) {
          var temp = data[i];
          arr.push(temp.value);
          this.selected.push(temp);
          this.isStored[temp.value] = "in";
          selectedLabels.push(temp.name);
        }
        this.value = arr;
        this.selectedLabel = selectedLabels.join("; ");


      } else {

        this.selectedLabel = data[0].name;
        this.value = data[0].value;
      }
      this.isSetSelected = false;
      this.$emit("input", this.value);
    },
    handleSelectChange(val) {
      //多选
      if (this.multiple) {
        if (!this.isStored[val.value]) {
          this.selected.push(val);
          this.isStored[val.value] = "in";
        }
      }
      if (!this.multiple) {
        this.selected = val;
      }

    },
    handleClose(tag) {
      this.isStored[tag.value] = null;
      this.selected.splice(this.selected.indexOf(tag), 1);
    },
    queryData() {

      var params = {};
      params.pageSize = 5;
      params.pageIndex = 1;
      params.namelike = this.queryForm.namelike;
      params.pid = this.orgType;
      this.utils.req("/ssa/organization/getOrganization.do", params, this).then(data => {
        this.gridData = data;
      });
      this.pageIndex = 1;
    }
  },
  created: function() {
    var params = {
      pageSize: 5,
      pageIndex: 1
    };
    params.pid = this.orgType;

    if (this.value != null && this.value != '') {

      this.setSelected();
    }

      this.utils.req("/ssa/organization/getOrganization.do", params, this).then(data => {
        this.gridData = data;
      });




  }

}
</script>
<style lang="css">
.org-input > .el-input__inner{
  cursor: pointer;
}
.el-table__body tr.current-row>td {
  background-color: #20a0ff;
}
</style>
