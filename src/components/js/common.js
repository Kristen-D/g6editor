import Vue from 'vue';
const publickey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbR8srPaS9LSsvl8tKa7CWvw2F" +
  "ZNFfH6KHuOlhtIyWWEx5bm6RtAlemUw9WhFUqcFEoBjTomTksMQNplP/yZ4czdJ7" +
  "HFAd1MDC0NsH/Q0UBT46U/2o0TXNxDW4ZglE0+b/k6kiC0cwgqVbuvRwz2jVwi3A" +
  "OJK8bQfu3+2iPkpd3QIDAQAB";
export default {
  req(url, params, context) {
    if (url == null) return;
    var dataType = "json";
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: dataType,
        success: function(result) {
          if (result.state) {
            //  cb(data.result);
            resolve(result.data);
          } else {
            let message = result.message;
            if (result.data == 0) {
              console.log(result.message);
              message = "后台异常";
            }
            if (context) context.$alert(message, '失败');
            reject(message);
          }
        },
        error: function(msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },
  reqDef(url, params, context) {
    if (url == null) return;
    var dataType = "json";
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: dataType,
        success: function(result) {
          if (result.state) {
            resolve(result);
          } else {
            let message = result.message;
            if (result.data == 0) {
              console.log(result.message);
              message = "后台异常";
            }
            if (context) context.$alert(message, '失败');
            console.log(message);
            reject(message);
          }
        },
        error: function(msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },
  isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  reqBackState(url, params, context) {
    if (url == null) return;
    var dataType = "json";
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: dataType,
        success: function(result) {
          resolve(result);
        },
        error: function(msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },
  reqObjBackState(url, params, context) {
    if (url == null) return;
    var dataType = "json";
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        dataType: dataType,
        success: function (result) {
          resolve(result);
        },
        error: function (msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },
  reqObj(url, params, context) {
    if (url == null) return;
    var dataType = "json";
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        dataType: dataType,
        success: function (result) {
          if (result.state) {
            //  cb(data.result);
            resolve(result.data);
          } else {
            let message = result.message;
            if (result.data == 0) {
              console.log(result.message);
              message = "后台异常";
            }
            if (context) context.$alert(message, '失败');
            reject(message);
          }
        },
        error: function (msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },
  requestWithComplexContent(url, params, context) {
    if (url == null) return;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: url,
        data: params,
        contentType: 'application/json',
        success: function(result) {

          resolve(result);
        },
        error: function(msg) {
          // alert($.toJSON(msg))
          console.log(msg);
          reject(msg);
        }
      })
    });
  },

  formatDate(date, format) {
    if (!format) format = "yyyy-MM-dd hh:mm:ss";

    if (!date || date == null) return null;
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },

  fmtListToTree(dataList, idname = 'id', pidname = 'pid', rootId = -1, nodeHandle) {
    let result = {};
    let idTree = {};
    let pidTree = {};
    dataList.forEach(data => {

      var id = data[idname];
      var pid = data[pidname];
      data.id = id;
      idTree[id] = data;
      var plist = pidTree[pid];
      if (!plist) {
        pidTree[pid] = [];
        plist = pidTree[pid];
      }
      if (nodeHandle) {
        nodeHandle(data)
      }
      plist.push(data);
    })
    let tree = pidTree[rootId];
    tree.forEach(r => {
      this.setTreeChild(r, idname, pidTree);
    })

    result.idTree = idTree;
    result.pidTree = pidTree;
    result.tree = tree;
    return result;
  },
  getAllTreeCheckedKeys(leafNodes, idTree) {
    var temp = {};
    leafNodes.forEach(leaf => {
      this.setPidToTemp(leaf, temp, idTree);
    })
    var pidArr = [];
    for (var id in temp) {
      pidArr.push(id);
    }
    return pidArr;
  },
  setPidToTemp(node, temp, idTree) {
    let pid = node.pid;
    let p = idTree[pid];

    if (p) {
      temp[pid] = p;
      this.setPidToTemp(p, temp, idTree);
    }
  },
  setTreeChild(pnode, idname, pidTree) {
    var id = pnode[idname];
    var plist = pidTree[id];
    if (plist) {
      pnode.children = plist;
      plist.forEach(p => {
        this.setTreeChild(p, idname, pidTree);
      })
    }

  },
  groupByObjListField(objList, field) {
    var result = [];
    objList.forEach(obj => {
      let f = obj[field];
      if ($.inArray(f, result) < 0) {
        result.push(f);
      }
    });
    return result;
  },
  hasRole(roles, array) {
    var flag = false;
    var i;
    for (i in array) {
      for (var j = 0; j < roles.length; j++) {
        if (roles[j].roleId == array[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    return flag;
  },
  checkForm(formName, vm) {
    var flag = false;
    vm.$refs[formName].validate((valid) => {
      if (valid) {
        flag = true;
      }
    });
    return flag;
  },
  initArrayData(arrays, map, idName) {
    arrays.forEach(d => {
      var id = d[idName];
      map[id] = d;
    })
  },
  getPidData(pidDataMap, pid) {
    var pidData = pidDataMap[pid];
    if (!pidData) {
      pidData = [];
      pidDataMap[pid] = pidData;
    }
    return pidData;
  },

  regCheckPwd(id) {
    var newPwd = $("#" + id).val();
    var msg = $("#" + id + "Msg");
    var patt1 = new RegExp(/[a-z]+/g);
    var patt2 = new RegExp(/[A-Z]+/g);
    var patt3 = new RegExp(/[0-9]+/g);
    var patt4 = new RegExp(/[`~!@#\$%\^\&\*\(\)_\+\|<>\?:"\{\},\.\\\/;'\[\]]/im);
    var flag = (patt4.test(newPwd) && patt1.test(newPwd) && patt2.test(newPwd) && patt3.test(newPwd) && newPwd.length >= 8 && newPwd.length <= 16);
    if (!flag) msg.text("密码8到16位 必须包含数字,大小写英文字母和特殊字符");
    return flag;
  },

  validatePhone(id) {
    var value = $("#" + id).val();
    let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/;
    var flag = reg.test(value)
    if (flag) {
      $('#phoneMsg').text();
    } else {
      $('#phoneMsg').text("手机格式不对");
    }
    return flag;
  },

  validateEmail(id) {
    var value = $("#" + id).val();
    let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    var flag = reg.test(value)
    if (flag) {
      $('#emailMsg').text();
    } else {
      $('#emailMsg').text("邮箱格式不对");
    }
    return flag;
  },
  groupById(data, fid) {
    let map = {};
    data.forEach(d => {
      let id = d[fid];
      if (!map[id]) map[id] = true;
    })
    let arr = [];
    for (var id in map) {
      arr.push(id);
    }
    return arr;
  },
  fmtInsideData(data, yType, xType, value) {
    let map = {};

    data.forEach(d => {
      let x = d[xType];
      let y = d[yType];
      let item = map[x];
      if (!item) {
        item = {};
        map[x] = item;
      }

      item[y] = d[value];
    })
    return map;
  },
  getTableColunms(table) {
    let el_columns = table.columns;
    let columns = [];
    el_columns.forEach(el => {
      let type = el.type;
      let label = el.label;
      let property = el.property;
      if (type == "default" && label && property) {
        let col = {};
        col.name = label;
        col.value = property;
        columns.push(col);
      }
    });
    return columns;
  },
  convertUrlString(obj) {
    let i = 0;
    let str = '';
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let flag = 0 === i++ ? '?' : '&';
        str += `${flag}${key}=${obj[key]}`;
      }
    }
    return str;
  },
  convertArray2Obj(list, key, value) {
    let obj = {};
    for (let l of list) {
      obj[l[key]] = l[value];
    };
    return obj;
  },
  convertObj2Array(obj, key, value) {
    let list = [];
    for (let o in obj) {
      // let newObj = {key: o, value: obj[o]};
      let newObj = {};
      newObj[key] = o;
      newObj[value] = obj[o];
      list.push(newObj);
    };
    return list;
  },

  encrypt(str) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publickey);
    var m = encrypt.encrypt(str + "");
    return m;
  },
  getDateList(day, pattern) {
    let nowDate = new Date();
    let ds = [];
    ds.push(this.formatDate(nowDate, pattern))
    for (let i = day - 1; i > 0; i--) {
      nowDate.setDate(nowDate.getDate() - 1)
      ds.push(this.formatDate(nowDate, pattern))
    }
    // ds.sort((a, b) => {
    //   return a - b;
    // })
    ds.reverse();
    return ds;
  },
  getMinList(mins, pattern) {
    let nowDate = new Date();
    let ms = [];
    for (let i = mins; i > 0; i--) {
      nowDate.setMinutes(nowDate.getMinutes() - 1)
      ms.push(this.formatDate(nowDate, pattern))
    }
    // ms.sort((a, b) => {
    //   return a - b;
    // })
    ms.reverse();
    return ms;
  },
  getSecondList(seconds, pattern) {
    let nowDate = new Date();
    let ss = [];
    for (let i = seconds; i > 0; i--) {
      nowDate.setSeconds(nowDate.getSeconds() - 1)
      ss.push(this.formatDate(nowDate, pattern))
    }
    ss.reverse();
    // ss.sort((a, b) => {
    //   return a - b;
    // })
    return ss;
  },
  doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },
  getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds);
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },
  getPercentWithPrecision(valueList, idx, precision) {
    if (!valueList[idx]) { return 0 }
    let sum = valueList.reduce((acc, val) => {
      return acc + (isNaN(val) ? 0 : val)
    }, 0)
    if (sum === 0) { return 0 }
    // console.log('sum', sum)// sum 9   
    let digits = Math.pow(10, precision)// digits 100   10的precision 次幂
    // console.log('digits', digits)
    let votesPerQuota = valueList.map((val) => {
      return (isNaN(val) ? 0 : val) / sum * digits * 100 // 扩大比例，这样可以确保整数部分是已经确定的议席配额，小数部分是余额   
    })
    // console.log('votesPerQuota', votesPerQuota)// votesPerQuota [ 2222.222222222222, 4444.444444444444, 3333.333333333333 ] 每一个项获得的议席配额，整数部分是已经确定的议席配额，小数部分是余额    
    let targetSeats = digits * 100 // targetSeats 10000 全部的议席    
    // console.log('targetSeats', targetSeats)
    let seats = votesPerQuota.map((votes) => {
      // Assign automatic seats.    
      return Math.floor(votes)
    })
    // console.log('seats', seats)// seats [ 2222, 4444, 3333 ] 获取配额的整数部分   
    let currentSum = seats.reduce((acc, val) => {
      return acc + val
    }, 0)
    // console.log('currentSum', currentSum)// 9999 表示已经配额了9999个议席，还剩下一个议席    
    let remainder = votesPerQuota.map((votes, idx) => {
      return votes - seats[idx]
    })
    // console.log('remainder', remainder)// [ 0.2222222222221717, 0.4444444444443434, 0.33333333333303017 ] 得到每一项的余额
    // Has remainding votes. 如果还有剩余的坐席就继续分配   
    while (currentSum < targetSeats) {
      // Find next largest remainder. 找到下一个最大的余额       
      let max = Number.NEGATIVE_INFINITY
      let maxId = null
      for (let i = 0, len = remainder.length; i < len; ++i) {
        if (remainder[i] > max) {
          max = remainder[i]
          maxId = i
        }
      }
      // max: 0.4444444444443434, maxId 1
      // Add a vote to max remainder.       
      ++seats[maxId]// 第二项，即4的占比的坐席增加1       
      remainder[maxId] = 0
      ++currentSum// 总的已分配的坐席数也加1   
    }
    return seats[idx] / digits
  },
 getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
  return unescape(r[2]);
  }
  return undefined;
}

}
