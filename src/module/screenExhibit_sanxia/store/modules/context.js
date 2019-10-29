import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'
import {
  highAlarmTrend,
  middleAlarmTrend,
  attackTrend,
  threatedTrend,
  attackPie,
  attackBar,
  worldAttackMap
} from "../../components/ChartOptions";
import MapHandle from '../../components/mapDataHandle';

const status = {
  3: "已完成",
  2: "未完成"
};
const MAP_TYPE = ['world', 'china'];

const HIGH = 3,
  MIDDLE = 2;
const FINISHED = 3,
  UNFINISHED = 2;

const state = {
  eventThreatList: {},
  eventThreatListUrl: "/ssa/netAttack/getEventThreatList.do",
  params: {
    externalIp_s: 1, // 1全球,0广东,2全部
    dateRange: 'month',
    type: 0,
    timeValue: 1,
    timeType: 2
  },
  highAlarm: highAlarmTrend,
  highAlarmTotal: 0,
  middleAlarm: middleAlarmTrend,
  middleAlarmTotal: 0,
  attackTrend: attackTrend,
  threatedTrend: threatedTrend,
  attackType: [],
  deviceList: [],
  dstIpList: [],
  attackPie: attackPie,
  srcIpList: [],
  srcIps: [],
  attackBar: attackBar,
  geoData: [],
  mapChart: worldAttackMap,
  smallWorld: true,
  smallGd: false,
  alarmSmallTitle:"今日",
  isSearch:false,
  dstIpListAll:[],
  alarmAllTotal:0,
  blockTotal:0,
  blockCenter:100
};

const getAlarmInfoUrl = '/ssa/screenExhibit/getAlarmInfo.do';
const getLineByEventTypeUrl = '/ssa/screenExhibit/getLineByEventType_GD.do';
const getEventSubTypeUrl = '/ssa/screenExhibit/getEventThreatType_GD.do';
const getEventSrcIpUrl = '/ssa/screenExhibit/getEventSrcIpOnMap_GD.do';
const getEventDstIpUrl = '/ssa/screenExhibit/getEventDestIpOnMap_GD.do';
const getAssetNameUrl = '/ssa/screenExhibit/getAssetNameNetAttack_GD.do';
const geoCoordMapUrl = '/ssa/hitLibrary/getGeoCoordMap.do';
const getBlockInfoUrl = '/ssa/screenExhibit/getAlarmInfo.do';

