<template>
  <div style="padding: 15px">
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">基本属性</h4>
          </div>
        </template>
        <template class="el-panel-body" style="padding: 0 15px">
          <el-form :model="node" label-width="120px" label-position="right" class="custom-form">
            <el-form-item label="节点名称：">
              <el-input class="custom-width" v-model="node.name" @change="handelChangeName" v-if="handle!='view'"></el-input>
              <p v-if="handle == 'view'" style="width:400px">{{node.name}}</p>
            </el-form-item>
             <el-form-item label="是否收敛：">
              <el-switch v-model="node.isWayIn" :disabled="handle=='view'"></el-switch>
            </el-form-item>
          </el-form>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="2">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">条件表达式</h4>
          </div>
        </template>
        <div class="el-panel-body">
          <el-form label-width="120px" label-position="right">
            <div class="flexStart m-l-20">
              <el-button  v-if="handle!='view'"
                type="primary"
                title="增加"
                size="mini"
                icon="el-icon-plus"
                circle
                @click.prevent="addRow()"
              ></el-button>
            </div>
            <el-table
              :data="node.condition"
              style="width: 100%;margin-bottom:14px;"
              class="white-table ssas-table-empty ss-white-table"
            >
              <el-table-column label="条件表达式" prop="cond" align="center">
                <template slot-scope="scope">
                  <el-input v-if="handle!='view'"
                    type="textarea"
                    :rows="2"
                    v-model="scope.row.cond"
                    @focus="openExpression(scope.row)"
                  ></el-input>
                  <p v-if="handle == 'view'">{{scope.row.cond}}</p>
                </template>
              </el-table-column>
              <el-table-column label="去路节点" align="center" prop="nodeId">
                <template slot-scope="scope">
                  <el-select placeholder="请选择" v-model="scope.row.nodeId" :disabled="handle == 'view'">
                    <el-option v-for="item in nextNodeArray" :label="item.name" :key="item.id" :value="item.id">{{item.name}}</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column v-if="handle!='view'" prop="operate" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click.native.prevent="deleteRow(scope.$index, node.condition)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
      title="定义表达式"
      :visible.sync="dialogFormVisible"
      :modal="false"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="el-collapse-heading">
          <h4 class="el-panel-title2" style="display: inline-block">定义表达式</h4>
        </div>
      </template>
      <div class="el-panel-body" style="padding: 0">
        <el-form :model="expressForm" label-width="120px" label-position="right">
          <el-form-item label="参数：">
            <div class="block">
              <el-cascader
                placeholder="值来源"
                v-model="expressForm.condList"
                :options="sourceOptions"
                :props="defaultProps"
                :show-all-levels="false"
                 @change="handleChange"
                clearable
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="操作符：">
            <el-select v-model="expressForm.opt" placeholder="请选择">
              <el-option label=">" value=">"></el-option>
              <el-option label="=" value="="></el-option>
              <el-option label="<" value="<"></el-option>
              <el-option label="包含" value="C"></el-option>
              <el-option label="不包含" value="!C"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值：">
            <el-input v-model="expressForm.condVal" style="width:200px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="expressionCancel()">取 消</el-button>
        <el-button type="primary" @click="confirmExpression()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="fix-bottom-buttonIn"  v-if="handle!='view'">
      <el-button type="primary" size="medium" @click="updateNode">保存</el-button>
      <el-button type="gray" size="medium" @click="delNode">删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    node: {
      type: Object,
      required: true
    },
    handle : {
      type : String,
    }
  },
  data() {
    return {
      activeNames: ["1", "2"],
      sourceOptions: [],
      dialogFormVisible: false,
      selectedRow: null,
      defaultProps: {
        children: "childs",
        label: "name",
        value: "id"
      },
      expressForm: {
        condList: null,
        opt: null,
        condVal: null
      },
      nextNodeArray : [],
      canChoose : true,
    };
  },
  methods: {
    addRow: function() {
      let item = {
        cond: "",
        nodeId: null
      };
      this.node.condition.push(item);
    },
    deleteRow: function(index, list) {
      list.splice(index, 1);
    },

    async openExpression(row) {
      this.dialogFormVisible = true;
      this.expressForm.condList = null;
      this.sourceOptions = await this.utils.reqObj(
        "/ssa/soar/node/getSrNodeValTree.do",
        this.node
      );
      this.selectedRow = row;
    },
     chooseConfirm(id, array) {
      for (var index in array) {
        if (id == array[index].id) {
          this.canChoose = array[index].canChoose;
          return;
        }
        if (array[index].childs) {
          this.chooseConfirm(id, array[index].childs);
        }
      }
    },
    handleChange(value){
       let id = value[value.length - 1];
        this.chooseConfirm(id,this.sourceOptions);
        if(!this.canChoose){
          this.$message({message : '该节点不能选择', type : 'error'});
         this.expressForm.condList = [''];
          this.$forceUpdate();
          return;
        }
    },

    confirmExpression() {
      if (this.expressForm.condList) {
        let str = '${' + this.expressForm.condList.toString().replace(/,/g, ".") + '}';
        this.selectedRow.cond =
          str + this.expressForm.opt + this.expressForm.condVal;
      }
      this.expressionCancel();
    },
    expressionCancel() {
      this.dialogFormVisible = false;
      this.expressForm.condList = null;
      this.expressForm.opt = null;
      this.expressForm.condVal = null;
    },
    handelChangeName() {
      this.$emit("handelChangeName");
    },
    updateNode() {
      this.$emit("updateNode");
    },
    delNode() {
      this.$emit("delNode");
    },
    async getNextCode(){
      let data = await this.utils.reqObj('/ssa/soar/node/getNextNode.do',this.node);
      this.nextNodeArray = data;
    }
  },
  created : function(){
     this.getNextCode();
  }
};
</script>

<style scoped>
.el-collapse-heading {
  padding: 0 15px;
}

.el-collapse-heading h4 {
  display: inline-block;
}

.el-collapse-heading label {
  padding-left: 5px;
  color: #999;
  font-size: 12px;
  line-height: 14px;
}

.el-collapse-heading label span {
  color: #f00;
  padding-right: 3px;
}

.custom-inputwidth {
  width: 16.48% !important;
}

.custom-width {
  width: 250px;
}

.addbutton {
  padding-right: 20px !important;
  line-height: 40px;
}

.custom-collapse.el-collapse {
  border-top: none;
}

.custom-collapse .el-collapse-item__header,
.custom-collapse .el-collapse-item__wrap {
  border-bottom: none;
}

.custom-collapse .el-collapse-item__content {
  padding-bottom: 0;
}

.custom-collapse .el-collapse-item.is-active .el-collapse-item__header {
  border-bottom: 1px solid #ebeef5;
}

.custom-form.el-form .el-form-item {
  width: calc(100% / 3);
}

.custom-form {
  flex-wrap: wrap;
}

.el-form-item__label {
  float: left;
}

.el-form-item__label {
  float: left;
}

.fix-bottom-buttonIn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  padding: 10px;
  position: fixed;
  bottom: 5px;
  right: 0px;
}
</style>
<style>
.ss-white-table {
  margin-top: 10px;
}

.ss-white-table th {
  background-color: #f5f6fa;
}
</style>
