
<template>
<div style="width:100%">
  <span style="width:100%" class="el-cascader"  :class="[
      {
        'is-opened': menuVisible,
        'is-disabled': disabled
      },
      size ? 'el-cascader--' + size : ''
    ]"
  ref="reference" @click="handleClick"
  v-clickoutside="handleClickoutside"
  @mouseenter="inputHover = true"
  @mouseleave="inputHover = false" >
			<!---->
    <el-input
     ref="input"
     :readonly="!filterable"
     :placeholder="currentLabels.length ? undefined : placeholder"

     :validate-event="false"
     :size="size"
     :disabled="disabled"
   >
    <template slot="suffix">
        <i
          key="3"
          v-if="loading"
          class="el-input__icon el-icon-circle-close el-icon-loading"

        ></i>

        <i
          key="1"
          v-else-if=" clearable && inputHover && currentLabels.length"
          class="el-input__icon el-icon-circle-close el-cascader__clearIcon"
          @click.stop="clearValue"
        ></i>


        <i
          key="2"
          v-else
          class="el-input__icon el-icon-arrow-down"
          :class="{ 'is-reverse': menuVisible }"
        ></i>


     </template>
    </el-input>
			<!---->
			<!---->

		<span class="el-cascader__label">
      <template v-for="(l,i) in currentLabels">
        {{l}}
        <span v-if="i < currentLabels.length - 1"> / </span>
      </template>
    </span>
  </span>
<transition name="el-zoom-in-top"  >

  <cpm   ref="popper" v-show="menuVisible"  :showMenuData="showMenuData" :labelKey="labelKey">

   </cpm>


</transition>
</div>
</template>

 <script>
