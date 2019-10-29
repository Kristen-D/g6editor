<template >
   <!-- <div id="mymap" style="height:358px;"></div> -->
   <el-col :span="12">
     <div class="el-panel-white">
     <div class="el-panel-white-heading">
       <h3 class="el-panel-white-title">攻击视图</h3>
       <el-tabs class="float-r day-tabs" v-model="activeName" @tab-click="changeTime">
          <el-tab-pane label="今天" name="1" ></el-tab-pane>
          <el-tab-pane label="近7天" name="2" ></el-tab-pane>
          <el-tab-pane label="近30天" name="3" ></el-tab-pane>
       </el-tabs>
     </div>
     <div class="el-panel-white-body">
       <el-row>
         <el-col :span="9"><div id="flowDayRadarA" class="echartbox2"></div></el-col>
         <el-col :span="14">
           <el-table :data="EventThreatTypeTop5" style="width: 100%" class="nobordertable">
              <el-table-column prop="id"  label="序号"  show-overflow-tooltip align="center">
<template   scope="scope">
                 <span style="padding: 2px 5px; color: #fff; border: 1px solid #2196f3; background-color: #2196f3;">{{ scope.row.id }}</span>
              </template>
</el-table-column>
              <el-table-column prop="event_subtype"  label="攻击类型" show-overflow-tooltip align="center">
<template   scope="scope">
                <div >
                  <span  style="margin-left: 10px">{{ fmtEventThreatList(scope.row.event_threat_type) }}</span>
                </div>
              </template>
</el-table-column>

              <el-table-column prop="count" label="攻击量" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="ipCount" label="攻击IP量" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="productCount" label="影响资产量" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
         </el-col>
       </el-row>
     </div>
   </div>
   </el-col>

</template>

<script>
import {mapState,mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  computed:{
    ...mapState({
       params:state=>state.context.params,
        test:state=>state.context.test,
        eventTypeList:state=>state.context.eventTypeList,
        ProductTypeList:state=>state.context.ProductTypeList,
        EventThreatList:state=>state.context.EventThreatList,
   })},

   data(){
   				 return {
   	          isOpen:false,
   						currentIndex:-1,
              cacheData:[],
              params:{dateRange:'month'},
              activeName:"3",
              EventThreatTypeTop5:[]
   				 }
   		 },


    methods: {
      changeTime(value){
        if (value.name=="1"){
          this.params.dateRange="day";
        }else if(value.name=="2"){
          this.params.dateRange="week";
        }else if(value.name=="3"){
          this.params.dateRange="month";
        }
        this.loadMapChart();
      },
      fmtEventThreatList(val){
       // console.log(this.eventTypeList);
         for(var item in this.EventThreatList) {
             if (val==this.EventThreatList[item].id){
               return this.EventThreatList[item].text;
             }
         }

      },
      fmtEventTypeList(val){

         for(var item in this.eventTypeList) {
             if (val==this.eventTypeList[item].id){
               return this.eventTypeList[item].text;
             }
         }

      },
      fmtProductTypeList(val){
       // console.log(val);
         for(var item in this.ProductTypeList) {
             if (val==this.ProductTypeList[item].id){
               return this.ProductTypeList[item].text;
             }
         }

      },
      async loadMapChart(){
        // var data = await this.commonAjax.req("/ssa/situationAnaly/getPieByEventType.do", this.params);
        var myChart = echarts.init(document.getElementById("flowDayRadarA"));
        var seriesData=[];



        var data = await this.commonAjax.req("/ssa/situationAnaly/getCountEventThreatTypeTop5.do", this.params);
        this.EventThreatTypeTop5 =data;

        for(var i = 0; i < data.length; i++){
          var dataUnit = data[i];
          var childData=	{ value: 15, name: '其他'};

            childData.value=dataUnit.count;
            childData.name=this.fmtEventThreatList(dataUnit.event_threat_type).toString();

        // console.log(childData.data);
        seriesData.push(childData);
        };


        var option = {
			backgroundColor: '#ffffff',
  color: ['#0066cc', '#00cccc','#6600cc','#6666cc','#66cccc','#336633','#33ff33','#9900ff','#9999ff'],
					    tooltip : {
			trigger: 'item',
		},
			series: [{
				name: '攻击类型',
				type: 'pie',
				center: ['40%', '46%'],
				radius: ['40%', '60%'],
				startAngle: 0, //起始角度，支持范围[0, 360]。
				itemStyle: { //图形样式
					normal: {
						borderWidth: 4,
						borderColor: '#ffffff',
					}
				},
				labelLine:{
					normal:{
						show:true,
						length:3,
					}
				},
				label: {
					   normal: {
							textStyle:{
								fontSize:12,
								color:'#3E4956',
							}

						},
					},
				data: seriesData
      }
      ]
	};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize=myChart.resize;
        let vm=this;
        myChart.on('click', function(params) {
          let parameters = {};
          let threatObj = vm.EventThreatList.find((obj) => {
              return obj.text === params.name;
          });
          parameters.threatType_s = threatObj.id;
          parameters.module = 'attackView_drilling';
          parameters.detailUrl = '/ssa/situationAnaly/getCountEventThreatTypeTop5Detail.do';
          parameters.time=vm.params.dateRange;
          parameters.dateRange = vm.params.dateRange;
          parameters.old_total=params.value;
          vm.$store.commit('openDrillDialogTable', parameters);
          vm.$store.dispatch('getDrillColumns', [vm, params.name]);
          vm.$store.dispatch('loadDrillTableData');
            // vm.funbs(params.name,params.dataIndex);
        });

      },

    },
  created :function() {

  },
  mounted: async function() {
    // this.loadMapChart();
  }

}
</script>
