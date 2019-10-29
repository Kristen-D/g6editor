import chartAjax from '../../api/home-ajax.js'
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'
const state = {
   menuId:"m01",
   menuName:"",
   chartMenu:[],
   mapChartBase:{"row1_1":{id:"row1_1",height:"200px",width:"col-lg-4",type:"pie",url:"/ssa/home/getThreatInfo.do",title:"安全类型分析视图"},
                 "row1_2":{id:"row1_2",height:"200px",width:"col-lg-4",type:"pie",radius: ['30%', '45%'], url:"/ssa/home/getProductInfo.do",title:"资产状态汇总视图"},
                 "row1_3":{id:"row1_3",height:"200px",width:"col-lg-4",type:"pie",url:"/ssa/home/getEventInfo.do",title:"对应安全事件视图"},
                 "row2_1":{id:"row2_1",height:"350px",width:"col-lg-12",type:"line",url:"/ssa/home/getDetailedInfo.do",title:"单类安全事件趋势图"},

},
topData:[],
assetsInfo:{}
}

const getters = {

}


const mutations = {
    [types.SET_CONTEXT_TITLE] (state,name) {
        state.menuName = name;
  },
    [types.INIT_MAP] (state,data) {
        var map = state.mapChartBase;
        for (var k in map) {
           var v = map[k]
           var chartData = data.chartData;
           state.chartMenu = data.chartMenu;
           state.topData = data.topData;
           state.assetsInfo = data.assetsInfo;
           map[k] = {...v,...chartData[k]}
        }
     // alert($.toJSON(map))
  }
}

const actions = {
async  getChartInitData({ commit }) {
     return new Promise((resolve, reject) => {
        chartAjax.getChartInitData(data => {
          commit('INIT_MAP', data );
          resolve(data);
        })
     })
   }
 }

export default {
  state,
  getters,
  actions,
  mutations
}
