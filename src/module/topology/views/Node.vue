<template>
  <div>
    <el-button type="primary" @click="addNode">增加节点</el-button>
    <custom-table
      :page="page"
      @currentChange="currentChange"
      @sizeChange="sizeChange">
      <el-table-column width="80px" prop="id" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="assetId" label="资产ID"></el-table-column>
      <el-table-column prop="image" label="图标"></el-table-column>
      <el-table-column prop="x" label="x坐标"></el-table-column>
      <el-table-column prop="y" label="y坐标"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleManager(scope.row, 'edit')">编辑</el-button>
          <el-button type="danger" @click="handleManager(scope.row, 'delete')">删除</el-button>
        </template>
      </el-table-column>
    </custom-table>
    <el-dialog
      title="节点"
      :visible.sync="nodeDialog"
      width="300px">
      <el-form label-width="80px">
        <el-form-item label="节点名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图标名称">
          <el-select v-model="form.image" placeholder="请选择图标">
            <el-option 
              v-for="(image, i) in images" 
              :key="i" 
              :label="image.name" 
              :value="image.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="x">
          <el-input type="number" v-model="form.x"></el-input>
        </el-form-item>
        <el-form-item label="y">
          <el-input type="number" v-model="form.y"></el-input>
        </el-form-item>
        <el-form-item label="资产ID">
          <el-input type="text" v-model="form.assetId"></el-input>
          <!-- <el-select
              v-model="form.assetIp"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="(item, i) in assets"
                :key="i"
                :label="item.assetIp"
                :value="item.assetIp">
              </el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="操作">
          <el-input v-model="form.operate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="nodeDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomTable from '../components/CustomTable';
import axios from 'axios';

// 加个资产id、ip

export default {
  name: 'node',
  components: {CustomTable},
  data () {
    return {
      page: {
        pageIndex: 1, pageSize: 10, data: [], total: 0
      },
      nodeDialog: false,
      form: {
        name: '', image: '', x: 0, y: 0, operate: '', assetId: '', id: null, assetIp: ''
      },
      images: [],
      assets: []
    }
  },
  created() {
    this.getList();
    axios.get('/ssa/topology/image/list.do', {params: {topologyId: this.$route.query.id}})
    .then((result) => {
      this.images = result.data.data;
    })
  },
  methods: {
    sizeChange (value) {
      this.page.pageSize = value;
      this.getList();
    },
    currentChange(value) {
      this.page.pageIndex = value;
      this.getList();
    },
    async getList() {
      let result = await axios.get('/ssa/topology/node/list.do', {
        params: {
          topologyId: this.$route.query.id, 
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
          t: Date.now()
        }
      });
      this.page.data = result.data.data.rowData;
      this.page.total = result.data.data.total;
    },
    async remoteMethod(value) {
      let result = await axios.get('/ssa/topology/asset/list.do', {params: {query: value}});
      this.assets = result.data.data;
    },
    addNode() {
      this.form = {name: '', image: '', x: 0, y: 0, operate: '', assetId: '', id: null, assetIp: ''};
      this.nodeDialog = true;
    },
    handleManager(data, type) {
      if (type === 'delete') {
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/ssa/topology/node/del.do', {params: {id: data.id}}).then(() => {
            this.getList();
          })
        })
      } else if (type === 'edit') {
        this.form = {...data};
        this.nodeDialog = true;
      }
    },
    nodeDialogSubmit() {
      this.assets.map(asset => {
        if (asset.assetIp === this.form.assetIp) {
          this.form.assetId = asset.assetId;
        }
      })
      if (this.form.id) {
        axios.post('/ssa/topology/node/update.do', this.form).then((result) => {
          if (result.data.data) {
            this.getList();
            this.nodeDialog = false;
          } else {
            this.$message('资产信息重复了，请重新选择！');
          }
        })
      } else {
        this.form.topologyId = this.$route.query.id;
        axios.post('/ssa/topology/node/info.do', this.form).then(() => {
          this.getList();
          this.nodeDialog = false;
        })
      }
    }
  }
}
</script>


