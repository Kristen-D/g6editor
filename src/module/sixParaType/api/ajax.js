/*
  Mocking client-server processing
 获取后台数据接口
 */

var _pie_data ={
chartData:{
  "row1_1": {title:"威胁等级",url:"home/getLd.do" },
  "row1_2": {title:"日志" ,url:"home/getZc.do"  },
  "row2_1": {title:"告警" ,url:"home/getDy.do" },
  "row3_1": { title:"被",url:"home/getQs.do" }
} ,chartMenu:[
  {title:"安全漏洞",url:"home/get1.do" },
  {title:"资产安全",url:"home/get2.do" },
  {title:"钓鱼网站",url:"home/get3.do" },
  {title:"不知道写什么",url:"home/get4.do" },
  {title:"不知道写什么",url:"home/get5.do" },
  {title:"安全趋势",url:"home/get6.do" }
],
topData:{name:"TOP5威胁视图",
data:[
  {title:"安全漏洞","data":[
  {title:"Google Chrome day1",size:"4909" },
  {title:"Google Chrome day2",size:"4909" },
  {title:"Google Chrome day3",size:"4909" },
  {title:"Google Chrome day4",size:"4909" },
  {title:"Google Chrome day5",size:"4909" }
]},
{title:"资产安全","data":[
  {title:"Google Chrome week1",size:"4909" },
  {title:"Google Chrome week2",size:"4909" },
  {title:"Google Chrome week3",size:"4909" },
  {title:"Google Chrome week4",size:"4909" },
  {title:"Google Chrome week5",size:"4909" }
]},
{title:"钓鱼网站","data":[
  {title:"Google Chrome month1",size:"4909" },
  {title:"Google Chrome month2",size:"4909" },
  {title:"Google Chrome month3",size:"4909" },
  {title:"Google Chrome month4",size:"4909" },
  {title:"Google Chrome month5",size:"4909" }
]}]
},
zichanData:[{value:1, name:'网关',path:'网关', "children": [
            {
                "value": 8,
                "name": "DeepEdge",
                "path": "网关/DeepEdge"
 }]},
{value:1, name:'网络',path:'网络', "children": [
            {
                "value": 8,
                "name": "TDA",
                "path": "网络/TDA"
 }]},
{value:1, name:'终端',path:'终端', "children": [
            {
                "value": 8,
                "name": "OfficeScan",
                "path": "终端/OfficeScan"
 }]},
{value:1, name:'虚拟化',path:'虚拟化', "children": [
            {
                "value": 7,
                "name": "DeepSecurity",
                "path": "虚拟化/DeepSecurity"
 }]},
{value:1, name:'防火墙',path:'防火墙', "children": [
            {
                "value": 3,
                "name": "Netscreen",
                "path": "防火墙/Netscreen"
            },
              {
                  "value": 1,
                  "name": "H3C",
                  "path": "防火墙/H3C"
              },
                {
                    "value": 2,
                    "name": "Fortigate",
                    "path": "防火墙/Fortigate"
                },
                  {
                      "value": 3,
                      "name": "Power",
                      "path": "防火墙/Power"
                  }
]},
{value:1, name:'Web防火墙',path:'Web防火墙', "children": [
            {
                "value": 8,
                "name": "P1600A",
                "path": "Web防火墙/P1600A"
 }]} ],
mapData :{
  eventData:[],
orgData:[{value:40020000, name:'北京机构'},
{value:25030000, name:'福州机构'},
{value:27030000, name:'广州机构'},
{value:32010000, name:'成都机构'},
{value:30000000, name:'上海机构'},
{value:46000000, name:'天津机构'},
{value:26000000, name:'海南机构'}, ],
eventRisk:[{value:5020000, name:'间谍软件'},
{value:3030000, name:'漏洞利用'},
{value:3103000, name:'恶意软件'},
{value:4301000, name:'黑客攻击'},
{value:4000000, name:'信息泄漏'},
{value:4600000, name:'恶意网址'},
{value:2600000, name:'灰色软件'},
{value:3000000, name:'其他'} ],
xData :[1,2,3,4,5,6,7,8]
}

}




export default {
  getChartInitData(cb) {
    setTimeout(() => cb(_pie_data), 0)
  }
}
