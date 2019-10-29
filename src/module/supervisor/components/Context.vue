<template>
  <div class="">

    <el-row :gutter="20">

      <el-col :span="12">
        <div class="el-panel-white">
          <!-- {{processList}} -->
          <div class="el-panel-white-heading">
            <div class="processgroup">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                  <span class="processgroupname">SSA进程组</span>
                </el-checkbox>
                <div class="button-group">
                  <el-button type="primary" size="small" @click="handleStopChecked()">停止全部</el-button>
                  <el-button type="orange" size="small" @click="handleStartChecked()">启动全部</el-button>
                </div>
            </div>
          </div>

          <div class="el-panel-white-body processgroup-panel">
            <div v-for="(item, index) in processList" v-if="item.group">
              <el-checkbox class="processgroupsubname" :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllProcessGroupChange($event, item)">
                <span> {{item.name}} </span>
                <div class="button" style="display: inline-block; float: right; padding-right: 20px;">
                  <el-button type="primary" size="mini" @click="stopProcessGroupByName(item)">暂停</el-button>
                  <el-button type="primary" size="mini" @click="startProcessGroupByName(item)">启动</el-button>
                </div>
              </el-checkbox>

              <el-checkbox-group class="processgroup-inner" v-model="item.checkedProcessGroup" @change="handleCheckedProcessGroupChange(item.checkedProcessGroup, item)">
                <el-checkbox class="processgroup-inner-content" v-for="processGroup in item.children" :label="processGroup.name" :key="processGroup.name">
                  <label class="adressip adress-collapse" @click="processGroup.expand=!processGroup.expand"><i :class="[processGroup.expand? 'progress-expand':'', 'el-icon-caret-right']" style="margin-right:8px; cursor: pointer;"></i>{{processGroup.name}}</label>
                  <span class="type-pause">--</span>
                  <span class="time">--</span>
                  <div class="button">
                    <el-button type="primary" size="mini" @click="handleStopProcessGroup(processGroup)">暂停</el-button>
                    <el-button type="primary" size="mini" @click="handleStartProcessGroup(processGroup)">启动</el-button>
                  </div>

                  <div :class="[processGroup.expand?'processgroup-expandx':'processgroup-expandy', 'processgroup-collapse-content']" :style="{height: processGroup.expand?processGroup.children.length*40+'px':'0', transition: 'all 0.5s', overflow: 'hidden'}">
                    <div v-for="p in processGroup.children">
                      <label class="adressip">{{p.name}}</label>
                      <!-- <a :href="processGroup.name+':9001/logtail/'+p.name" target="_blank">{{p.name}}</a> -->
                      <span :class="[p.state===20?'type':'type-pause']">
                        <i class="ion-loading-a m-r-8" v-if="p.state===10"></i>
                        {{p.state===20? '运行中':p.state===0?'已暂停':p.state===10?'重启中':'UNKNOWN'}}
                      </span>
                      <span class="time">
                        {{p.state===20?p.description.substring(p.description.indexOf('uptime')+6):p.state===0?p.description:'--'}}
                      </span>
                      <div class="button">
                        <el-button type="primary" size="mini" @click="handleStopProcess(p)">暂停</el-button>
                        <el-button type="primary" size="mini" @click="handleStartProcess(p)">启动</el-button>
                      </div>
                    </div>
                  </div>

                </el-checkbox>
              </el-checkbox-group>

            </div>
          </div>

        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      processList: [],
      checkAll: false,
      isIndeterminate: false
    };
  },
  methods: {
    handleStopChecked() {
      let num = this.getCheckedNum();
      if(num === this.processList.length) {
        let data = this.common.req('/ssa/processes/stopAllHostProcessGroup.do', {}, this);
      }else if(num === 0) {
        return;
      }else {
        let list = this.buildCheckedProcessGroupList();
        let data = this.common.requestWithComplexContent('/ssa/processes/batchStopProcessGroups.do', JSON.stringify(list), this);
      }
    },
    handleStartChecked() {
      let num = this.getCheckedNum();
      if(num === this.processList.length) {
        let data = this.common.req('/ssa/processes/startAllHostProcessGroup.do', {}, this);
      }else if(num === 0) {
        return;
      }else {
        let list = this.buildCheckedProcessGroupList();
        let data = this.common.requestWithComplexContent('/ssa/processes/batchStartProcessGroups.do', JSON.stringify(list), this);
      }
    },
    buildCheckedProcessGroupList() {
      let list = [];
      this.processList.forEach((item) => {

        item.checkedProcessGroup.forEach((c) => {
          item.children.forEach((pg) => {
            if(c === pg.name) {
              let obj = {hostIp: pg.name, group: pg.children[0].group};
              list.push(obj);
            }
          })
        })

      })
      return list;
    },
    stopProcessGroupByName(item) {
      let list = this.buildProcessGroupList(item);
      this.batchStopProcessGroups(list);
    },
    startProcessGroupByName(item) {
      let list = this.buildProcessGroupList(item);
      this.batchStartProcessGroups(list);
    },
    buildProcessGroupList(item) {
      let list = [];
      item.children.forEach((pg) => {
        let obj = {hostIp: pg.name, group: pg.children[0].group};
        list.push(obj);
      })
      return list;
    },
    batchStopProcessGroups(list) {
      let data = this.common.requestWithComplexContent('/ssa/processes/batchStopProcessGroups.do', JSON.stringify(list), this);
    },
    batchStartProcessGroups(list) {
      let data = this.common.requestWithComplexContent('/ssa/processes/batchStartProcessGroups.do', JSON.stringify(list), this);
    },
    handleStopProcessGroup(processGroup) {
      let data = this.common.req('/ssa/processes/stopProcessGroup.do', {hostIp: processGroup.name, group: processGroup.children[0].group}, this);
    },
    handleStartProcessGroup(processGroup) {
      let data = this.common.req('/ssa/processes/startProcessGroup.do', {hostIp: processGroup.name, group: processGroup.children[0].group}, this);
    },
    handleStopProcess(progress) {
      let data = this.common.req('/ssa/processes/stopProcess.do', progress, this);
    },
    handleStartProcess(progress) {
      let data = this.common.req('/ssa/processes/startProcess.do', progress, this);
    },

    //以下为checkbox处理方法
    handleCheckAllChange(event) {
      if(event.target.checked) {
        this.processList.forEach((pg) => {
          pg.checkAll = true;
          pg.checkedProcessGroup = this.getAllProcessGroups(pg.children);
        })
      }else {
        this.processList.forEach((p) => {
          p.checkAll = false;
          p.checkedProcessGroup = [];
        })

      }
      this.isIndeterminate = false;
    },
    getAllProcessGroups(children) {
      let list = [];
      children.forEach((c) => {
        list.push(c.name);
      })
      return list;
    },
    handleCheckAllProcessGroupChange(event, item) {
      console.log(event);
      console.log(item);
      item.checkedProcessGroup = event.target.checked ? this.getItemAll(item) : [];
      item.isIndeterminate = false;
      this.calculateAll();
    },
    getItemAll(item) {
      let list = [];
      item.children.forEach((pg) => {
        list.push(pg.name);
      })
      return list;
    },
    handleCheckedProcessGroupChange(value, item) {
      console.log(value);
      console.log(item);
      let checkedCount = value.length;
      item.checkAll = checkedCount === item.children.length;
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.children.length;
      this.calculateAll();
    },
    calculateAll() {
      let num = this.getCheckedNum();
      console.log('num:'+num);
      if(num === 0) {
        this.checkAll = false;
        this.isIndeterminate = false;
      }else if (num === this.processList.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      }else {
        this.checkAll = false;
        this.isIndeterminate = true;
      }
    },
    getCheckedNum() {
      let num = 0;
      this.processList.forEach((pg) => {
        if(pg.checkAll) {
          num ++;
        }
      });
      return  num;
    },
    formatData(data) {
      let list = [];
      data.forEach((d) => {
        d.checkAll = false;
        d.isIndeterminate =false;
        d.checkedProcessGroup = [];
        console.log(d.children[0]);
        if(d.children[0].children[0]) {
          d.group = d.children[0].children[0].group;
          list.push(d);
        }
        d.children.forEach((dc) => {
          dc.expand = false;
        })
      })
      this.processList = list;

      // let list = [];
      // // let ao = {name: 'ssa', children: [], checkAll: false, isIndeterminate: false, checkedProcessGroup: [], group: ''};
      // // let bo = {name: 'report', children: [], checkAll: false, isIndeterminate: false, checkedProcessGroup: [], group: ''};
      // // let co = {name: 'db', children: [], checkAll: false, isIndeterminate: false, checkedProcessGroup: [], group: ''};
      // // let eo = {name: 'ohter', children: [], checkAll: false, isIndeterminate: false, checkedProcessGroup: [], group: ''};
      //  let ao = Object.create({ value: 'ssa', writable: true, enumerable: true, configurable: true });
      //  let bo = Object.create({ value: 'report', writable: true, enumerable: true, configurable: true });
      //  let co = Object.create({ value: 'db', writable: true, enumerable: true, configurable: true });
      //  let eo = Object.create({ value: 'ohter', writable: true, enumerable: true, configurable: true });
      //  list = [ao, bo, co, eo];
      //  list.forEach((obj) => {
      //    Object.defineProperties(obj, {
      //      children:{value: [], writable: true},
      //      checkAll:{value: false, writable: true},
      //      isIndeterminate:{value: false, writable: true},
      //      checkedProcessGroup:{value: [], writable: true},
      //      group:{value: '', writable: true}
      //    });
      //  })
      //
      // Object.keys(data).forEach((key) => {
      //   let ssaList = [];
      //   let reportList = [];
      //   let dbList = [];
      //   let otherList = [];
      //   data[key].forEach((p) => {
      //     let name = p.name;
      //     if(name.startsWith('hot')) {
      //       ssaList.push(p);
      //     }else if (name.startsWith('cat')) {
      //       reportList.push(p);
      //     }else if (name.startsWith('db')) {
      //       dbList.push(p);
      //     }else {
      //       otherList.push(p);
      //     }
      //
      //   })
      //   let a = {name: key, children: ssaList};
      //   let b = {name: key, children: reportList};
      //   let c = {name: key, children: dbList};
      //   let d = {name: key, children: otherList};
      //   list[0].children.push(a);
      //   list[1].children.push(b);
      //   list[2].children.push(c);
      //   list[3].children.push(d);
      // })
      // let newList = [];
      // list.forEach((obj) => {
      //   if(obj.children[0].children[0]){
      //     obj.group = obj.children[0].children[0].group;
      //     newList.push(obj);
      //   }
      // })
      // console.log(list);
      // this.processList = newList;
    }
  },
  created: async function() {
    let data = await this.common.req('/ssa/processes/getAllHostProcessInfo.do', {}, this);
    console.log(data);
    this.formatData(data);

  }
}
</script>

<style>
.progress-expand {
  transform: rotate(90deg);
}
.processgroup-expandx {
  margin-top: 0;
}
.processgroup-expandy {
  margin-top: -14px;
}
</style>
