<template>
  <el-dialog title="场景引导" :visible.sync="sencesVisible" width="600px" class="dialog-white" @close="close">
    <div class="content-panel">
      <div class="progress-bar flexBetween">
        <div v-for="(item, index) in stepData" :key="index" class="flexBetween">
          <div class="bar-circle flexCenter" :class="{'active': active>=index}" @click="stepback(index)">{{item}}</div>
          <div class="progress-line" :class="{'active': active>=(index+1)}" v-if="index!==2"></div>
        </div>
      </div>
      <div class="select-panel text-s" v-for="(item,index) in listdata" :key="index" v-show="active===index">
        <ul>
          <li class="tit m-b-20">
            <label>{{item.title}}</label>
          </li>
          <li class="option" v-for="(it, i) in item.option" :key="i">
            <el-tooltip v-if="active>0" effect="dark" placement="bottom">
              <div slot="content" class="bguide-tip">
                {{it.tip}}
                <label v-if="it.des">
                  场景描述：{{it.des}}
                  <br>
                  必要字段：{{it.fields}}
                  <br>
                  算子组合：{{it.com}}
                </label>
              </div>
              <i class="el-icon-warning float-r text-md"></i>
            </el-tooltip>
            <div class="option-box" :class="{'ac':it.iconshow}" @click="select(i, it, index)">
              <label>{{it.name}}</label>
              <i v-if="active < 3" class="el-icon-success text-md" style="color: #2ecc71"></i>
              <a v-if="active===2" style="opacity: 0.4" :href="'/dataflow/begin.do#model?id='+it.id+'&type=template'">进入模型</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>
<style>
.bguide .el-tooltip__popper {
  border-radius: 0px;
}
.bguide-tip {
  max-width: 268px;
  line-height: 22px;
}
</style>

<style scoped>
.content-panel {
  width: 480px;
  margin: 0 auto;
  padding-bottom: 60px;
}
.progress-bar {
  width: 100%;
  margin-bottom: 50px;
}
.progress-bar .bar-circle {
  width: 46px;
  height: 46px;
  font-family: "Haettenschweiler";
  font-size: 28px;
  color: rgba(62, 73, 86, 0.5);
  background-color: #dfe7ec;
  border-radius: 50%;
  cursor: pointer;
}
.progress-line {
  display: inline-block;
  width: 135px;
  height: 4px;
  background-color: #dfe7ec;
  border-radius: 2px;
}

.progress-bar .bar-circle.active,
.progress-bar .progress-line.active {
  color: #fff;
  background-color: #2ecc71;
}

.select-panel {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.select-panel ul li.option .option-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 374px;
  height: 42px;
  line-height: 42px;
  border: 1px solid #e1e3e4;
  margin-top: 14px;
  padding: 0 16px;
  cursor: pointer;
}
.select-panel ul li.option .option-box:hover,
.select-panel ul li.option div.ac {
  background-color: #f5f5f7;
}

.select-panel ul li.option .option-box i.el-icon-success {
  display: none;
}
.select-panel ul li.option .option-box.ac i {
  display: block;
}
.select-panel ul li.option i.el-icon-warning {
  margin: 12px;
  color: #dbdbdb;
  cursor: pointer;
}
.select-panel ul li.option i.el-icon-warning:hover {
  color: #a9b7bf;
}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .progress-bar .bar-circle:not(:first-child):before {
    margin-left: -363px;
  }
}
</style>
<script>
import axios from 'axios'
export default {
  props: ['senceDialog'],
  data() {
    return {
      sencesVisible: false,
      active: 0,
      params: { type: '', dataSource: '' },
      stepData: [1, 2, 3],
      listdata: [
        {
          title: '下列哪一种条件更符合你的情况？',
          option: [
            { name: '1、已有数据源', value: 'SCENE_DATASOURCE' },
            { name: '2、已知业务场景', value: 'SCENE_TEMPLATE' },
          ],
        },
      ]

    };
  },
  watch: {
    senceDialog: function () {
      this.sencesVisible = this.senceDialog;
    },
    sencesVisible: function () {
      this.$emit('sencesVisible', this.sencesVisible)
    }
  },
  methods: {
    select(i, it, index) {
      if (index !== 2) {
        this.clearIconShow(index);
        it.iconshow = true;
        //异步家在下一步数据
        let rd = {};

        if (index === 0) {
          this.params.type = it.value === 'SCENE_DATASOURCE' ? true : ''
          this.params.type = it.value === 'SCENE_TEMPLATE' ? true : ''
          let url = '/dataflow/view/sysdict/' + it.value + '.do';
          this.common.reqBackState(url).then(result => {
            if (!result.state) {
              return
            }
            if (it.value === 'DATA_SOURCE') {
              rd.title = '下列哪一类数据源是你已有的？'
            } else {
              rd.title = '下列哪一种场景是你已知的？'
            }
            rd.option = result.data;
          })
        }
        if (index === 1) {
          if (this.params.type) { this.params.type = it.value; this.params.dataSource = null; }
          else { this.params.dataSource = it.value; this.params.type = null; }
          axios.post("/dataflow/view/scene/guide.do", this.params).then(response => {
            let result = response.data;
            if (!result.state) {
              return
            }
            rd.title = '下面这些场景中就有一个是你想要找的:';
            rd.option = result.data;
          })
        }
				this.listdata.push(rd);
      }
      //跳转
      setTimeout(() => {
        if (index !== 2)
          this.active = index + 1;
      }, 200)

    },
    //返回上一步
    stepback(i) {
      if (this.active >= i) {
				this.active = i;
				this.listdata.splice(i+1, 2-i)
        this.clearIconShow(i);
      }
    },
    close() {
      this.listdata.splice(1, 2)
      this.clearIconShow(0);
      this.active = 0
    },
    clearIconShow(i) {
      this.listdata[i].option.forEach((item) => { item.iconshow = false; })
    }

  },
  created() {


  }
};
</script>