<template>
 <div>

      <div class="echartsmap2" >
        <chart :options="options" ></chart>
      </div>
 </div>
</template>

<script>
import { 	mapState } from 'vuex'
import chart from 'components/vue-echarts/ECharts.vue'

export default {
	components: {chart},
	data() {
		return {
      getDomainDataUrl:"/ssa/blackDomain/getDomainData.do",
      domainData:[],
      options:{
	         tooltip:{
                trigger: 'item',
		           backgroundColor:'transparent',
                showDelay: 0,
                  hideDelay: 0,
                  enterable: true,
                  transitionDuration: 0,
                  extraCssText: 'z-index:100',
                  formatter:  function(params) {
                    if(isNaN(params.value)){
                      return null
                    }
                      var res = "";
                      var value = params.value;
                      var source = params.name;
                      res = "<div style='border-top:5px solid #0066cc;background:#010204;padding:0 30px 10px 20px;font-weight:700;font-size:14;'><p>来源："
                          + source+ "</p><p>数量："
                          + value+ "</p></div>";
                      return res;
                  }

              },
          	visualMap: {
          			type: 'continuous',
          			min: 1,
          			max: 1000,
          			text:['高','低'],
          			realtime: false,//拖拽时，是否实时更新
          			calculable : true,//是否显示拖拽用的手柄
          	//      range:[15, 40],//指定手柄对应数值的位置
          			inRange:{ //定义 在选中范围中 的视觉元素
          				color: ['#feea3b','#f95e06'],
          	//          symbolSize: [30, 100]
          			},
          			outOfRange:{  //定义 在选中范围外 的视觉元素。
          				color: ['#356587'],
          	//          symbolSize: [30, 100]
          			},
          			itemWidth:15,
          			bottom:50,
          			left:50,
          			splitNumber: 0,
          			textStyle: {
          					color: '#ddd'
          				},
          },
        	series : [
        		{
        			name: 'Domain分布',
        			type: 'map',
        			mapType: 'world',
        			roam: true,
        			mapLocation: {
        				y : 60
        			},
        			itemStyle: {
        				normal: {
        					areaColor: '#356587',
        					borderColor:'#17496c'
        				},
        				emphasis: {
        					label: {
        						show: true
        					},
        					areaColor: '#ccc'
        				}
        			},
			          data:[],
                nameMap : {
'Afghanistan':'阿富汗',
'Albania':'阿尔巴尼亚',
'Algeria':'阿尔及利亚',
'Andorra':'安道尔',
'Angola':'安哥拉',
'Antarctica':'南极洲',
'Antigua and Barbuda':'安提瓜和巴布达',
'Argentina':'阿根廷',
'Armenia':'亚美尼亚',
'Australia':'澳大利亚',
'Austria':'奥地利',
'Azerbaijan':'阿塞拜疆',
'The Bahamas':'巴哈马',
'Bahrain':'巴林',
'Bangladesh':'孟加拉国',
'Barbados':'巴巴多斯',
'Belarus':'白俄罗斯',
'Belgium':'比利时',
'Belize':'伯利兹',
'Benin':'贝宁',
'Bermuda':'百慕大',
'Bhutan':'不丹',
'Bolivia':'玻利维亚',
'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
'Botswana':'博茨瓦纳',
'Brazil':'巴西',
'Brunei':'文莱',
'Bulgaria':'保加利亚',
'Burkina Faso':'布基纳法索',
'Burundi':'布隆迪',
'Cambodia':'柬埔寨',
'Cameroon':'喀麦隆',
'Canada':'加拿大',
'Cape Verde':'佛得角',
'Central African Republic':'中非共和国',
'Chad':'乍得',
'Chile':'智利',
'China':'中国',
'Colombia':'哥伦比亚',
'Comoros':'科摩罗',
'Republic of the Congo':'刚果共和国',
'Costa Rica':'哥斯达黎加',
'Croatia':'克罗地亚',
'Cuba':'古巴',
'Cyprus':'塞浦路斯',
'Czech Republic':'捷克共和国',
'Denmark':'丹麦',
'Djibouti':'吉布提',
'Dominica':'多米尼加',
'Dominican Republic':'多明尼加共和国',
'Ecuador':'厄瓜多尔',
'Egypt':'埃及',
'El Salvador':'萨尔瓦多',
'Equatorial Guinea':'赤道几内亚',
'Eritrea':'厄立特里亚',
'Estonia':'爱沙尼亚',
'Ethiopia':'埃塞俄比亚',
'Falkland Islands':'福克兰群岛',
'Faroe Islands':'法罗群岛',
'Fiji':'斐济',
'Finland':'芬兰',
'France':'法国',
'French Guiana':'法属圭亚那',
'French Southern and Antarctic Lands':'法属南半球和南极领地',
'Gabon':'加蓬',
'Gambia':'冈比亚',
'Gaza Strip':'加沙',
'Georgia':'格鲁吉亚',
'Germany':'德国',
'Ghana':'加纳',
'Greece':'希腊',
'Greenland':'格陵兰',
'Grenada':'格林纳达',
'Guadeloupe':'瓜德罗普',
'Guatemala':'危地马拉',
'Guinea':'几内亚',
'Guinea Bissau':'几内亚比绍',
'Guyana':'圭亚那',
'Haiti':'海地',
'Honduras':'洪都拉斯',
'Hong Kong':'香港',
'Hungary':'匈牙利',
'Iceland':'冰岛',
'India':'印度',
'Indonesia':'印尼',
'Iran':'伊朗',
'Iraq':'伊拉克',
'Iraq-Saudi Arabia Neutral Zone':'伊拉克阿拉伯中立区',
'Ireland':'爱尔兰',
'Isle of Man':'马恩岛',
'Israel':'以色列',
'Italy':'意大利',
'Ivory Coast':'科特迪瓦',
'Jamaica':'牙买加',
'Jan Mayen':'扬马延岛',
'Japan':'日本',
'Jordan':'约旦',
'Kazakhstan':'哈萨克斯坦',
'Kenya':'肯尼亚',
'Kerguelen':'凯尔盖朗群岛',
'Kiribati':'基里巴斯',
'North Korea':'北朝鲜',
'South Korea':'韩国',
'Kuwait':'科威特',
'Kyrgyzstan':'吉尔吉斯斯坦',
'Laos':'老挝',
'Latvia':'拉脱维亚',
'Lebanon':'黎巴嫩',
'Lesotho':'莱索托',
'Liberia':'利比里亚',
'Libya':'利比亚',
'Liechtenstein':'列支敦士登',
'Lithuania':'立陶宛',
'Luxembourg':'卢森堡',
'Macau':'澳门',
'Macedonia':'马其顿',
'Madagascar':'马达加斯加',
'Malawi':'马拉维',
'Malaysia':'马来西亚',
'Maldives':'马尔代夫',
'Mali':'马里',
'Malta':'马耳他',
'Martinique':'马提尼克',
'Mauritania':'毛里塔尼亚',
'Mauritius':'毛里求斯',
'Mexico':'墨西哥',
'Moldova':'摩尔多瓦',
'Monaco':'摩纳哥',
'Mongolia':'蒙古',
'Morocco':'摩洛哥',
'Mozambique':'莫桑比克',
'Myanmar':'缅甸',
'Namibia':'纳米比亚',
'Nepal':'尼泊尔',
'Netherlands':'荷兰',
'New Caledonia':'新喀里多尼亚',
'New Zealand':'新西兰',
'Nicaragua':'尼加拉瓜',
'Niger':'尼日尔',
'Nigeria':'尼日利亚',
'Northern Mariana Islands':'北马里亚纳群岛',
'Norway':'挪威',
'Oman':'阿曼',
'Pakistan':'巴基斯坦',
'Panama':'巴拿马',
'Papua New Guinea':'巴布亚新几内亚',
'Paraguay':'巴拉圭',
'Peru':'秘鲁',
'Philippines':'菲律宾',
'Poland':'波兰',
'Portugal':'葡萄牙',
'Puerto Rico':'波多黎各',
'Qatar':'卡塔尔',
'Reunion':'留尼旺岛',
'Romania':'罗马尼亚',
'Russia':'俄罗斯',
'Rwanda':'卢旺达',
'San Marino':'圣马力诺',
'Sao Tome and Principe':'圣多美和普林西比',
'Saudi Arabia':'沙特阿拉伯',
'Senegal':'塞内加尔',
'Seychelles':'塞舌尔',
'Sierra Leone':'塞拉利昂',
'Singapore':'新加坡',
'Slovakia':'斯洛伐克',
'Slovenia':'斯洛文尼亚',
'Solomon Islands':'所罗门群岛',
'Somalia':'索马里',
'South Africa':'南非',
'Spain':'西班牙',
'Sri Lanka':'斯里兰卡',
'St. Christopher-Nevis':'圣',
'St. Lucia':'圣露西亚',
'St. Vincent and the Grenadines':'圣文森特和格林纳丁斯',
'Sudan':'苏丹',
'Suriname':'苏里南',
'Svalbard':'斯瓦尔巴特群岛',
'Swaziland':'斯威士兰',
'Sweden':'瑞典',
'Switzerland':'瑞士',
'Syria':'叙利亚',
'Taiwan':'台湾',
'Tajikistan':'塔吉克斯坦',
'United Republic of Tanzania':'坦桑尼亚',
'Thailand':'泰国',
'Togo':'多哥',
'Tonga':'汤加',
'Trinidad and Tobago':'特里尼达和多巴哥',
'Tunisia':'突尼斯',
'Turkey':'土耳其',
'Turkmenistan':'土库曼斯坦',
'Turks and Caicos Islands':'特克斯和凯科斯群岛',
'Uganda':'乌干达',
'Ukraine':'乌克兰',
'United Arab Emirates':'阿联酋',
'United Kingdom':'英国',
'United States of America':'美国',
'Uruguay':'乌拉圭',
'Uzbekistan':'乌兹别克斯坦',
'Vanuatu':'瓦努阿图',
'Venezuela':'委内瑞拉',
'Vietnam':'越南',
'Western Sahara':'西撒哈拉',
'Western Samoa':'西萨摩亚',
'Yemen':'也门',
'Yugoslavia':'南斯拉夫',
'Democratic Republic of the Congo':'刚果民主共和国',
'Zambia':'赞比亚',
'Zimbabwe':'津巴布韦',
'South Sudan':'南苏丹',
'Somaliland':'索马里兰',
'Montenegro':'黑山',
'Kosovo':'科索沃',
'Republic of Serbia':'塞尔维亚',

}
		         }
	       ]
    }

	 }
},

	computed: {
		...mapState({

		})
	},
	methods: {
    getInitData(){
      this.domainData=[]
       this.common.req(this.getDomainDataUrl, {}).then(data => {
         this.domainData = data;
         this.dataHandle();
       });
    },
    dataHandle(){

      //获取value
      var getvalue=[]
      for(var j = 0; j < this.domainData.length; j++) {
              getvalue.push(this.domainData[j].value);
      }
      //取最大小值
      var minNum = Math.min.apply(null,getvalue);
      this.options.visualMap.min = minNum
      var maxNum = Math.max.apply(null,getvalue);
      this.options.visualMap.max = maxNum
      this.domainData.sort(function(a,b){return a.value-b.value;});
      this.options.series[0].data = this.domainData;
    }
	},
	created: async function() {
    this.getInitData();
	},
	mounted:  function() {}
}
</script>
