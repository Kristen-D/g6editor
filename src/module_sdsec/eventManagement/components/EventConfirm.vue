<template>
  <div>
    <section>
      <div class="container-fluid">
        <div class="el-panel">
          <div class="el-panel-heading flexBetween">
            <div class="top-title">{{title}}</div>
            <div>
              <el-button type="danger" style="width: 100px" size="small" @click="">阻断</el-button>
              <el-button type="warning" style="width: 100px" size="small" @click="">误报</el-button>
              <el-button type="info" style="width: 100px" size="small" @click="">忽略</el-button>
            </div>
          </div>
          <el-collapse class="custom-collapse" v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="el-collapse-heading">
                  <h4 class="el-panel-title2">事件详情</h4>
                </div>
              </template>
              <div class="el-panel-body">
                <div class="info-item">
                  <p class="info-label">事件编号：<span>{{eventBaseInfo.eventId}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">事件来源：<span>{{eventBaseInfo.source}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">事件描述：<span>{{eventBaseInfo.description}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">事件影响：<span>{{eventBaseInfo.result}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">应对措施：<span>{{eventBaseInfo.action}}</span></p>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>

          <div>


            <el-collapse class="custom-collapse" v-model="activeNames">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="el-collapse-heading">
                    <h4 class="el-panel-title2">攻击画像</h4>
                  </div>
                </template>
                <div class="el-panel-body">
                  <div class="info-item">
                    <p class="info-label">攻击IP：<span>{{attackPortrait.attackIP}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">攻击端口：<span>{{attackPortrait.attackPort}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">攻击IP归属：<span>{{attackPortrait.IPBelong}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">攻击目标IP：<span>{{attackPortrait.destinationIP}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">攻击目标端口：<span>{{attackPortrait.destinationPort}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">受害IP归属：<span>{{attackPortrait.destinationIPBelong}}</span></p>
                  </div>
                  <div class="info-item">
                    <p class="info-label">受害IP指纹信息：<span>{{attackPortrait.destinationIPFinger}}</span></p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>

          </div>

          <el-collapse class="custom-collapse" v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <div class="el-collapse-heading">
                  <h4 class="el-panel-title2">情报联动</h4>
                </div>
              </template>
              <div class="el-panel-body">
                <div class="info-item">
                  <p class="info-label">情报编号：<span>{{intelligence.number}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">黑IP：<span>{{intelligence.blackIP}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">活跃次数：<span>{{intelligence.activityTimes}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">最近一次发起攻击时间：<span>{{intelligence.lastAttack}}</span></p>
                </div>
                <div class="info-item">
                  <p class="info-label">攻击手段：<span>{{intelligence.attackMeans}}</span></p>
                </div>
                <div class="historyTrace" style="margin-bottom: 50px;">
                  <p class="info-label" style="height: 100px;margin-right: 22px">历史轨迹：</p>
                  <div style="width: 90%;display: flex;flex-wrap: wrap;">
                    <div v-for="(item,index) in intelligence.history" :key="item" style="padding-top:20px;height: 220px;text-align: center;width: 200px">
                      <div style="margin-bottom: 16px;color: rgba(62,73,86,0.6);font-family: MicrosoftYaHei">
                        {{dateSplit(item.time)}} <br/>{{timeSplit(item.time)}}
                      </div>
                      <div style="border-bottom: 1px solid #e0e0e0;height: 8px;">
                        <div class="history-step-icon">{{index+1}}</div>
                      </div>
                      <div style="border-left: 1px solid #e0e0e0;margin: 20px auto 12px;height:30px;width: 0;"></div>
                      <div style="text-align: center;font-family: MicrosoftYaHei;color: rgba(62,73,86,0.6);
                          overflow:hidden;
                          text-overflow:ellipsis;
                          display:-webkit-box;
                          -webkit-line-clamp:3;
                          -webkit-box-orient:vertical;" :title="item.description">
                        {{item.description}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        title: '事件处置',
        activeNames: ['1'],
        form: [],
        eventBaseInfo:{
          eventId:'1111',
          source:'防火墙',
          description:'黑客通过密码字典尝试。。。',
          result:'影响客户的正常登陆',
          action:'设置登陆限制',
        },
        attackPortrait: {
          attackIP:"1.1.1.1",
          attackPort: "123",
          IPBelong: "中国",
          destinationIP: "4.4.4.4",
          destinationPort: '111',
          destinationIPBelong: "中国",
          destinationIPFinger: "sad"
        },
        intelligence: {
          number: 'sa',
          blackIP: '1.1.1.1',
          activityTimes: 500,
          lastAttack: '2020010101',
          attackMeans: '手段',
          history:[
            {time:'2020-01-01 20:00:11',description:'文字描述'},
            {time:'2020-01-01 20:00:11',description:'文字描述'},
            {time:'2020-01-01 20:00:11',description:'文字描述'},
            {time:'2020-01-01 20:00:11',description:'文字描述'},
            {time:'2020-01-01 20:00:11',description:'文字描述'},
          ]
        }
      }
    },

    methods: {

      dateSplit: function (val) {
        return val.split(" ")[0];
      },
      timeSplit: function(val) {
        return val.split(" ")[1];
      },

      goBack: function () {
        this.$router.go(-1);
      },


    },

    computed: {},

    created: async function () {

    },
    watch: {
      form: function (oldVal, curval) {
        console.log("watch:" + JSON.stringify(curval));
      },

      product: function (choosedImage) {
        console.log("product" + choosedImage)
      }
    }
  }
</script>

<style scoped>
  .el-collapse-heading {
    padding: 0 15px;
  }

  .el-collapse-heading h4 {
    display: inline-block;
  }

  .el-panel-body {
    padding-left: 30px;
  }

  .info-label {
    color: #606266;
    font-size: 14px;
    line-height: 35px;
    vertical-align: middle;
    padding-bottom: 5px;
  }

  .info-label span {
    color: #303133;
    padding-left: 10px;
  }

  .historyTrace {
    display: flex;
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
    width: 16.48% !important
  }

  .custom-width {
    width: 50%;
  }

  .addbutton {
    padding-right: 20px !important;
    line-height: 40px;
  }

  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
  }

  .history-step-icon {
    background-color: #007BE8;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    color:#fff;
    text-align:center;
    line-height: 16px;
    font-size: 12px;
    margin: 0 auto;
  }

  .top-title {
    padding-left: 20px;
    font-size: 16px;
    line-height: 55px;
    color: #000;
    font-weight: 500;
    text-shadow: 0 0 black;
  }
</style>
<style>
  .custom-form .el-form-item__label {
    float: none;
  }

  .custom-collapse.el-collapse {
    border-top: none;
  }

  .custom-collapse .el-collapse-item__header, .custom-collapse .el-collapse-item__wrap {
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

</style>
