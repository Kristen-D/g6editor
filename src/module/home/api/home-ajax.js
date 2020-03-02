/*
  Mocking client-server processing
 获取后台数据接口
 */


var _pie_data ={
chartData:{
  "row1_1": {title:"威胁等级",url:"home/getLd.do" },
  "row1_2": {title:"日志" ,url:"home/getZc.do"  },
  "row1_3": {title:"告警" ,url:"home/getDy.do" },
  "row2_1": { title:"安全趋势",url:"home/getQs.do" }
},chartMenu:[
  {title:"安全漏洞",url:"home/get1.do" },
  {title:"资产安全",url:"home/get2.do" },
  {title:"钓鱼网站",url:"home/get3.do" },
  {title:"不知道写什么",url:"home/get4.do" },
  {title:"不知道写什么",url:"home/get5.do" },
  {title:"安全趋势",url:"home/get6.do" }
],

topData:{name:"TOP5威胁视图",
data:[
  {title:"安全资产","data":[
  {title:"Google Chrome day1",size:"4909" },
  {title:"Google Chrome day2",size:"4909" },
  {title:"Google Chrome day3",size:"4909" },
  {title:"Google Chrome day4",size:"4909" },
  {title:"Google Chrome day5",size:"4909" }
]},
{title:"资产管理","data":[
  {title:"Google Chrome week1",size:"4909" },
  {title:"Google Chrome week2",size:"4909" },
  {title:"Google Chrome week3",size:"4909" },
  {title:"Google Chrome week4",size:"4909" },
  {title:"Google Chrome week5",size:"4909" }
]},
{title:"威胁类型","data":[
  {title:"Google Chrome month1",size:"4909" },
  {title:"Google Chrome month2",size:"4909" },
  {title:"Google Chrome month3",size:"4909" },
  {title:"Google Chrome month4",size:"4909" },
  {title:"Google Chrome month5",size:"4909" }
]}]
},

assetsInfo:{name:"资产信息",
  row1:[{title:"虚拟设备",size:"1851" },
  {title:"网络设备",size:"1852" },
  {title:"安全设备",size:"1853" }],

  row2:[{title:"域名",size:"1854" },
  {title:"网站",size:"1855" },
  {title:"端口",size:"1856" }],

  row3:[{title:"主机",size:"1857"},
  {title:"数据库",size:"1858"},
  {title:"操作系统",size:"1859" }],

  row4:[{title:"中间件",size:"1851"},
  {title:"服务",size:"1852" },
  {title:"应用",size:"1853" }]
}


}






export default {
  getChartInitData(cb) {
    setTimeout(() => cb(_pie_data), 0)
  },
  getGeoJson() {
    return china;
  }
}
