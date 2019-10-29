<template>
<div>
  <div class="Box_con clearfloat">
    <span class="btnl btn" id="btnl"><i class="el-icon-arrow-left"></i></span>
    <span class="btnr btn" id="btnr"><i class="el-icon-arrow-right"></i></span>

    <div class="conbox" id="BoxUl">
      <ul class="slider">
        <li class="cur" v-for="item in sliderData">
          <div class="box sbox" style="height:98%; margin:2px 1px 0;">
            <span class="box-tl sbox-stl"></span><span class="box-br sbox-br"></span>
            <div class="top clearfloat">
              <label class="ip">{{item.ip}}</label>
              <el-button type="primary" class="float-r" @click="showDetail(item.ip)">查看</el-button>
            </div>
            <div class="bottom ">
              <p class="m-b-20 clearfloat"><img :src="item.img" class="float-l" /><label class="float-l m-l-25 country">{{item.country}}</label></p>
              <p>{{item.date}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <el-dialog title="告警事件详情" :visible.sync="dialogVisible" class="dialog-GDNX">
    <table class="AttackEvent-table" style="width:100%">
      <tr v-for="item in AttackEventDetail">
        <th align="right" width="168">{{item.name}}</th>
        <td align="left">
          <span class="level-square text-s" :class="item.extraClass" v-if="item.levelshow">{{item.level}}</span>
          {{item.data}}
        </td>
      </tr>
    </table>
  </el-dialog>
</div>
</template>

<style scoped>
.slider .top {
  margin: 27px 25px;
  font-size: 24px;
  font-family: "Helvetica";
}

.slider .el-button {
  padding: 4px 12px;
  border: 1px solid #374582;
}

.slider .bottom {
  margin: auto 25px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Helvetica";
}

.slider .bottom .country {
  display: inline-block;
  line-height: 28px;
}

.AttackEvent-table {
  width: 100%;
  border-spacing: 4px;
}

.AttackEvent-table th,
.AttackEvent-table td {
  padding: 0 20px;
  line-height: 40px;
  border: 1px solid rgba(36, 49, 116, 0.8);
  background-color: #0a154d;
}

.AttackEvent-table th {
  font-weight: normal;
  border: 1px solid rgba(15, 31, 114, 0.8);
  background-color: #060d33;
}

.AttackEvent-table .level-square {
  border-radius: 0;
  padding: 4px 7px;
}

.m-b-20 img {
  width: 44px;
  height: 28px;
}

/************ 轮播样式 *********************/

.Box_con {
  position: relative;
  margin: 0 auto;
  width: 92%;
}

.Box_con .btn {
  display: block;
  width: 41px;
  height: 41px;
  position: absolute;
  top: 80px;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  line-height: 40px;
  color: #fff;
}

.Box_con .btnl {
  left: -52px;
}

.Box_con .btnr {
  right: -52px;
}

.Box_con .btn:hover {
  color: #007BE8;
}

.Box_con .conbox {
  overflow: hidden;
}

.Box_con .conbox ul {
  position: relative;
}

.Box_con .conbox ul li {
  float: left;
  width: 336px;
  height: 180px;
  margin: 0 10px;
  overflow: hidden;
}

.Box_con .conbox ul li:first-child {
  margin-left: 0;
}
</style>

<script>
import { countriesCode }
from 'static/static_web/images/country-flags-master/countries-Chinese'

export default {
  data() {
    return {
      dialogVisible: false,
      sliderData: [
      ],
      AttackEventDetail: [{
        name: "攻击类型",
        data: "",
      }, {
        name: "风险级别",
        level: "高危",
        levelshow: true,
        extraClass: "circle-high"
      }, {
        name: "源地址",
        data: "",
      }, {
        name: "事件数",
        data: "",
      }, {
        name: "资产名称",
        data: "",
      }, {
        name: "资产归属",
        data: "",
      }, {
        name: "关键字",
        data: "",
      }, {
        name: "告警内容",
        data: "",
      }, ]
    }
  },
  beforeMount() {

  },
  mounted() {
    this.getRecentAttack();
    //滚动元素id，左切换按钮，右切换按钮，切换元素个数id,滚动方式，切换方向，是否自动滚动，滚动距离，滚动时间，滚动间隔，显示个数
    // LbMove('BoxUl', 'btnl', 'btnr', 'BoxSwitch', true, 'left', true, 356, 1000, 3000, 5);
  },
  methods: {
    //获取轮播告警信息
    async getRecentAttack() {
      const reqUrl = "/ssa/bigGznxOffshoreAttack/getRecentAttack.do";
      await this.commonAjax.req(reqUrl, null, this).then((data) => {
        data.forEach((item) => {
          let attack = {};
          attack.ip = item.src_ip;
          attack.img = this.getFlagLocationByName(item.src_country_name);
          attack.country = item.src_country_name + " • " + item.src_city_name;
          attack.date = item.alarm_time;
          this.sliderData.push(attack);
        });
      });
      LbMove('BoxUl', 'btnl', 'btnr', 'BoxSwitch', true, 'left', true, 356, 1000, 3000, 5);
    },
    //获取国家对应图片
    getFlagLocationByName(name) {
      const preffix = "/static/static_web/images/country-flags-master/png100px/";
      const suffix = ".png";
      const countryCode = countriesCode[name];
      return preffix + countryCode + suffix;
    },
    //弹框
    async showDetail(ip) {
      const reqUrl = "/ssa/bigGznxOffshoreAttack/getAlarmInfo.do";
      const params = {
        "ip": ip
      };
      await this.commonAjax.req(reqUrl, params, this).then((data) => {
        let color;
        if (data.level === '高危') {
          color='circle-high';
        } else if (data.level === '中危') {
          color='circle-medium';
        } else if (data.level === '低危') {
          color='circle-low';
        }
        const attackDetail = [
          {
            name: "攻击类型",
            data: data.event_type,
          }, {
            name: "风险级别",
            level: data.level,
            levelshow: true,
            extraClass: color
          }, {
            name: "源地址",
            data: data.src_ip + "  " + data.src_country_name + " · " + data.src_city_name
          }, {
            name: "事件数",
            data: data.sum,
          }, {
            name: "资产名称",
            data: data.asset_name,
          }, {
            name: "资产归属",
            data: data.org_name,
          }, {
            name: "关键字",
            data: data.alarm_key
          }, {
            name: "告警内容",
            data: data.alarm_desc
          }
        ];
        if (attackDetail != null) {
          this.AttackEventDetail = attackDetail;
        }
      });
      //弹出弹框
      this.dialogVisible = true
    }
  }
};
</script>
