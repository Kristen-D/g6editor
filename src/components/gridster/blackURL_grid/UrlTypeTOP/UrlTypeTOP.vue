<template>
  <div class="">
    <h4 class="el-panel-title">URL类型TOP</h4>
    <div class="text-center" style="margin:10px auto 30px">
       <h4 class="el-subtitle">共挖掘<span class="digital" >{{typeCount}}</span>种类型</h4>
     </div>
    <ul class="list-bar m-b-40">
      <li v-for="(item, index) in typeList" >
        <div class="progressbar">
					  <div class="progress-bar animated progress-animated" :class="colorlist[index]"  :style="'width:'+item.width"></div>
				 </div>
				 <div class="progresstext">
					<label>{{item.name}}</label>
					<span class="float-r">{{item.value}}个</span>
				 </div>
        <!-- <span class="list-number">{{index+1}}</span>
        <label class="text-ellipsis">{{(item.assert_name)}}</label>
        <span class="total">{{item.count}}个</span> -->
      </li>
   </ul>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        typeList: [],
        colorlist:['progress-bar-info','progress-bar-primary','progress-bar-blue'],
        typeCount:null,
      }
    },
  async  created () {
      // this.common.req('/ssa/blackURL/UrlTypeTOP.do', {}, this).then((data) => {
      //   this.typeList = data[0];
      // });console.log(this.typeList);
       let data = await this.common.req('/ssa/blackURL/UrlTypeTOP.do', {}, this);
       let topList = [];
       let valueCount = 0;
       data.forEach((d,i)=>{
         let value = d.value;
         valueCount = valueCount+value;
         if(i<3)topList.push(d);
       })

       topList.forEach(t=>{
         let value = t.value;
         t.width = (Math.round(value/valueCount*100))+"%";
       })
       this.typeCount = data.length;
       this.typeList = topList;

    }
  }
</script>
