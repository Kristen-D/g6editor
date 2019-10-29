<template>
  <div class="el-panel">
		<div class="el-panel-heading">
			<h4 class="el-panel-title">URL黑客关联</h4>
		</div>
	    <div class="el-panel-body shine">
	  	    <div class="">
	  	    	<h4 class="el-subtitle2"><i class="el-icon-caret-right"></i>关联组织New</h4>
	  	    	<ul class="list m-b-20">
			<li v-for="(item, index) in registrantList">
				<span class="square">{{index}}</span>
				<label class="">{{item.name}}</label>
				<span class="float-r">{{item.name}}</span>
			</li>

		</ul>
	  	    </div>
	<!-- <div class="">
		<h4 class="el-subtitle2"><i class="el-icon-caret-right"></i>关联邮件New</h4>
		<ul class="list m-b-30">
			<li>
				<span class="square">1</span>
				<span class="">Spanhause</span>
				<span class="float-r">2017-12-11</span>
			</li>

		</ul>
	</div> -->
	    </div>
	</div>
</template>
<script>

  export default {
    data() {
      return {
        registrantList: [],
      }
    },
  async  created () {
      // this.common.req('/ssa/blackURL/UrlTypeTOP.do', {}, this).then((data) => {
      //   this.registrantList = data[0];
      // });console.log(this.registrantList);
       let data = await this.common.req('/ssa/blackURL/UrlTypeTOP.do', {}, this);

       this.registrantList = data;

    }
  }
</script>