const mutations = {
  [types.SET_BLOCK_INFO](state, data) {

   state.alarmAllTotal=0;
   state.blockTotal=0;
   state.blockCenter=100;

      data.lineData.map(value => {
        if (value.flow_status == FINISHED) {
          state.blockTotal += value.count;
          state.alarmAllTotal += value.count;
        } else if (value.flow_status == UNFINISHED) {
          state.alarmAllTotal += value.count;
        }
      });
      if (state.alarmAllTotal==0) {
        state.blockCenter = 0
      }else {
        state.blockCenter=state.blockTotal/state.alarmAllTotal;
      }

      state.blockCenter=state.blockCenter*100;
      state.blockCenter=state.blockCenter.toFixed(2);
  },

  [types.SET_PARAMS](state, data) {
    state.params = data;
  },

  [types.EVENT_THREAT_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.eventThreatList[data[i].id] = data[i].text;
    }
  },
  [types.SET_HIGH_ALARM](state, data) {
    state.highAlarmTotal = 0;
    state.highAlarm.series[0].data = [];
    state.highAlarm.series[1].data = [];

    data.lineData.filter(value => {
      return value.alarm_grade == HIGH;
    }).map(value => {
      if (value.flow_status == FINISHED) {
        state.highAlarm.series[0].data.push([value.days, value.count]);
        state.highAlarmTotal += value.count;
      } else if (value.flow_status == UNFINISHED) {
        state.highAlarm.series[1].data.push([value.days, value.count]);
        state.highAlarmTotal += value.count;
      }

    });

    for(var i = 0; i < data.xAxis.length; i++){
        var isOk=0;
        for(var j = 0; j < state.highAlarm.series[0].data.length; j++){
           if(data.xAxis[i]==state.highAlarm.series[0].data[j][0]){
             isOk=1;
           }
        }
      if(isOk==0){
        state.highAlarm.series[0].data.splice(i, 0,[data.xAxis[i],0]);
      }
    }

    for(var i = 0; i < data.xAxis.length; i++){
        var isOk=0;
        for(var j = 0; j < state.highAlarm.series[1].data.length; j++){
           if(data.xAxis[i]==state.highAlarm.series[1].data[j][0]){
             isOk=1;
             break;
           }
        }
      if(isOk==0){
        state.highAlarm.series[1].data.splice(i, 0,[data.xAxis[i],0]);
      }
    }

      state.highAlarm.xAxis.data = data.xAxis;
  },
  [types.SET_MIDDLE_ALARM](state, data) {
    state.middleAlarmTotal = 0;
    state.middleAlarm.series[0].data = [];
    state.middleAlarm.series[1].data = [];


    data.lineData.filter(value => {
      return value.alarm_grade == MIDDLE;
    }).map(value => {
      if (value.flow_status == FINISHED) {
        state.middleAlarm.series[0].data.push([value.days, value.count]);
        state.middleAlarmTotal += value.count;
      } else if (value.flow_status == UNFINISHED) {
        state.middleAlarm.series[1].data.push([value.days, value.count]);
        state.middleAlarmTotal += value.count;
      }

    });


    for(var i = 0; i < data.xAxis.length; i++){
        var isOk=0;
        for(var j = 0; j < state.middleAlarm.series[0].data.length; j++){
           if(data.xAxis[i]==state.middleAlarm.series[0].data[j][0]){
             isOk=1;
           }
        }
      if(isOk==0){
        state.middleAlarm.series[0].data.splice(i, 0,[data.xAxis[i],0]);
      }
    }

    for(var i = 0; i < data.xAxis.length; i++){
        var isOk=0;
        for(var j = 0; j < state.middleAlarm.series[1].data.length; j++){
           if(data.xAxis[i]==state.middleAlarm.series[1].data[j][0]){
             isOk=1;
             break;
           }
        }
      if(isOk==0){
        state.middleAlarm.series[1].data.splice(i, 0,[data.xAxis[i],0]);
      }
    }

      state.middleAlarm.xAxis.data = data.xAxis;
  },
  [types.SET_ATTACK_PIE](state, data) {
    let values = [0, 0];
    data.lineData.map(value => {
      values[value.flow_status == FINISHED ? 1 : 0] += value.count;
    });
    // state.attackPie.series[0].data[0].value = values[0];
    // state.attackPie.series[0].data[1].value = values[1];
    let v = [{
        value: 0,
        name: '未完成'
      },
      {
        value: 0,
        name: '已完成'
      }
    ];
    if (values[0] === 0) {
      v[1].value = values[1];
      state.attackPie.series[0].data = [v[1]];
    } else if (values[1] === 0) {
      v[0].value = values[0];
      state.attackPie.series[0].data = [v[0]];
    } else {
      v[0].value = values[0];
      v[1].value = values[1];
      state.attackPie.series[0].data = v;
    }
  },
  [types.SET_ATTACK_TREND](state, data) {
    let seriesData = [];
    data.lineData.map((line) => {
      seriesData.push([line.days, line.count]);
    });
    state.attackTrend.xAxis.data = data.xAxis;
    state.attackTrend.series[0].data = seriesData;
  },
  [types.SET_THREATED_TREAD](state, data) {
    let seriesData = [];
    data.lineData.map((line) => {
      seriesData.push([line.days, line.count]);
    });
    state.threatedTrend.xAxis.data = data.xAxis;
    state.threatedTrend.series[0].data = seriesData;
  },
  [types.GET_EVENT_SUB_TYPE](state, data) {
    state.attackType = data[0].map(value => {
      return {
        count: value.count,
        name: state.eventThreatList[value.event_threat_type],
        event_threat_type:value.event_threat_type
      }
    });

  },
  [types.GET_ASSET_NAME](state, data) {
    state.deviceList = data[0].map(value => {
      return {
        count: value.count,
        name: value.asset_name,
        event_dest_ip:value.event_dest_ip
      }
    });
  },
  [types.GET_EVENT_DST_IP](state, data) {
    state.dstIpList = data.result.map(value => {
      return {
        count: parseInt(value.total),
        name: value.ipSourceName
      }
    }).sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });
    state.dstIpListAll = data.ipList;
  },
  [types.GET_EVENT_SRC_IP](state) {
    let result = [];
    if (state.smallWorld) {
      result = MapHandle.loadMapChartData(state.geoData, state.srcIps);
    } else {
      result = MapHandle.loadMapChartData(state.geoData, state.srcIps);
    }

    state.mapChart.series = result;

    if (state.smallWorld && state.mapChart.geo.map !== MAP_TYPE[0]) {
      state.mapChart.geo.map = MAP_TYPE[0];
    } else if (!state.smallWorld && state.smallGd && state.mapChart.geo.map !== MAP_TYPE[1]) {
      state.mapChart.geo.map = MAP_TYPE[1];
    }

  },
  [types.SET_EVENT_SRC_BAR](state) {
    if (state.srcIpList.result.length > 20) {
      state.srcIps = state.srcIpList.result.slice(0, 20);
    } else {
      state.srcIps = state.srcIpList.result;
    }
    state.srcIps.sort((a, b) => {
      return parseInt(a.total) > parseInt(b.total) ? -1 : 1;
    });
    let data = state.srcIps;
    let res = [];
    for (let i = 0; i < data.length || i < 10; i++) {
      if (i >= data.length) {
        res[i] = {
          name: '暂无',
          value: 0
        };
      } else {
        res[i] = {
          name: data[i].ipSourceName,
          value: parseInt(data[i].total)
        };
      }
      if (i >= 3) {
        res[i].itemStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#46bee9' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#e2e2e3' // 100% 处的颜色
            }], false)
          }
        }
      }
    }
    // res.sort((a, b) => {
    //   return a.value > b.value ? -1 : 1;
    // });

    state.attackPie.yAxis.data = res.slice(0, 10).map(v => v.name).reverse();
    state.attackPie.series[1].data = res.slice(0, 10).reverse();
  },
  [types.GET_GEO_COORD_MAP](state, data) {
    state.geoData = data;
  },
  [types.ON_SMALL_MAP_CHANGE](state, {
    type,
    dispatch,
    commit
  }) {
    switch (type) {
      case MAP_TYPE[0]:
        state.smallGd && (state.smallWorld = !state.smallWorld);
        break;
      case MAP_TYPE[1]:
        state.smallWorld && (state.smallGd = !state.smallGd);
        break;
    }
    if (state.smallGd && state.smallWorld) {
      state.params.externalIp_s = 2;
    } else if (state.smallWorld) {
      state.params.externalIp_s = 1;
    } else {
      state.params.externalIp_s = 0;
    }
    // commit(types.SET_EVENT_SRC_BAR);
    dispatch(types.GET_ALL_DATA);
  }
};

