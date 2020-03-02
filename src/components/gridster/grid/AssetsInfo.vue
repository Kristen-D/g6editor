<template>




  <div class="widget-panel clearfix "  :class="classMap[params.pType].bg" style=" height:100%;">

    <div class="row" >
      <div class="col-md-7"  >
                        <div class="row" v-for="(m, index) in assetsList" @click="shwoAssetDetail(m.product_type)" style="cursor:pointer" >
                            <!-- <div class="col-md-9 text-right" style="border-right:1px solid #fff;" >
                                {{m.product_type_name}}
                            </div>
                            <div class="col-md-3   text-left" >
                              {{m.total}}
                            </div> -->

                    <div class="widget-panel-font">
                        <p>{{m.product_type_name}}&nbsp;|<span>{{m.total}}</span></p>
                     </div>
                       </div>

      </div>

      <div class="col-md-4" >
            <i class="fa  fa-5x" :class="classMap[params.pType].img"></i>
      </div>

    </div>
   </div>





</template>
<script>
import {mapState,mapActions } from 'vuex'
export default {
 data(){
   return {
     assetsList:[],
     params:{pType:0},
     classMap:{
       1:{img:"fa-server",bg:"bg-one"},
       2:{img:"ion-earth",bg:"bg-two"},
       3:{img:"ion-monitor",bg:"bg-three"},
       4:{img:"fa-skyatlas",bg:"bg-four"}
     }
   }
 },

 methods: {
   setCustomMenu:function( ){
       var vm = this;
       this.commonAjax.req("/ssa/home/listAssetsMenuType.do").then((types)=>{
          var menuList = [];
         types.forEach(t=>{
                 let menu = {
                             name:t.product_type_name,
                             val:t.product_type
                            } ;
                 menuList.push(menu);
         })
    // console.log(menuList);
         this.$store.commit("addCustomMethods",[this.data.i,menuList]);
      });

   },
   shwoAssetDetail(productType){
     var param = {};
     param.chartName = "assetsInfo";
     param.productType = productType;
     this.$store.dispatch('drillData', param);

   },
   customMethod:function(custom){
      this.changeType(custom.val);

   },
   changeType:function(type){
        this.params.pType = type;
        this.reload();
   },

   reload(){
     this.commonAjax.req("/ssa/home/listAssetsTopTotal.do",{pType:  this.params.pType}).then((a)=>{

         this.assetsList = a;
    });
   }
 },
props:['data'],
 created:function(){
//     alert(this.data.params)
    if(this.data.params)this.params = this.data.params;
    // console.log(this.params.pType);
    this.reload();


 },
  mounted : function() {

  }
}
</script>
