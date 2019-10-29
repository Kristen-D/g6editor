<template>
<body id="bigscreen1">
  <div id="app">
    <section class="">
      <div class="">
          <el-row>
            <el-col :span="24">
              <div class="select-item">
                <el-select v-model="ip" :placeholder="name" filterable clearable size="medium" @change="selectIp(ip)">
                  <el-option-group
                    v-for="group in ipGroup"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </div>
              <div class="iframe-item">
                <iframe :src="srcParam" height="100%" width = "100%"></iframe>
              </div>
            </el-col>
          </el-row>
      </div>
  </section>
  </div>
</body>

</template>

<style >
.select-item {
  padding-top:20px;
  /* padding-left: 50px; */

}
.iframe-item {
  padding-top: 20px;
  /* padding-left: 50px;
  padding-right: 50px; */
  height:100vh;
}

</style>

<script>

export default {
  data(){
      return {
        name:'请选择',
        options3: [],
        ip: '',
        //分页参数
        pageIndex:1,
        pageSize:10,
        total:0,
        tabelData:[],
        ipGroup:[],
        ipData:[],
        srcParam:''
      }
  },
  methods:{
    selectIp(val){
      if(val != null && val!= ''){
        this.getUserPassWord(val);
      }
    },
    getUserPassWord(id){
      var params = {id:id};
      this.common.reqDef("/ssa/hostList/getUserPwdToken.do", params).then(data => {
        var ip = '';
        for(var i=0;i<this.ipData.length;i++){
          if(this.ipData[i].id == id){
            ip = this.ipData[i].ip;
          }
        }
        this.srcParam = 'http://'+ip+':9090?'+data.data;
        // console.log(this.srcParam);
      })
    },
    getHostGroup(){
      var params = {};
      this.common.reqDef("/ssa/hostList/getHostGroup.do", params).then(data => {
        for(var i=0;i<data.data.length;i++){
          var option = {
            label:'',
            options:[]
          }
          option.label = data.data[i].name;
          this.ipGroup.push(option);
        }
        this.getIp();

      })
    },
    getIp(){
      // console.log(this.searchData.group);
      var params = {};
      this.common.reqDef("/ssa/hostList/getIp.do", params).then(data => {
        this.ipData = data.data;
        for(var i=0;i<this.ipGroup.length;i++){
          for(var j=0;j<data.data.length;j++){
            if(data.data[j].group == this.ipGroup[i].label){
              var option={
                value: '',
                label: ''
              }
              option.value = data.data[j].id;
              if(data.data[j].alias == null || data.data[j].alias == ''){
                option.label = data.data[j].ip;
              }else {
                option.label = data.data[j].alias;
              }
              this.ipGroup[i].options.push(option);
            }

          }
        }
        // console.log(this.ipGroup);
        this.getUserPassWord(this.ipGroup[0].options[0].value);
        this.name = this.ipGroup[0].options[0].label;
      })
    }

  },

  created:  function() {
    this.getHostGroup();
    // this.getIp();


},
destroyed: function() {

}
}
</script>