const actions = {
  async [types.EVENT_THREAT_LIST]({
    commit
  }) {
    let data = await commonAjax.req(state.eventThreatListUrl);
    commit(types.EVENT_THREAT_LIST, data);
  },
  async [types.GET_ALARM_INFO](context) {
    let data = await commonAjax.req(getAlarmInfoUrl, state.params, this);
    // let data = [{
    //   "barData": [0, 0, 1, 1, 0, 0, 0, 0],
    //   "alarm_grade": 2,
    //   "flow_status": 3
    // }, {"barData": [1, 0, 1, 0, 0, 0, 0, 0], "alarm_grade": 3, "flow_status": 2}, {
    //   "barData": [2, 2, 1, 2, 2, 0, 0, 0],
    //   "alarm_grade": 3,
    //   "flow_status": 3
    // }];
    context.commit(types.SET_HIGH_ALARM, data);
    context.commit(types.SET_MIDDLE_ALARM, data);
    context.commit(types.SET_ATTACK_PIE, data);
  },
  async [types.GET_BLOCK_INFO](context) {
    let data = await commonAjax.req(getBlockInfoUrl, state.params, this);
    context.commit(types.SET_BLOCK_INFO, data);
  },
  async [types.GET_LINE_BY_EVENT_TYPE](context) {
    let data = await commonAjax.req(getLineByEventTypeUrl + '?dateRange=month', {
      externalIp_s: state.params.externalIp_s,
      dateRange: 'month'
    }, this);
    let data2 = await commonAjax.req(getLineByEventTypeUrl + '?dateRange=week', {
      externalIp_s: state.params.externalIp_s,
      dateRange: 'week'
    }, this);
    // let data = {
    //   "xAxis": ["20171223", "20171224", "20171225", "20171226", "20171227", "20171228", "20171229", "20171230", "20171231", "20180101", "20180102", "20180103", "20180104", "20180105", "20180106", "20180107", "20180108", "20180109", "20180110", "20180111", "20180112", "20180113", "20180114", "20180115", "20180116", "20180117", "20180118", "20180119", "20180120", "20180121"],
    //   "lineData": [{
    //     "event_type": 300, "count": 700, "days": "20180121",
    //   }, {
    //     "event_type": 300, "count": 10, "days": "20180120",
    //   }]
    // };
    // let data2 = {
    //   "xAxis": ["20180113", "20180114", "20180115", "20180116", "20180117", "20180118", "20180119"],
    //   "lineData": [{"event_type": 300, "count": 10, "days": "20180118"}, {
    //     "event_type": 300,
    //     "count": 700,
    //     "days": "20180119"
    //   }]
    // }
    context.commit(types.SET_ATTACK_TREND, data2);
    context.commit(types.SET_THREATED_TREAD, data);
  },
  async [types.GET_EVENT_SUB_TYPE](context) {
    let data = await commonAjax.req(getEventSubTypeUrl, state.params, this);

    // let data = [[{"count":35,"event_threat_type":1},{"count":22,"event_threat_type":2}]];
    context.commit(types.GET_EVENT_SUB_TYPE, data);
  },
  async [types.GET_ASSET_NAME](context) {
    let data = await commonAjax.req(getAssetNameUrl, state.params, this);

    // let data = [[{"asset_name": "测试设备1", "count": 3}, {"asset_name": "测试设备2", "count": 2}]];
    context.commit(types.GET_ASSET_NAME, data);
  },
  async [types.GET_EVENT_DST_IP](context) {
    let data = await commonAjax.req(getEventDstIpUrl, state.params, this);

    // let data = {
    //   result: [{"total": "10", "ipSourceName": "汕头市", "event_dest_ip": "133.0.0.0"}, {
    //     "total": "2",
    //     "ipSourceName": "湛江市",
    //     "event_dest_ip": "114.0.0.0"
    //   }],
    //   "ipList": [{"ipSourceName": "汕头市", "event_dest_ip": "133.0.0.0"}, {
    //     "ipSourceName": "湛江市",
    //     "event_dest_ip": "114.0.0.0"
    //   }]
    // };
    context.commit(types.GET_EVENT_DST_IP, data);
  },
  async [types.GET_EVENT_SRC_IP](context) {
    state.srcIpList = await commonAjax.req(getEventSrcIpUrl, state.params, this);
    // state.srcIpList[1] = await commonAjax.req(getEventSrcIpUrl, {externalIp_s: 0}, this);

    context.commit(types.SET_EVENT_SRC_BAR);
    context.commit(types.GET_EVENT_SRC_IP);
  },
  async [types.GET_GEO_COORD_MAP](context) {
    let data = await commonAjax.req(geoCoordMapUrl, {}, this);
    context.commit(types.GET_GEO_COORD_MAP, data);
  },
  async [types.GET_ALL_DATA](context) {
    context.dispatch(types.GET_ALARM_INFO);
    context.dispatch(types.GET_LINE_BY_EVENT_TYPE);
    await context.dispatch(types.EVENT_THREAT_LIST);
    await context.dispatch(types.GET_EVENT_SUB_TYPE);
    await context.dispatch(types.GET_ASSET_NAME);
    context.dispatch(types.GET_EVENT_DST_IP);
    await context.dispatch(types.GET_GEO_COORD_MAP);
    context.dispatch(types.GET_EVENT_SRC_IP);
    context.dispatch(types.GET_BLOCK_INFO);
  }
};


export default {
  state,
  actions,
  mutations
}
