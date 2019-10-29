<template>
<div class="float-r" style="padding-left:10px;">
  <el-button type="primary" icon="el-icon-setting" size="small" @click="showDialog"> 自定义</el-button>
  <el-dialog title="自定义列" :visible.sync="dialogVisible" width="50%">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-select v-model="cols" multiple placeholder="请选择" style="width:100%;">
          <el-option v-for="item in baseCols" :key="item.prop" :label="item.label" :value="item.prop">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <div class="dialog-footer">
          <el-button type="success" size="small" icon="el-icon-check" @click="commitCols()"> </el-button>
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="refresh()"> </el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="clear()"> </el-button>
        </div>

      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">

      </span>
  </el-dialog>
</div>
</template>
<script>
import ajax from '../../common/ajax'
export default {
  data: function() {
    return {
      baseColsMap: {},
      baseCols: [],
      showCols: [],
      cols: [],
      dialogVisible: false,
      refreshCols: [],
    }
  },
  props: ['configId'],
  methods: {
    getReturnCols(){
      let returnCols = [];
      this.cols.forEach(c => {
        returnCols.push(this.baseColsMap[c]);
      });
      return returnCols;
    },
    commitCols() {
      let returnCols = this.getReturnCols();
      ajax.put("/ssa/common/customColumn/updateCustomColumnConfig", {
        id: this.configId,
        showCols: this.cols.join(",")
      }).then(res => {
        if (res.code == 200) {
          this.$emit("commitCols", returnCols);
          this.closeDialog();
          this.$message({
            showClose: true,
            message: "更新列成功",
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          });
        }

      })

    },
    clear() {
      this.cols = [];
    },
    refresh() {
      this.cols = this.refreshCols;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    initCustomColumn(data) {
      if (!!!data) return;
      this.baseCols = JSON.parse(data.baseCols);
      this.baseCols.forEach(c => {
        let id = c.prop;
        let text = c.label;
        this.baseColsMap[id] = c;
      })
      let colsStr = data.showCols ? data.showCols : data.defCols;
      this.cols = colsStr.split(",");
      this.refreshCols = this.cols.concat();
        let returnCols = this.getReturnCols();
       this.$emit("commitCols", returnCols);
    }

  },
  mounted: async function() {
    let {
      data
    } = await ajax.get("/ssa/common/customColumn/getCustomColumnConfig/" + this.configId);
    this.initCustomColumn(data);
  }
}
</script>
