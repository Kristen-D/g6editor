import common from 'components/js/common.js'


/**
 * 获取数据
 */
export const getData = () => {
    return common.reqBackState("/ssa/bigThreadGdnx/getData.do")
}

/**
 * 获取告警详情
 */
export const getAlarmInfo = (alarmId) => {
    return common.reqBackState("/ssa/bigThreadGdnx/getAlarmInfo.do", { alarmId })
}


export const getThreatByEventsubtypeAndRisk = (params) => {
    return common.reqBackState("/ssa/bigThreadGdnx/getThreatByEventsubtypeAndRisk.do", params)
}