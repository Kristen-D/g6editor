<template>
  <div class="alarm-list">
    <div class="list">
      <div class="list-item list-head">
        <span class="col-1">告警内容</span>
        <span class="col-2">级别</span>
        <span class="col-3">目标IP</span>
        <span class="col-4">攻击源IP</span>
        <span class="col-5">时间</span>
      </div>
      <div class="list-item">
        <span class="col-1">告警告警内容在这里可能很长超过…内容</span>
        <span class="col-2">高危</span>
        <span class="col-3">10.2.115.26</span>
        <span class="col-4">77.87.120.33</span>
        <span class="col-5">2018-03-05  09:57:08</span>
      </div>
      <div class="list-item">
        <span class="col-1">告警告警内容在这里可能很长超过…内容</span>
        <span class="col-2">高危</span>
        <span class="col-3">10.2.115.26</span>
        <span class="col-4">77.87.120.33</span>
        <span class="col-5">2018-03-05  09:57:08</span>
      </div>
      <div class="list-item">
        <span class="col-1">告警告警内容在这里可能很长超过…内容</span>
        <span class="col-2">高危</span>
        <span class="col-3">10.2.115.26</span>
        <span class="col-4">77.87.120.33</span>
        <span class="col-5">2018-03-05  09:57:08</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alarm-list"
  }
</script>

<style scoped>
  .list-item {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .list-item span {
    float: left;
    overflow : hidden;
    text-overflow: ellipsis;
    height: 100%;
    white-space: nowrap;
  }
  .list-item.list-head {
    font-size: 18px;
  }
  .list-item .col-1 {
    width: 35%;
  }
  .list-item .col-2 {
    width: 10%;
  }
  .list-item .col-3 {
    width: 15%;
  }

  .list-item .col-4 {
    width: 15%;
  }

  .list-item .col-5 {
    width: 25%;
  }

</style>
