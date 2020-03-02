//日期时间格式
function TimeFormat(time){
  let dateStr = '';
  if(time){
    let date = new Date(time);
    dateStr+= date.getFullYear();
    dateStr+= "-" + (date.getMonth() + 1 < 10 ? '0'+ (date.getMonth() + 1):date.getMonth() + 1);
    dateStr+= "-" +  (date.getDate() < 10 ? '0' +  date.getDate() :  date.getDate());
    dateStr+=  "  " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    dateStr+= ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    dateStr+= ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  }
  return dateStr;
}

//总线任务状态
function traceJobStatusFormat(status) {
  var str = '';
  if (status) {
    if (status == 'Finished') {
      str = '已完成';
    } else if (status == 'Running') {
      str = '运行中';
    } else if (status == 'Error') {
      str = '出现错误';
    }
    return str;
  }
}

//子任务状态
function subJobStatusFormat(status) {
  var str = '';
  if (status) {
    if (status == 'Success') {
      str = '执行成功';
    } else if (status == 'Running') {
      str = '运行中';
    } else if (status == 'Error') {
      str = '执行出错';
    }
    return str;
  }
}


// 任务类型
function  jobTypeFormat(type){
  var str = '';
  if (type) {
      if (type == 'TraceJob') {
          str = '总线任务';
      } else if (type == 'SubJob') {
          str = '子任务';
      }
  }
  return str;
}

//安全服务状态
function serviceStatusFormat(status) {
  var str = '';
  if (status) {
    if ('Deploying' === status) {
      str = '部署中';
    } else if ('Deployed-success' === status) {
      str = '部署成功';
    } else if ('Deployed-fail' === status) {
      str = '部署失败';
    } else if ('Destroying' === status) {
      str = '销毁中';
    } else if ('Destroyed-success' === status) {
      str = '销毁成功';
    } else if ('Destroyed-fail' === status) {
      str = '销毁失败';
    }
    return str;
  }
}

// 安全服务所属类型
function  serviceTypeFormat(type) {
  var str = '';
  if (type) {
    if (type == 'WAF') {
      str = 'web应用防火墙';
    } else if (type == 'IPS') {
      str = '入侵防御系统';
    } else if (type == 'SCAN') {
      str = '漏洞扫描系统';
    } else if (type == 'ANTIVIRUS') {
      str = '防病毒系统';
    } else if (type == 'FIREWALL') {
      str = '防火墙';
    }
    return str;
  }
}

// 安全市场--大类型classification

function  marketTypeFormat(classification) {
  var str = '';
  if (classification) {
    if (classification == ' PROTECT') {
      str = '防护类';
    } else if (classification == 'AUDIT') {
      str = '审计类';
    }
  }
  return str;
}

//售卖状态
function sellingStateFmt(status) {
  var str = '';
  if (status) {
    if (status === 'on') {
      str = '已上架';
    } else if (status === 'off') {
      str = '已下架';
    } else if (status === 'draft'){
      str = '草稿';
    }
  }
  return str;
}

export {TimeFormat, traceJobStatusFormat, subJobStatusFormat, jobTypeFormat, serviceStatusFormat, serviceTypeFormat, marketTypeFormat, sellingStateFmt}


