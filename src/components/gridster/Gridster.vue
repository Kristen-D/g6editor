<template>
  <div>
  <el-row class="block-col-2">
    <el-col :span="12" :offset="12">
      <el-dropdown trigger="click" @command="add_widget">
    <span class="el-dropdown-link" >
      添加<i class="el-icon-caret-bottom el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command = "{id:'test'}">柱状图</el-dropdown-item>
      <el-dropdown-item :command = "{id:'testpie'}" >饼图</el-dropdown-item>
      <el-dropdown-item :command = "{id:'testTable',x:12,y:3}" >员工表格</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</el-col>
</el-row>
  <div class="gridster">
   <ul style="background:white;list-style-type:none;">
     <li v-for="idata in data" :data-sizex="idata.sizex" :data-sizey="idata.sizey" class="gs-li" :id="mark+idata.id" :data-col="idata.col?idata.col:1"  :data-row="idata.row?idata.row:1"  >
        <grid :data = "idata" ref="idata.id" v-if="isInitGrid"></grid>
     </li>
  </ul>

  </div>
</div>
</template>



<script>

	import {mapState } from 'vuex'
	//import gridster from 'dsmorse-gridster'
  import jqJson from 'components/js/jquery.json.js'
import commonAjax from 'components/js/common.js'
  import grid from './Grid.vue'



	export default {
		components: { grid},
		data(){
			return {
        isInitGrid:false,
        gridster:null,
        mark:"gds_",
        gridData:null,
		 }
	},
  props:['moudle'],

  computed:{
    ...mapState({
       data:state=>state.gridster.data
   })},
  methods:{
    remove_widget:function(id,cb){
      let vm = this;
      let el = $('#'+this.mark+id);
      vm.data.forEach((d,i)=>{
          if(d.id == id  ){
            vm.data.splice(i, 1);
          }
        })
      vm.gridster.remove_widget(el,cb);
    },
    add_widget: function(component_id){
      let vm = this;
    //  var id =  this.$store.dispatch("getGridId");
      this.$store.commit("nextSeq");
     var id = this.$store.getters.getSeq;
      var d1 = {sizex:component_id.x||1,sizey:component_id.y||1,row:5,component:component_id.id,id:id}
      vm.data.push(d1 )
      let gridster = vm.gridster;
      this.$nextTick(function(){
         vm.gridster.set_widget( this.mark+id, d1.sizex, d1.sizey)
         //gridster.add_widget.apply(gridster, [1,1])
        // alert($.toJSON(vm.gridster.serialize_changed()))
      })
    },
    serialize_params:function(w,wgd){
        var el = wgd.el;
        return {col:wgd.col,row:wgd.row,size_x:wgd.size_x,size_y:wgd.size_y,id:el.attr("id")};
    },
    init: function (){
        let vm = this;
        let gridster = $(".gridster > ul").gridster({
               widget_margins: [10, 10],
               widget_base_dimensions: ['auto', 100],
              //  shift_widgets_up: false,
              shift_larger_widgets_down: false,
              //avoid_overlapped_widgets:false,
                autogenerate_stylesheet: true,
                min_cols: 1,
                max_cols: 12,
                serialize_params:vm.serialize_params,
                resize: {
                 enabled: true,
                 stop:function(e, ui, w){
                    var reg = /gds_/;
                    let id =w.attr("id").replace(reg,"");
                    vm.$store.commit("resetEchart",id);
                 }
               },

           }).data('gridster');
        this.isInitGrid = true;
        this.gridster = gridster;
        let t = null;
        //重置echart窗口大小
        window.onresize=function(){
          clearTimeout(t);
          t = window.setTimeout(function (){ vm.$store.commit("resetAllEchart")},200);
        }
      }
  },
  created:  function(){
  },
  mounted:function(){
    let vm = this;
    vm.commonAjax.req("/ssa/gridConf/listGrid.do", {moudle:vm.moudle}).then(data=>{
     vm.gridData = data;
     vm.$store.dispatch("initGridsterData",vm.gridData);
     vm.$nextTick(()=>{
       vm.init();
     })

   });



  }
}
</script>
<style>
.gs-li{

}
h1,
h2,
h3,
p {
  margin: 10px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.demo {
  margin: 3em 0;
  padding: 7.5em 0 5.5em;
  background: #26941f;
}
.demo:hover .gridster {
  margin: 0 auto;
  opacity: .8;
  -webkit-transition: opacity .6s;
  -moz-transition: opacity .6s;
  -o-transition: opacity .6s;
  -ms-transition: opacity .6s;
  transition: opacity .6s;
}
.content {
  color: white;
}
.gridster .gs-w {
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.gridster .player {
  -webkit-box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  background: #BBB;
}
.gridster .gs-w.try {
  background-repeat: no-repeat;
  background-position: 37px -169px;
}
.gridster .preview-holder {
  border: none !important;
  border-radius: 0 !important;
  background: red !important;
}
.gridster ul {
  background-color: #EFEFEF;
}
.gridster li {
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
}
ul {
  list-style-type: none;
}
li {
  list-style: none;
  font-weight: bold;
}
.gridster-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.controls {
  margin-bottom: 20px;
}
</style>
