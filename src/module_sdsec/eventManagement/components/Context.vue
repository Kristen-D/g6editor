<!--搜索按钮-->
<template>
  <div>
    <section>
      <div class="container-fluid">
        <el-row :gutter="10">
          <el-col :span="4">
          </el-col>
          <el-col :span="24">
            <div class="el-panel">
              <div class="search sass-search" >

                <!--普通搜索-->
                  <div class="ordinary-search">
                  <el-form :inline="true" :model="simpleQueryForm" class="demo-form-inline">
                    <el-form-item label="事件类型" >
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.eventType">
                        <el-option label="类型1" value="on"></el-option>
                        <el-option label="类型2" value="off"></el-option>
                        <el-option label="类型3" value="draft"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="事件来源" style="display: inline-block;">
                      <el-select clearable placeholder="请选择" v-model="simpleQueryForm.filters.eventSource">
                        <el-option label="来源1" value="protect"></el-option>
                        <el-option label="来源2" value="audit"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上报时间" style="">
                      <el-date-picker
                        v-model="simpleQueryForm.filters.timeRange"
                        type="datetimerange"
                        size=""
                        @change="dateChange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                      </el-date-picker>
                    </el-form-item>

                    <el-button type="primary" size="small" @click="simpleQueryData">搜索</el-button>

                  </el-form>
            </div>
                <div class="commonMsg" style="display: flex;justify-content:space-around;height: 60px;width: 35%;margin: auto;">
                  <div style="color: #DA001C;line-height: 60px;font-size: 14px">误报{{missReportNum}}个</div>
                  <div style="border-left: 1px solid #e0e0e0;height: 50%;margin: auto;"></div>
                  <div style="color: #F59B23;line-height: 60px;font-size: 14px">阻断{{interruptNum}}个</div>
                  <div style="border-left: 1px solid #e0e0e0;height: 50%;margin: auto;"></div>
                  <div style="color: #0A5EA9;line-height: 60px;font-size: 14px">待处理{{todoNum}}个</div>
                </div>
              </div>
                <EventTable :tableId="tableId"></EventTable>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>

</template>

<script>
    import EventTable from './EventTable'
    import {mapState} from 'vuex'
    export default {
      components:{
        EventTable,
      },
      data(){
        return {
          tableId: 'eventTable',
          simpleQueryForm:{
              filters:{eventType:'', eventSource:'',timeRange:[]},

          },
          interruptNum:133331,
          missReportNum:21,
          todoNum:23,
        }
      },

      methods:{
        simpleQueryData:function(){
          // console.log("点击搜索按钮");
          this.$store.state.context[this.tableId].load = true;
          var params = this.simpleQueryForm;

          this.$store.commit('setParams', [this.tableId, params]);
          this.$store.dispatch('', [this.tableId]);
        },

        dateChange:function () {

        }

      },
      computed:{
        ...mapState({
        })
      },
      created: async function(){
      }
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

</style>
