<template>
  <div style="padding: 15px;">
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">基本属性</h4>
          </div>
        </template>
        <div class="el-panel-body" style="padding: 0 15px">
          <el-form :model="node" label-width="120px" label-position="right" class="custom-form">
            <el-form-item label="节点名称：">
              <el-input
                class="custom-width"
                v-model="node.name"
                @change="handelChangeName"
                v-if="handle!='view'"
              ></el-input>
              <p v-if="handle == 'view'" style="width:400px">{{node.name}}</p>
            </el-form-item>
            <el-form-item label="引用：">
              <div class="block">
                <el-cascader
                 v-if="handle!='view'"
                  class="custom-width"
                  v-model="node.refIdArr"
                  :options="options"
                  :props="defaultProps"
                  :show-all-levels="false"
                  clearable
                  @change="handleChange"
                ></el-cascader>
                 <el-cascader
                 v-if="handle =='view'"
                 :disabled="true"
                  class="custom-width"
                  v-model="node.refIdArr"
                  :options="options"
                  :props="defaultProps"
                  :show-all-levels="false"
                  clearable
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="是否收敛：">
              <el-switch v-model="node.isWayIn" :disabled="handle=='view'"></el-switch>
            </el-form-item>
            <el-form-item label="错误时候退出：">
              <el-switch v-model="node.isExitOnErr" :disabled="handle=='view'"></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="2">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">输入参数</h4>
          </div>
        </template>
        <div class="el-panel-body">
          <el-form label-width="120px" label-position="right">
            <!-- <div class="flexStart m-l-20">
                <el-button
                  type="primary"
                  title="增加"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click.prevent="addPut('in')"
                ></el-button>
            </div>-->
            <el-table
              :data="node.in"
              style="width: 100%;margin-bottom:14px;"
              class="white-table ssas-table-empty"
              id="s-white-table"
              border
            >
              <el-table-column prop="code" label="参数" align="center" width="140">
                <template slot-scope="scope">
                  <el-input placeholder="code" v-model="scope.row.code" :disabled="true"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="dtype" label="值类型" align="center">
                <template slot-scope="scope">
                  <el-select placeholder="请选择" :disabled="true" v-model="scope.row.dtype">
                    <el-option
                      v-for="item in dtTypeArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >{{item.label}}</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="source" label="值来源" align="center" width="160">
                <template slot-scope="scope">
                  <div class="block">
                    <el-cascader
                     v-if="handle!='view'"
                      placeholder="值来源"
                      v-model="scope.row.sourceStr"
                      :options="sourceOptions"
                      :props="defaultProps"
                      :show-all-levels="false"
                      @change="sourceChange(scope.row)"
                      clearable
                    ></el-cascader>
                    <el-cascader
                     v-if="handle =='view'"
                     :disabled="true"
                      placeholder="值来源"
                      v-model="scope.row.sourceStr"
                      :options="sourceOptions"
                      :props="defaultProps"
                      :show-all-levels="false"
                      @change="sourceChange(scope.row)"
                      clearable
                    ></el-cascader>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Operate" label="操作" width="80">
                <!-- <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      circle
                      @click.native.prevent="removePut(scope.$index, node.in)"
                    ></el-button>
                </template>-->
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="custom-collapse" v-model="activeNames" style="padding-bottom: 50px">
      <el-collapse-item name="3">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">输出参数</h4>
          </div>
        </template>
        <div class="el-panel-body">
          <el-form label-width="120px" label-position="right">
            <!-- <div class="flexStart m-l-20">
                <el-button
                  type="primary"
                  title="增加"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click.prevent="addPut('out')"
                ></el-button>
            </div>-->
            <el-table
              :data="node.out"
              style="width: 100%;margin-bottom:14px;"
              class="white-table ssas-table-empty"
              id="s-white-table"
              border
            >
              <el-table-column prop="code" label="参数" align="center" width="140">
                <template slot-scope="scope">
                  <el-input placeholder="code" v-model="scope.row.code" :disabled="true"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="dtype" label="值类型" align="center">
                <template slot-scope="scope">
                  <el-select placeholder="请选择" :disabled="true" v-model="scope.row.dtype">
                    <el-option
                      v-for="item in dtTypeArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >{{item.label}}</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="source" label="值来源" align="center" width="160">
                <!-- <template slot-scope="scope">
                  <div class="block">
                    <el-cascader
                      placeholder="值来源"
                      v-model="scope.row.source"
                      :options="sourceOptions"
                      :props="defaultProps"
                      :show-all-levels="false"
                      clearable
                    ></el-cascader>
                  </div>
                </template>-->
              </el-table-column>
              <el-table-column prop="Operate" label="操作" width="80">
                <!-- <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      circle
                      @click.native.prevent="removePut(scope.$index, node.in)"
                    ></el-button>
                </template>-->
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="fix-bottom-buttonIn" v-if="handle!='view'">
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
    handle: {
      type: String
    }
  },
  data() {
    return {
      activeNames: ["1", "2"],
      dtTypeArray: [
        {
          label: "字符",
          value: 1
        },
        {
          label: "整数",
          value: 2
        }
      ],
      options: [],
      sourceOptions: [],
      defaultProps: {
        children: "childs",
        label: "name",
        value: "id"
      },
      canChoose : true,
    };
  },
  methods: {
    addPut(source) {
      let item = {
        code: null,
        dtype: null,
        source: null
      };
      if (source == "in") {
        this.node.in.push(item);
      } else {
        this.node.out.push(item);
      }
    },
    removePut: function(index, list) {
      list.splice(index, 1);
    },
    nodeNameConfirm(id, array) {
      for (var index in array) {
        if (id == array[index].id) {
          this.node.name = array[index].name;
          this.handelChangeName();
          return;
        }
        if (array[index].childs) {
          this.nodeNameConfirm(id, array[index].childs);
        }
      }
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
    async handleChange(value) {
      if (this.node.refIdArr) {
        let id = value[value.length - 1];
        this.chooseConfirm(id,this.options);
        if(!this.canChoose){
          this.$message({message : '该节点不能选择', type : 'error'});
          this.node.refIdArr = [''];
          this.node.refs = '';
          this.$forceUpdate();
          this.node.in = [];
          this.node.out = [];
          return;
        }
        this.nodeNameConfirm(id, this.options);
        this.node.refs = this.node.refIdArr.toString();
        let paramResult = await this.utils.reqObjBackState(
          "/ssa/soar/node/getSrNodeRefParam.do",
          this.node
        );
        if (paramResult.state) {
          if(paramResult.data.in){
            this.node.in = paramResult.data.in;
          }else{
            this.node.in = [];
          }
          if(paramResult.data.out){
            this.node.out = paramResult.data.out;
          }else{
            this.node.out = [];
          }
          let sourceResult = await this.utils.reqObj(
            "/ssa/soar/node/getSrNodeValTree.do",
            this.node
          );
          this.sourceOptions = sourceResult;
        }
      }
    },
    async showSource() {
      let sourceResult = await this.utils.reqObj(
        "/ssa/soar/node/getSrNodeValTree.do",
        this.node
      );
      this.sourceOptions = sourceResult;
    },
    async loadTree() {
      var params = { pbId: this.node.pbId };
      this.$nextTick(async () => {
        var data = await this.utils.reqObj(
          "/ssa/soar/node/getSrNodeRefTree.do",
          params
        );
        if (data) {
          this.options = data;
        }
      });
    },
    sourceChange(row) {
      if (row.sourceStr) {
        let id = row.sourceStr[row.sourceStr.length - 1];
        this.chooseConfirm(id,this.sourceOptions);
        if(!this.canChoose){
          this.$message({message : '该节点不能选择', type : 'error'});
          row.sourceStr = [''];
          row.source = '';
          this.$forceUpdate();
          return;
        }
        row.source = row.sourceStr.toString().replace(/,/g, ".");
      }
    },
    handelChangeName() {
      this.$emit("handelChangeName");
    },
    updateNode() {
      console.log("updateNode");
      this.$emit("updateNode");
    },
    delNode() {
      this.$emit("delNode");
    }
  },

  created() {
    this.loadTree();
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
