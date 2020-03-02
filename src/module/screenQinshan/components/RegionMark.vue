<template>
  <qinshan-component-panel>
    <ul class="region-mark-nav">
      <li><a href="#"><i class="Illegal-icon"></i>违规</a></li>
      <li><a href="#"><i class="leak-icon"></i>漏洞</a></li>
      <li><a href="#"><i class="virus-icon"></i>病毒</a></li>
    </ul>
    <div class="qs-map">

      <div :class="classNames[index]" v-for="(item, index) in mapDesc">
        <template v-for="child in mapData[mapDesc[index]]">
          <img v-if="child.name ==='违规'"
               :title="'违规数：' + child.count"
               src="/static/images/screen_qs/Illegal.png"/>
          <img v-if="child.name ==='漏洞'"
               :title="'漏洞数：' + child.count"
               src="/static/images/screen_qs/leak.png"/>
          <img v-if="child.name ==='病毒'"
               :title="'病毒数：' + child.count"
               src="/static/images/screen_qs/virus.png"/>
        </template>
        <p>{{mapDesc[index]}}</p>
      </div>
        <div class="fourplant" @click="editAnnouncement">
          <p v-if="value<=60" class="number-red">{{value}}</p>
          <p v-if="value>60&&value<=90" class="number-blue">{{value}}</p>
          <p v-if="value>90" class="number-green">{{value}}</p>
          <p class="name">系统安全评分</p>
        </div>

    </div>
    <qinshan-dialog
        :dialog="dialog"
        @close="dialogClose">
      <textarea class="edit-text-score" v-model="dialog.announcement"></textarea>
      <div>
        <el-button class="float-r" type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </qinshan-dialog>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import QinshanDialog from "./QinshanDialog";
  const markType = ["违规", "漏洞", "病毒"];
  const mapDesc = ["一厂区", "二厂区", "三厂区"];

  export default {
    components: {QinshanComponentPanel,QinshanDialog},
    name: "region-mark",
    data () {
      return {
        mapData: {},
        mapDesc: mapDesc,
        classNames: ['oneplant', 'twoplant', 'threeplant'],
        value: 90,
        dialog: {
          title: '修改安全评分', visible: false,
          announcement: ''
        }
      }
    },
    methods: {
      editAnnouncement() {
        this.dialog.announcement = this.value;
        this.dialog.visible = true;
      },
      dialogClose () {
        this.dialog.visible = false;
      },
    async  editConfirm () {
        this.dialogClose();
        this.value = this.dialog.announcement;
        var params={};
        params.value=this.value;
        var msg = await this.common.req("/ssa/screenExhibit/updateScore_QS.do",params, this);
        // if(msg.ret_msg=="success"){
        //   this.$message({message:"创建成功,任务ID:"+msg.data.task_id,type: 'success' });
        //   this.$router.go(-1);
        // }else{
        //   this.$message({message: "创建失败:"+msg.data.param_error,type: 'error'});
        // }

      },
      init(data) {
        let mapData= {};
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < mapDesc.length; j++) {
            if (!mapData[mapDesc[j]]) {
              mapData[mapDesc[j]] = [];
            }
            if (data[i].cqName === mapDesc[j]) {
              let flag = false;
              mapData[mapDesc[j]].map((item) => {
                if (item.name === data[i].name) {
                  item.count += data[i].count;
                  flag = true;
                }
                return item;
              });
              !flag && mapData[mapDesc[j]].push(data[i]);
            }
          }
        }
        this.mapData = mapData;
      },
        async refreshData(){
          let data = await this.common.req('/ssa/screenExhibit/getCustomEvent.do',
              {dataRange: 'month'}, this);
          // let data = [{"eventThreeType_s":"31302","cqName":"一厂区","eventType_s":"203","count":20,"name":"病毒","event_dest_ip":"10.16.14.0"},{"eventThreeType_s":"31302","cqName":"二厂区","eventType_s":"203","count":12,"name":"病毒","event_dest_ip":"10.168.90.24"},{"eventThreeType_s":"31302","cqName":"三厂区","eventType_s":"203","count":2,"name":"病毒","event_dest_ip":"10.168.112.0"},{"eventThreeType_s":"31302","cqName":"一厂区","eventType_s":"203","count":20,"name":"病毒","event_dest_ip":"10.16.14.0"},{"eventThreeType_s":"23201","cqName":"二厂区","eventType_s":"303","count":1,"name":"漏洞","event_dest_ip":"10.168.90.24"}];
          this.init(data);
          var score = await this.common.req("/ssa/screenExhibit/getScore_QS.do",null, this);
          this.value=score[0].value;

        }
    },
    created () {
      this.refreshData();
      setInterval(() => {
        this.refreshData();
      }, 60000);
    },

  }
</script>

<style scoped>
  ul.region-mark-nav li {
    float: left;
    line-height: 40px;
    font-size: 14px;
    margin-right: 30px;
  }

  ul.region-mark-nav li a {
    color: rgba(255, 255, 255, .7);
  }

  .Illegal-icon {
    background: url(/static/images/screen_qs/Illegal.png) no-repeat;
    width: 22px;
    height: 19px;
    display: inline-block;
    margin-bottom: -5px;
    padding-right: 5px;
  }

  .leak-icon {
    background: url(/static/images/screen_qs/leak.png) no-repeat;
    width: 23px;
    height: 22px;
    display: inline-block;
    margin-bottom: -5px;
    padding-right: 5px;
  }

  .virus-icon {
    background: url(/static/images/screen_qs/virus.png) no-repeat;
    width: 19px;
    height: 22px;
    display: inline-block;
    margin-bottom: -5px;
    padding-right: 5px;
  }

  .qs-map {
    background: url(/static/images/screen_qs/qs-map.png) no-repeat;
    width: 100%;
    height: 452px;
    display: inline-block;
    text-align: center;
    line-height: 25px;
    color: #083a5e;
    font-size: 18px;
    font-weight: 600;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .oneplant {
    position: absolute;
    bottom: 90px;
    left: 230px;
  }

  .twoplant {
    position: absolute;
    top: 48%;
    right: 190px;
  }

  .threeplant {
    position: absolute;
    top: 120px;
    left: 230px;
  }

  .fourplant {
    position: absolute;
    top: 15%;
    right: 50px;
    color: #fff;
    font-size: 18px;
  }
.number-red{text-align:center;font-family: "ElementalEnd";font-size:46px; color:#FF0000; line-height: 80px; }
.number-blue{text-align:center;font-family: "ElementalEnd";font-size:46px; color:#FFA500; line-height: 80px; }
.number-green{text-align:center;font-family: "ElementalEnd";font-size:46px; color:#008B00; line-height: 80px; }
.name{text-align: center; color:rgba(35,255,255,0.7); font-size: 14px; }
.edit-text-score {
  width: 500px;
  background: transparent;
  color: white;
  padding: 10px;
  font-size: 20px;
}
</style>
