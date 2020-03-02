import * as types from './const';
import ajax from '../../../components/js/common';

const url = '/ssa/loggerManagement/getScreenData.do';
const gradeUrl = '/ssa/overallsituation/getSafetyIndex.do';
const alarmUrl = '/ssa/loggerManagement/getScreenDataList.do';
const trendUrl= '/ssa/loggerManagement/getScreenLine.do';

const state = {
  grade: {status: '', value: 100},
  visited: {area: [], number: []},
  ips: {name: [], count: []},
  websites: [],
  company: [],
  urlFile: [],
  country: [],
  alarmList: [],
  trendList: [[], []],
  provinceList: [],
  attack: [[], []]
};

const actions = {
  async [types.GET_SAFE_GRADE] ({commit}) {
    let data = await ajax.req(gradeUrl);
    commit(types.GET_SAFE_GRADE, data);
  },
  async [types.GET_VISITED_AREA] ({commit}) {
    let data = await ajax.req(url, {groupData: "srcCityName_s"});
    commit(types.GET_VISITED_AREA, data)
  },
  async [types.GET_VISITED_COUNTRY] ({commit}) {
    let data = await ajax.req(url, {groupData: "srcCountryName_s"});
    commit(types.GET_VISITED_COUNTRY, data);
  },
  async [types.GET_VISITED_IPS] ({commit}) {
    let data = await ajax.req(url, {groupData: "src_ip_s"});
    commit(types.GET_VISITED_IPS, data)
  },
  async [types.GET_WEBSITES] ({commit}) {
    let data = await ajax.req(url, {groupData: "dstBusinessSystem_s"});
    commit(types.GET_WEBSITES, data);
  },
  async [types.GET_COMPANY_NAME]({commit}) {
    let data = await ajax.req(url, {groupData: "dstProvinceName_s"});
    commit(types.GET_COMPANY_NAME, data);
  },
  async [types.GET_ATTACK_TYPE] ({commit}) {
    let data = await ajax.req(url, {groupData: "alert.vulnerability_type_s"});
    commit(types.GET_ATTACK_TYPE, data);
  },
  async [types.GET_URL_FILE] ({commit}) {
    let data= await ajax.req(url, {groupData: "http.url_s"});
    commit(types.GET_URL_FILE, data);
  },
  async [types.GET_ALARM_LIST] ({commit}) {
    let data = await ajax.req(alarmUrl);
    commit(types.GET_ALARM_LIST, data);
  },
  async [types.GET_TREND_LIST] ({commit}, province) {
    let data = await ajax.req(trendUrl, {srcProvinceName_s: province});
    if (!province) {
      commit(types.GET_TREND_LIST, data);
    } else {
      return data;
    }
  }
};

const mutations = {
  [types.GET_SAFE_GRADE] (state, data) {
    state.grade.status = data.systemSafety;
  },
  [types.GET_VISITED_AREA](state, data) {
    let visited = {area: [], number: []};
    let total = 0;
    data.rowData.map((value, index) => {
      if (index < 5) {
        visited.area.push(value.name);
        visited.number.push(value.count);
        total += value.count;
      }
    });
    state.grade.value =  Math.floor(total % 20) + 80;
    state.visited = visited;
  },
  [types.GET_VISITED_IPS](state, data) {
    let ips = {name: [], count: []};
    data.rowData.map((value, index) => {
      if (index < 5) {
        ips.name.push(value.name);
        ips.count.push(value.count);
      }
    });
    state.ips = ips;
  },
  [types.GET_WEBSITES] (state, data) {
    state.websites = data.rowData.slice(0, 3);
  },
  [types.GET_COMPANY_NAME] (state, data) {
    state.company = data.rowData;
  },
  [types.GET_URL_FILE] (state, data) {
    state.urlFile = data.rowData;
  },
  [types.GET_VISITED_COUNTRY] (state, data) {
    state.country = data.rowData;
  },
  [types.GET_ALARM_LIST] (state, data) {
    state.alarmList = data.rowData;
  },
  [types.GET_TREND_LIST] (state, data) {
    let result = [[], []];
    data.map(value => {
      result[0].push(value.time);
      result[1].push(value.count);
    });
    state.trendList = result;
  },
  [types.GET_ATTACK_TYPE] (state, data) {
    let result = [[], []];
    data.rowData && data.rowData.map(value => {
      result[0].push(value.name);
      result[1].push(value.count);
    });
    state.attack = result;
  }
};


export default new Vuex.Store({
  state, actions, mutations
})
