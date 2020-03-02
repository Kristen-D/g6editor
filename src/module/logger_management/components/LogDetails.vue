<template>
<div>

  <div class="operate_type">
    <span style="padding-right: 50px;">操作类型:</span>
    <span>{{this.params.operateType}}</span>
  </div><br>

  <div class="log_type">
    <span style="padding-right: 50px;">日志类型:</span>
    <span>{{this.params.logType}}</span>
  </div><br>

  <div class="spend_time">
    <span style="padding-right: 50px;">消耗时长:</span>
    <span>{{this.params.spendTime}}</span>
  </div><br>

  <div class="user_name">
    <span style="padding-right: 50px;">操作用户:</span>
    <span>{{this.params.userName}}</span>
  </div><br>

  <div class="description">
    <span style="padding-right: 50px;">操作描述:</span>
    <span>{{this.params.description}}</span>
  </div><br>

  <div class="start_time">
    <span style="padding-right: 50px;">操作时间:</span>
    <span>{{this.params.startTime}}</span>
  </div><br>

  <el-button type="gray" class="button-p-3" @click="resetForm">返回</el-button>
</div>
</template>

<script>

export default {
  components: {
  },
  computed: {
  },
  data() {
    return {
      params:[]

  }
},
  methods: {
    resetForm(){
        this.$router.push({name:'logoperation'});
    },
    getParams(){
      this.params = this.$route.params;
    }

},
  created: async function() {
    this.getParams();

}
}
</script>
