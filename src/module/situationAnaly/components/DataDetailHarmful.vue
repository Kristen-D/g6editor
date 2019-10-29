<template>
  <div class="dialog-import-content" style="padding-bottom: 30px;">
     <div class="details-attack-one" style="margin-top:-20px;" id="detailId1">
      <div class="dialog-subtitle">基础信息</div>
      <table class="dialog-table" :width="width1">
        <tbody id="tbodyH1">
        </tbody>
      </table>
    </div>
     <div class="details-attack-two" id="detailId2">
      <div class="dialog-subtitle">事件信息</div>
        <table class="dialog-table" :width="width2">
          <tbody id="tbodyH2">
          </tbody>
      </table>
     </div>
     <div class="details-attack-three" id="detailId3">
      <div class="dialog-subtitle">设备信息</div>
        <table class="dialog-table" :width="width3">
          <tbody id="tbodyH3">
        </tbody>
      </table>
     </div>
     <div class="details-attack-two">
      <div class="dialog-subtitle">处置信息</div>
        <table class="dialog-table" width="100%">
          <tbody>
            <tr >
              <td style="display:none;"></td>
              <td style="display:none;"></td>
              <td style="display:none;"></td>
              <td style="display:none;"></td>
              <td style="display:none;"></td>
              <td style="display:none;"></td>
            </tr>
            <tr>
              <td colspan="1">具体内容</td>
              <td colspan="5" style='white-space:pre-wrap;!important;word-break:break-all;'>{{ tableData.msg_s }}</td>
            </tr>

            <tr>
              <td colspan="1">信息描述</td>
              <td colspan="5"  style="white-space:pre-wrap;!important;word-break:break-all;">{{ tableData.msg_content }}</td>
              </tr>
          </tbody>
      </table>
     </div>
  </div>

  </template>

  <script>
  import {mapState} from 'vuex'
    export default {
      data() {
        return {
          width1:'100%',
          width2:'100%',
          width3:'100%',
        }
      },
      props: ['tableData'],
      computed:{
        ...mapState({
           params:state=>state.context.params,
           eventTypeList:state=>state.context.eventTypeList,
           ProductTypeList:state=>state.context.ProductTypeList,
           EventThreatList:state=>state.context.EventThreatList,
           EventGradeList:state=>state.context.EventGradeList,
           EventRiskList:state=>state.context.EventRiskList,
       })},
       watch:{
        tableData:function(tableData){
          this.append1();
          this.append2();
          this.append3();
        }
      },
       methods:{
         append1(){
          var myData=[];
          var keyData=[
          // {"lname":"事件编号","name":"id"},
          {"lname":"持续时长","name":"duration_s"},
          {"lname":"发生时间","name":"logTime_dt"},
          {"lname":"次数","name":"count_i"},
          {"lname":"事件类型","name":"parentEventType_s"},
          {"lname":"事件子类型","name":"eventType_s"},
          {"lname":"事件动作","name":"action_s"},
          {"lname":"事件后果","name":"result_s"},
          {"lname":"风险等级","name":"riskLevel_s"},
          {"lname":"风险描述","name":"riskLevelDesc_s"},
          {"lname":"威胁类型","name":"threatType_s"},
          {"lname":"威胁描述","name":"threatTypeDesc_s"},
          {"lname":"等级","name":"severityLevel_s"},
          {"lname":"等级描述","name":"severityLevelDesc_s"},

        ];

         for(var i=0;i<keyData.length;i++){
            for(var key in this.tableData){//取出map对象的值
              if(this.tableData[key]!=null&&this.tableData[key]!=''&&key==keyData[i].name){
                var child={};
                child["name"]=key;
                child["lname"]=keyData[i].lname;
                if(key=="parentEventType_s"||key=="eventType_s"){
                  child["value"]=this.fmtEventTypeList(this.tableData[key]);
                }else if(key=="riskLevel_s"){
                  child["value"]=this.fmtEventRiskList(this.tableData[key]);
                }else if(key=="threatType_s"){
                  child["value"]=this.fmtEventThreatList(this.tableData[key]);
                }else if(key=="severityLevel_s"){
                  child["value"]=this.fmtEventGradeList(this.tableData[key]);
                }else{
                  child["value"]=this.tableData[key];
                }

                myData.push(child);
              }
            }
       }


       if(myData.length<3){
        // trStr+="<tr style='visibility: hidden!important;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        this.width1= 33*myData.length;
        this.width1+="%";
       }else{
         this.width1="100%";
       }


       var trStr="<tr>";
        var trlen=0;

        for(var i=0;i<myData.length;i++){
        trStr+="<td colspan='1'>"+ myData[i].lname +"</td><td colspan='2'>"+ myData[i].value +"</td>";
        trlen=trlen+1;
        if (i==myData.length-1){
            trStr+="</tr>";
        }else if (trlen==3){
            trlen=0;
            trStr+="</tr><tr>";
        }

        }

       $("#tbodyH1").html(trStr);
 },
    append2(){
      var myData=[];
      var keyData=[

      {"lname":"检查得分","name":"score_s"},
      {"lname":"阶段","name":"pattackPhase_s"},
      {"lname":"规则ID","name":"ruleId_s"},
      {"lname":"用户名称","name":"user_s"},
      {"lname":"规则名称","name":"ruleName_s"},
      {"lname":"文件名称","name":"fileName_s"},
      {"lname":"病毒名称","name":"virusName_s"},
      // {"lname":"恶意软件","name":"malwareName_s"},
      {"lname":"协议","name":"protocol_s"},
      {"lname":"攻击IP","name":"srcIp_s"},
      {"lname":"攻击地点","name":"event_src_ip_area"},
      {"lname":"攻击端口","name":"srcPort_s"},
      {"lname":"目标IP","name":"dstIp_s"},
      {"lname":"目标地点","name":"event_dest_ip_area"},
      {"lname":"目标端口","name":"dstPort_s"},
      {"lname":"数据来源","name":"direction_s"},


      {"lname":"感染IP","name":"infectionDstIp_s"},
      {"lname":"产品端点","name":"infectionDstName_s"},
      {"lname":"恶意软件","name":"malwareName_s"},
      {"lname":"来源主机","name":"product_ip"},
      {"lname":"结果","name":"result_s"},
      {"lname":"执行的动作","name":"action_s"},
      {"lname":"执行动作时间","name":"actionTime_dt"},
      {"lname":"汇总数","name":"aggregatedCnt_s"},
      {"lname":"应用属性id","name":"appAttId_s"},
      {"lname":"应用类型","name":"appType_s"},
      {"lname":"ATP相关标识0,1","name":"aptRelated_s"},
      {"lname":"应用id","name":"appId_s"},
      {"lname":"资产类型","name":"assettype_s"},
      {"lname":"BOT命令","name":"botCmd_s"},
      {"lname":"BOTurl","name":"botUrl_s"},
      {"lname":"检查源","name":"cccaDetectionSrc_s"},
      {"lname":"检查来源","name":"cccaDirection_s"},
      {"lname":"CCCA地址","name":"cccaDstIp_s"},
      {"lname":"CCCA类型","name":"cccaType_s"},
      {"lname":"通道名称","name":"channelName_s"},
      {"lname":"客户端名","name":"clientName_s"},
      {"lname":"漏洞的CNNVD信息","name":"cnnvdinfo_s"},
      {"lname":"文档名","name":"compressedFileName_s"},
      {"lname":"可信度","name":"confidenceLevel_s"},
      {"lname":"总数","name":"count_i"},
      {"lname":"紧急漏洞数","name":"criticalCve_i"},
      {"lname":"漏洞CVE信息","name":"cveInfo_s"},
      {"lname":"漏洞名称","name":"cveName_s"},
      {"lname":"漏洞分类","name":"cveType_s"},
      {"lname":"拒绝类型","name":"denyType_s"},
      {"lname":"描述","name":"desc_s"},
      {"lname":"检测引擎组件","name":"detectionComp_s"},
      {"lname":"检测类型","name":"detectionType_s"},
      {"lname":"设备IP","name":"deviceIp_s"},
      {"lname":"设备mac","name":"deviceMac_s"},
      {"lname":"设备名","name":"deviceName_s"},
      {"lname":"设备程序名","name":"deviceProcessName_s"},
      {"lname":"域名","name":"domain_s"},
      {"lname":"目的主机所属组","name":"dstGroup_s"},
      {"lname":"目的主机名","name":"dstHostName_s"},
      {"lname":"出接口","name":"dstInterface_s"},
      {"lname":"目的主机mac","name":"dstMac_s"},
      {"lname":"目的主机操作系统","name":"dstOsName_s"},
      {"lname":"目标用户","name":"dstUser_s"},
      {"lname":"策略使用于目的区","name":"dstZone_s"},
      {"lname":"扫描结束时间","name":"endTime_s"},
      {"lname":"文件路径","name":"filePath_s"},
      {"lname":"文件类型","name":"fileType_s"},
      {"lname":"黑客组织名","name":"hackerGroup_s"},
      {"lname":"黑客战役","name":"hackingCampaign_s"},
      {"lname":"高风险漏洞数","name":"hRiskCve_i"},
      {"lname":"信息漏洞数","name":"infoCve_i"},
      {"lname":"相关IP","name":"interestedIp_s"},
      {"lname":"ips作用的规则id","name":"ipsRule_s"},
      {"lname":"低风险漏洞数","name":"lRiskCve_i"},
      {"lname":"日志子类型","name":"logSubType_s"},
      {"lname":"日志类型","name":"logType_s"},
      {"lname":"邮件接收人","name":"mailRecipient_s"},
      {"lname":"邮件发送人","name":"mailSender_s"},
      {"lname":"邮件主题","name":"mailSubject_s"},
      {"lname":"恶意软件家族","name":"malwareFamily_s"},
      {"lname":"恶意软件名","name":"malwareName_s"},
      {"lname":"恶意软件类型","name":"malwareType_s"},
      {"lname":"方法(POST/GET)","name":"method_s"},
      {"lname":"中风险漏洞数","name":"mRiskCve_i"},
      {"lname":"对象类型","name":"object_s"},
      {"lname":"包数量","name":"packet_i"},
      {"lname":"原发性攻击阶段","name":"pattackPhase_s"},
      {"lname":"密码","name":"password_s"},
      {"lname":"对端IP","name":"peerIp_s"},
      {"lname":"策略名","name":"policy_s"},
      {"lname":"协议","name":"protocol_s"},
      {"lname":"协议组","name":"protoGroup_s"},
      {"lname":"宽带控制策略规则名","name":"qosRuleName_s"},
      {"lname":"真实地址","name":"realIp_s"},
      {"lname":"参考信息","name":"reference_s"},
      {"lname":"web服务响应码","name":"responseCode_s"},
      {"lname":"执行动作后产生的结果","name":"result_s"},
      {"lname":"接收大小","name":"recvSize_s"},
      {"lname":"风险级别","name":"riskLevel_s"},
      {"lname":"风险级别描述","name":"riskLevelDesc_s"},
      {"lname":"已经或潜在风险","name":"riskType_s"},
      {"lname":"违反的策略名","name":"ruleCategory_s"},
      {"lname":"规则id","name":"ruleId_s"},
      {"lname":"策略规则名","name":"ruleName_s"},
      {"lname":"二次攻击阶段","name":"sattackPhase_s"},
      {"lname":"检查结果分","name":"score_s"},
      {"lname":"扫描路径","name":"scanPath_s"},
      {"lname":"服务名","name":"service_s"},
      {"lname":"发送大小","name":"sendSize_s"},
      {"lname":"服务器名(被访问)","name":"serverName_s"},
      {"lname":"服务类型id","name":"serviceId_s"},
      {"lname":"会话id","name":"sessionId_s"},
      {"lname":"严重等级","name":"severityLevel_s"},
      {"lname":"严重程序描述","name":"severityLevelDesc_s"},
      {"lname":"请求来源类型","name":"sourceType_s"},
      {"lname":"解决方案","name":"solution_s"},
      {"lname":"源主机所在组","name":"srcGroup_s"},
      {"lname":"源主机名","name":"srcHostName_s"},
      {"lname":"源主机mac","name":"srcMac_s"},
      {"lname":"入接口","name":"srcInterface_s"},
      {"lname":"源主机操作系统","name":"srcOsName_s"},
      {"lname":"原端用户","name":"srcUser_s"},
      {"lname":"策略使用于源区","name":"srcZone_s"},
      {"lname":"扫描开始时间","name":"startTime_dt"},
      {"lname":"事件提交者","name":"submitter_s"},
      {"lname":"事件提交者主机名","name":"submitterName_s"},
      {"lname":"任务ID","name":"taskid_s"},
      {"lname":"网站标题","name":"title_s"},
      {"lname":"威胁名","name":"threatName_s"},
      {"lname":"URL类型","name":"urlCategory_s"},
      {"lname":"登录或验证用户名","name":"user_s"},
      {"lname":"用户所属组","name":"userGroup_s"},
      {"lname":"LANId","name":"vlanId_s"},
      {"lname":"vpn的类型","name":"vpnType_s"},
      {"lname":"弱密码类型","name":"weakPassType_s"},

      {"lname":"URL","name":"event_url"},
    ];


    // <tr>
    //   <td rowspan="2"></td>
    //   <td rowspan="2" class="dialog-attack-number" :style="{color: tableData.event_check_score>90?'#03a182':(tableData.event_check_score>80?'#ff8400':'#f72e00')}">{{ tableData.event_check_score }}</td>
      //
      // <td >{{fmtPacketDirection(tableData.)}}</td>
      // <td colspan="3" style="overflow-x:auto;"> {{ tableData. }} </td>



     for(var i=0;i<keyData.length;i++){
        for(var key in this.tableData){//取出map对象的值
          if(this.tableData[key]!=null&&this.tableData[key]!=''&&key==keyData[i].name){
            var child={};
            child["name"]=key;
            child["lname"]=keyData[i].lname;
            if(key=="parentEventType_s"||key=="eventType_s"){
              child["value"]=this.fmtEventTypeList(this.tableData[key]);
            }else if(key=="direction_s"){
              child["value"]=this.fmtPacketDirection(this.tableData[key]);
            }else{
              child["value"]=this.tableData[key];
            }

            myData.push(child);
          }
        }
    }

    if(myData.length<3){
     // trStr+="<tr style='visibility: hidden!important;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
     this.width2= 33*myData.length;
     this.width2+="%";
    }else{
      this.width2="100%";
    }

    var trStr="<tr>";
     var trlen=0;

     for(var i=0;i<myData.length;i++){

     if(myData[i].name=="event_url"){
        trStr+="</tr><tr>";
        trStr+="<td colspan='1'>"+ myData[i].lname +"</td><td colspan='5'  style='white-space:pre-wrap;!important;word-break:break-all;'>"+ myData[i].value +"</td></tr>";
     }else{
       trStr+="<td colspan='1'>"+ myData[i].lname +"</td><td colspan='1'>"+ myData[i].value +"</td>";
       trlen=trlen+1;

       if (i==myData.length-1){
           trStr+="</tr>";
       }else if (trlen==3){
           trlen=0;
           trStr+="</tr><tr>";
       }


     }



     }

    $("#tbodyH2").html(trStr);
},
   append3(){
      var myData=[];
      var keyData=[
      {"lname":"设备名称","name":"deviceType_s"},
      {"lname":"设备类别","name":"product_type"},
      {"lname":"设备IP","name":"deviceIp_s"},
      {"lname":"设备所属地区","name":"product_area_name"},
      {"lname":"设备版本号","name":"deviceVersion_s"},
    ];


     for(var i=0;i<keyData.length;i++){
        for(var key in this.tableData){//取出map对象的值
          if(this.tableData[key]!=null&&this.tableData[key]!=''&&key==keyData[i].name){
            var child={};
            child["name"]=key;
            child["lname"]=keyData[i].lname;
            if(key=="product_type"){
              child["value"]=this.fmtProductTypeList(this.tableData[key]);
            }else{
              child["value"]=this.tableData[key];
            }

            myData.push(child);
          }
        }
    }

    if(myData.length<3){
     // trStr+="<tr style='visibility: hidden!important;'><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    this.width3= 33*myData.length;
    this.width3+="%";
    }else{
    this.width3="100%";
    }


    var trStr="<tr>";
     var trlen=0;

     for(var i=0;i<myData.length;i++){
     trStr+="<td colspan='1'>"+ myData[i].lname +"</td><td colspan='1'>"+ myData[i].value +"</td>";
     trlen=trlen+1;
     if (i==myData.length-1){
         trStr+="</tr>";
     }else if (trlen==3){
         trlen=0;
         trStr+="</tr><tr>";
     }

     }

    $("#tbodyH3").html(trStr);
},



         fmtEventTypeList(val){
          // console.log(val);
            for(var item in this.eventTypeList) {
                if (val==this.eventTypeList[item].id){
                  return this.eventTypeList[item].text;
                }
            }

         },
         fmtProductTypeList(val){
          // console.log(val);
            for(var item in this.ProductTypeList) {
                if (val==this.ProductTypeList[item].id){
                  return this.ProductTypeList[item].text;
                }
            }

         },
         fmtEventThreatList(val){
            for(var item in this.EventThreatList) {
                if (val==this.EventThreatList[item].id){
                  return this.EventThreatList[item].text;
                }
            }

         },
         fmtEventGradeList(val){
          // console.log(val);
            for(var item in this.EventGradeList) {
                if (val==this.EventGradeList[item].id){
                  return this.EventGradeList[item].text;
                }
            }

         },
        fmtEventRiskList(val){
             // console.log(val);
               for(var item in this.EventRiskList) {
                   if (val==this.EventRiskList[item].id){
                     return this.EventRiskList[item].text;
                   }
               }

            },
          fmtStatus(val){
               // console.log(val);
                 if (val=="0"){
                   return "待提交";
                 }else if (val=="1") {
                    return "流程进行中";
                 }else if (val=="2") {
                    return "已完成";
                 }else{
                    return "尚未处理";
                 }

          },
          fmtPacketDirection(val){//数据来源
               // console.log(val);
                 if (val=="0"){
                   return "内部";
                 }else if (val=="1") {
                    return "外部";
                 }
          },

      },
      mounted: function() {
          this.append1();
          this.append2();
          this.append3();
    }
  }
  </script>
