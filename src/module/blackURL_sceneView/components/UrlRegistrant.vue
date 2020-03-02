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
      				<span class="square">{{index+1}}</span>
      				<label class="">{{item.name}}</label>
      				<span class="float-r">{{item.date}}</span>
      			</li>
      		</ul>
	  	    </div>
        <div class="">
        	<h4 class="el-subtitle2"><i class="el-icon-caret-right"></i>关联邮件New</h4>
        	<ul class="list m-b-30">
            <li v-for="(item, index) in email">
      				<span class="square">{{index+1}}</span>
      				<label class="">{{item.name}}</label>
              <!-- style="white-space: nowrap;  overflow: hidden;  text-overflow:ellipsis; width:170px;display:inline-block; " -->
      				<span class="float-r">{{item.date}}</span>
      			</li>
        	</ul>
        </div>
	    </div>
	</div>
</template>
<script>

  export default {
    data() {
      return {
        registrantList: [],
        email:[]
      }
    },
  async  created () {
      // this.common.req('/ssa/blackURL/UrlTypeTOP.do', {}, this).then((data) => {
      //   this.registrantList = data[0];
      // });
       let data = await this.common.req('/ssa/blackURL/UrlRegistrant.do', {}, this);
       let email = await this.common.req('/ssa/blackURL/UrlRegEmail.do', {}, this);
       this.registrantList = data;
       this.email=email;
    }
  }
</script>
