<template>
  <div class="wraper container-fluid">


  	<div class="m-30">
  					<el-row :gutter="20">
  					 <el-col :span="24">
  						 <div class="el-panel el-panel-scenario">
  							 <ul class="scenario-tabs map_time">
  								  <li class="active"><a href="#">今天</a></li>
  								  <li><a href="#">近7天</a></li>
  								  <li><a href="#">近30天</a></li>
  						    </ul>
  					 </div>
  					</el-col>
  				 </el-row>

  				 </div>

  	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    components: {  } ,
    data(){

        return {

        }
    },
    computed:{

   },
   methods:{

   },
   created :async function() {

  }
}
</script>
