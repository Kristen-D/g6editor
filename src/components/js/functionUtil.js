import {
  EVENT_TYPE_LIST,
  EVENT_THREAT_LIST,
  PRODUCT_TYPE_LIST,
  EVENT_RISK_LIST,
  DEVICE_TYPE_LIST,
  EVENT_GRADE_LIST
} from "../../module/viewPlugins/store/mutation-types";

const fmtEventTypeList = async (vm) => {
  let eventTypeList = vm.$store.state.context.eventTypeList;
  if (JSON.stringify(eventTypeList) === "{}") {
    await vm.$store.dispatch(EVENT_TYPE_LIST);
  }
  return eventTypeList;
};

const fmtEventThreatList = async (vm) => {
  let eventThreatList = vm.$store.state.context.EventThreatList;
  if (JSON.stringify(eventThreatList) === "{}") {
    await vm.$store.dispatch(EVENT_THREAT_LIST);
  }
  return eventThreatList;
};

const fmtProductTypeList = async (vm) => {
  let productTypeList = vm.$store.state.context.ProductTypeList;
  if (JSON.stringify(productTypeList) === "{}") {
    await vm.$store.dispatch(PRODUCT_TYPE_LIST);
  }
  return productTypeList;
};

const fmtEventRiskList = async (vm) => {
  let eventRiskList = vm.$store.state.context.EventRiskList;
  if (JSON.stringify(eventRiskList) === "{}") {
    await vm.$store.dispatch(EVENT_RISK_LIST);
  }
  return eventRiskList;
};

const fmtDeviceTypeList = async (vm) => {
  let deviceTypeList = vm.$store.state.context.DeviceTypeList;
  if (JSON.stringify(deviceTypeList) === "{}") {
    await vm.$store.dispatch(DEVICE_TYPE_LIST);
  }
  return deviceTypeList;
};

const fmtEventGradeList = async (vm) => {
  let eventGradeList = vm.$store.state.context.eventGradeList;
  if (JSON.stringify(eventGradeList) === "{}") {
    await vm.$store.disable(EVENT_GRADE_LIST);
  }
  return eventGradeList;
};

const eventRiskList = {
  "1": "低危", "2": "中危", "3": "高危"
};

export {
  fmtEventTypeList,
  fmtProductTypeList,
  fmtEventRiskList,
  fmtEventThreatList,
  fmtDeviceTypeList,
  fmtEventGradeList,
  eventRiskList
}