import PopperJS from 'components/js/popper.js';
import cpm from './CascaderPlusMenu';
import clickoutside from 'components/js/clickoutside.js';
import initTreeData from './initTreeData.js';
import pluginsCommon from 'components/js/common.js'
Vue.prototype.pluginsCommon = pluginsCommon
export default {
  directives: { clickoutside },
  components:{cpm},
  computed:{
    labelKey() {
      return this.props.label || 'label';
    },
    valueKey() {
      return this.props.value || 'value';
    },
    childrenKey() {
      return this.props.children || 'children';
    },
    pidKey(){
      return this.props.pid || 'pid';
    },
    loadUrl(){
      return this.loadData.url;
    },
    maxLevel(){
      return (this.loadData && this.loadData.maxLevel)||0;
    },
    rootIdKey() {
      if(this.rootId == 0){
        return this.rootId ;
      }
      return this.rootId || -1;
    },
    levelKey() {
      if(this.sortMode!="lv")return "lv";
      return this.props.level || 'lv';
    },
  },
  mixins:[initTreeData],
  data(){
      return {
        oldValue:null,
        loading:false,
        currentValue:[],
        currentLabels:[],
        currentOptions:[],
        labes:"",
        menuVisible :false,
        menu:null,
        inputHover:false,
        placement:"bottom-start",
         debouncedInputChange() {},
        popjs:null,
        popperElm:null,
        popperOptions:{
          gpuAcceleration: false
        },

        sortMode:"root",//root,children,level
        showMenuData:[],
      }
  },
  props: {
    disabled: {
      type: Boolean,
      default :false,
    },
    filterable:Boolean,
    placeholder: {
      type: String,
      default :"请选择",
    },
    changeOnSelect:Boolean,
    expandTrigger: {
      type: String,
      default: 'click'
    },
    clearable:Boolean,
    options:{
      type: Array,
      default:function(){return []},
    },
    props: {
      type: Object,
      default: function(){return {}},
    },
    size: String,

    loadData:String,
    valueMode:{
      type: String,
      default: 'value'
    },
    rootId:Number,
    value:Array,
  },
watch:{
  options:function(val){
    this.sourceData = $.extend(true,[],val); ;
    if(this.sourceData && this.sourceData.length>=1) this.initData();
  },
  value:function(val){
    if(val && !val._flag && val.length>0){
      if(this.loadData &&　this.loadData.backFillUrl){
          this.backFillLodaData(val)
      }else{
          this.backFill(val);
      }

    }
  }

},
 methods:{
   backFill(val){
     let id = val[0];
     let bfItem  =  this.idData[id];
     if(bfItem){
       this.handleMenItem(bfItem,'click');
       return;
     }


     if(!this.loadData && !id){
         this.clearValue();
         return;
     }


   },
   showMenu(){
      this.menuVisible =  !this.menuVisible  ; ;
      this.$nextTick(_ => {
       this.menu.update();
     });
   },
   handleClickoutside() {
      this.menuVisible  = false;
   },
   handleClick(){

     if(this.loading)return;
     if(!this.menu)this.initMenu();
     if(this.currentOptions.length==0) this.showMenuData = [this.pidData[this.rootIdKey]];
     if(!this.disabled){
         this.showMenu();
     }

   },
   unActive(){
     this.currentOptions.forEach(o=>{
       o.isActive = false;
     })
   },

   handleMenItem(item,type){
     if((item.hasChild && type != this.expandTrigger) || (!item.hasChild && type == "hover"))return;

     this.clearValue();
     this.activeParentItem(item);
     let lv = item[this.levelKey];
     let tmpArr = [];
     this.currentOptions.forEach((d,i)=>{
        tmpArr.push(this.pidData[d[this.pidKey]]);
     })



     if(item.hasChild) this.setChild(item,tmpArr)
      else  this.menuVisible = false;
     this.showMenuData = tmpArr;
     this.setCValue(item);
   },
   setChild(item,tmpArr){
     if(this.loadData && this.loadData!="" && !item.children){
       this.loadAsyncChild(item,tmpArr);
    }
     else {
       tmpArr.push(item.children);
     }
   },
   loadAsyncChild(item,tmpArr){
  //   console.log(JSON.stringify(item))
  let vm = this;
  return new Promise((resolve, reject) => {
       vm.pluginsCommon.req(this.loadData.url,item).then(data=>{

         if(this.loadData.beforeLoadData)this.loadData.beforeLoadData(data,item,this.currentOptions);
         if(!data || data.length <1 ) {
           tmpArr.push([]);
           resolve(data);
           return ;
         }
         this.initLoadData(item,data);
        if(tmpArr) tmpArr.push(item.children);
        resolve(data);
       })
    })
   },
   initLoadData(item,data){
     item[this.childrenKey] = data;
     this.pidData[pid] = data;
     let lv = item[this.levelKey]+1;
     let pid = item[this.idKey];
     this.pidData[pid] = data;
     for (var i = 0; i < data.length; i++) {
       let d = data[i];
       let id =  d[this.valueKey];
       d[this.idKey] = id;
       d[this.pidKey] = pid;

       if(this.maxLevel   ){
         if(this.maxLevel == lv)  d.hasChild = false;
         if(d.hasChild == false)d.hasChild = false;
         else d.hasChild = true;
       }else{
           d.hasChild = Boolean(d.hasChild);
       }
       d.lv = lv;
       d[this.pidKey] = pid;
       this.idData[id] = d;

       this.addDataByKey(d,lv,this.lvData);
     }

   },
   activeParentItem(item){

     let pid = item[this.pidKey];
     item.isActive = true;
     this.currentValue[item.lv-1] = item[this.valueKey];
     this.currentOptions[item.lv-1] = item;

     if(item[this.levelKey] > 1){
       let parent = this.idData[pid];
       this.activeParentItem(parent);
     }
   },
   setCValue(item){
     if(this.changeOnSelect || !item.hasChild) {

       this.currentOptions.forEach(o=>{
         this.currentLabels.push(o[this.labelKey])
       })
       this.currentValue._flag = true;
       this.currentOptions._flag = true;
       let newVal = this.currentValue;
       if(this.valueMode == "value")newVal = this.currentValue
       else if(this.valueMode == "option") newVal = this.currentOptions;
       else console.error("valueMode设置错误");

       this.$emit("input",newVal);
       if(this.oldValue.join(",") != newVal.join(",")){
         this.$emit("change");
       }
     }
   },
   initMenu() {
     const options = this.popperOptions;
     const popper =   this.$refs.popper;
     let reference =  this.$refs.reference;
     options.placement = this.placement;
     options.offset = 0;
     this.menu = new PopperJS(reference, popper, options);
    // this.popperElm = popper;
    },
   clearValue(){
     this.oldValue = this.currentValue;
      this.unActive();
     this.currentValue = [];
     this.currentOptions = [];
     this.currentLabels = [];
     this.labels = null;
     this.$emit("input",[]);
   },
   destroyPopper(){

   },

   //初始化数据
   initData(){
     if(!(this.sourceData && this.sourceData.length>=1) ) return;
     if(!this.sourceData){
       console.error("数据不存在");
       return;
     }

     if(this.sortMode=="children" || this.loadData){
       this.initDataByChildren();
       return;
     }
     if(this.sortMode=="level"){
       this.initDataBylevel();
       return;
     }

     this.initDataByPid();

    // this.showMenuData = [this.pidData[this.rootIdKey]];

  },
  backFillLodaData(val){
    let id = val[0];
    let backFillUrl = this.loadData.backFillUrl;
    if(!backFillUrl){
      console.log("参数loadData.backFillUrl不存在!")
      return;
    }
    let vm = this;
    this.loading = true;
    this.pluginsCommon.req(backFillUrl,{value:id}).then(data=>{
      let tmpArr = [];
      tmpArr.push(vm.pidData[this.rootId])
      data.forEach((d,i)=>{
        let pid =  d[this.pidKey];
        let data = d.data;
        let item = vm.idData[pid];
        tmpArr.push(data);
        vm.initLoadData(item,data);
      })

      vm.showMenuData = tmpArr;
      vm.loading = false;
       vm.backFill(val);
    });
  },
  defLoadData(){
    let item = {};
    let vm = this;
    item[this.valueKey] = this.rootId ;
      this.loading = true;
    this.pluginsCommon.req(this.loadData.url,item).then(data=>{
      vm.sourceData = data;
      vm.initData();
      vm.loading = false;
       if(vm.value && !vm.value._flag && vm.value.length>0){
         vm.backFill(vm.value);
       }
  })
  }

 },
 created : function() {

  this.sourceData = $.extend(true,[],this.options);
  if(this.loadData && this.loadData.url ){
       this.defLoadData();
  }else{
   this.initData();
   if(this.value && !this.value._flag && this.value.length>0){
      this.backFill(this.value);
   }

  }

},
 mounted:function(){

 },
 destroyed() {
   this.destroyPopper();
 },

}
</script>
