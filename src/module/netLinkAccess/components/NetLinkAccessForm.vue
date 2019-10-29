<template>
<div>

    <div class="whitebackground Whitespace">
      <div class="top-title" v-if="!this.$route.params.id">新增互联网接入网络链路</div>
      <div class="top-title" v-if="this.$route.params.id">编辑互联网接入网络链路</div>
      <el-form ref="netLLinkAForm" :model="netLLinkAForm" :rules="rules" label-width="150px" label-position="left">
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">单位信息</h4>
          </div>

          <el-form-item label="责任单位：" prop="operation_user_id" required>
            <selectOrganization v-model="netLLinkAForm.operation_user_id" class="set-input-width40" orgType="2" orgstring="请选择单位"  >
            </selectOrganization>
          </el-form-item>
          <el-form-item label="网站责任单位地址：" prop="unit_addr" required>
            <el-input v-model="netLLinkAForm.unit_addr" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="运维名称：" prop="unit_name" required>
            <el-input v-model="netLLinkAForm.unit_name" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>

        </div>

        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">安全负责人</h4>
          </div>
          <el-form-item label="姓名：" style="width:50%" prop="safety_charger" required>
            <el-input v-model="netLLinkAForm.safety_charger" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="职务/职称：" style="width:50%" prop="safety_charger_duty" required>
            <el-input v-model="netLLinkAForm.safety_charger_duty" placeholder="职务/职称"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" style="width:50%" prop="safety_charge_phone" required>
            <el-input v-model="netLLinkAForm.safety_charge_phone" placeholder="移动电话"></el-input>
          </el-form-item>
        </div>

        <div class="el-sub-panel">
        <div class="el-sub-panel-heading">
          <h4 class="sub-title">运行安全负责人</h4>
        </div>
        <el-form-item label="姓名：" style="width:50%" prop="operation_safety_charger" required>
          <el-input v-model="netLLinkAForm.operation_safety_charger" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="职务/职称：" style="width:50%" prop="operation_safety_charger_duty" required>
          <el-input v-model="netLLinkAForm.operation_safety_charger_duty" placeholder="职务/职称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" style="width:50%" prop="operation_safety_charger_phone" required>
          <el-input v-model="netLLinkAForm.operation_safety_charger_phone" placeholder="移动电话"></el-input>
        </el-form-item>
      </div>

      <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">其他信息</h4>
      </div>
      <el-form-item label="隶属关系：" prop="affiliation" required>
        <el-radio-group v-model="netLLinkAForm.affiliation" style="display:inline-block;">
          <el-radio label="中央" name="affiliation" style="width:60px;margin-left: 8px;"></el-radio>
          <el-radio label="省(自治区、直辖市)" name="affiliation" style="width:150px;margin-left: 8px;"></el-radio>
          <el-radio label="地区(区、市、州、盟)" name="affiliation" style="width:160px;margin-left: 5px;"></el-radio>
          <el-radio label="县(区、市、旗)" name="affiliation" style="width:150px;margin-left: 8px;"></el-radio>
          <el-radio label="其他" name="affiliation" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="netLLinkAForm.affiliation=='其他'" size="mini" v-model="netLLinkAForm.other_affiliation" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="单位类型：" prop="unit_type" required>
        <el-radio-group v-model="netLLinkAForm.unit_type" style="display:inline-block; width:90%">
          <el-radio label="党委机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="政府机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="事业单位" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="企业" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="其他" name="unit_type" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="netLLinkAForm.unit_type=='其他'" size="mini" v-model="netLLinkAForm.other_unit_type" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="行业类别：" prop="industry_category" required>
        <el-radio-group v-model="netLLinkAForm.industry_category" style="display:inline-block; width:90%">
          <el-radio v-for="item in categoryCheckbox" :label="item.value" style="width:22%;margin-left: 5px;">{{item.name}}
          </el-radio>
          <el-radio label="其他" name="industry_category" style="width:8%;margin-left: 5px;">其他</el-radio>
          <el-input v-if="netLLinkAForm.industry_category=='其他'" size="mini" v-model="netLLinkAForm.other_category" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>
          <!-- <el-input v-bind:disabled="unitHandleForm.category_other" v-model="unitHandleForm.other_category" style="display:inline-block; width:20%"></el-input> -->
      </el-form-item>
      <el-form-item label="等级保护定级：" prop="grading" required>
        <el-radio-group v-model="netLLinkAForm.grading">
          <el-radio label="2">二级</el-radio>
          <el-radio label="3">三级</el-radio>
          <el-radio label="4">四级</el-radio>
          <el-radio label="0">未定级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="等级测评：" prop="evaluation" required>
        <el-radio-group v-model="netLLinkAForm.evaluation">
          <el-radio label="1">已展开</el-radio>
          <el-radio label="0">未展开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网络安全责任书：" prop="safety_liability" required>
        <el-radio-group v-model="netLLinkAForm.safety_liability">
          <el-radio label="1">已签订</el-radio>
          <el-radio label="0">未签订</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接入网络承载应用系统情况：" prop="application_system_situation" required>
        <el-input v-model="netLLinkAForm.application_system_situation" placeholder=""></el-input>
      </el-form-item>
    </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">接入网络信息</h4>
          </div>
          <el-form-item label="IP地址范围：" prop="ip_range_check" required>
            <el-input v-model="netLLinkAForm.ip_range1" placeholder="" class="set-input-width40" style="display:inline-block; width:200px"></el-input>
            <span>-</span>
            <el-input v-model="netLLinkAForm.ip_range2" placeholder="" class="set-input-width40" style="display:inline-block; width:200px"></el-input>
          </el-form-item>
          <el-form-item label="主要传输协议：" prop="transport_protocol" required>
            <el-input v-model="netLLinkAForm.transport_protocol" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="主要开发接口：" prop="open_port" required>
            <el-input v-model="netLLinkAForm.open_port" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="接入运营商：" prop="operator" required>
            <el-input v-model="netLLinkAForm.operator" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="运营商联系方式：" prop="operator_contact" required>
            <el-input v-model="netLLinkAForm.operator_contact" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="接入物理位置：" prop="physical_access" required>
            <el-input v-model="netLLinkAForm.physical_access" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="接入带宽：" prop="access_bandwidth" required>
            <el-input v-model="netLLinkAForm.access_bandwidth" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="网络设备型号及处理能力描述：" prop="network_devices" required>
            <el-input v-model="netLLinkAForm.network_devices" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">安全责任部门和安全责任人落实情况</h4>
          </div>
          <el-form-item label="是否落实了单位网站安全责任部门？" label-width="280px" prop="is_implementation_dept" required>
            <el-radio-group v-model="netLLinkAForm.is_implementation_dept">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否落实了单位网站安全责任人？" label-width="280px" prop="is_implementation_charger" required>
            <el-radio-group v-model="netLLinkAForm.is_implementation_charger">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开展安全工作的经费是否纳入年度预算？" label-width="280px" prop="is_implementation_dudget" required>
            <el-radio-group v-model="netLLinkAForm.is_implementation_dudget">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有内容管理员，并签订保密协议？" label-width="280px" prop="is_implementation_agreement" required>
            <el-radio-group v-model="netLLinkAForm.is_implementation_agreement">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">定级备案执行情况</h4>
          </div>
          <el-form-item label="是否确定了安全保护等级？" label-width="280px" prop="is_execute_grading" required>
            <el-radio-group v-model="netLLinkAForm.is_execute_grading">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否按要求到公安机关进行了备案？" label-width="280px" prop="is_execute_record" required>
            <el-radio-group v-model="netLLinkAForm.is_execute_record">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否进行了外部渗透测试？" label-width="280px" prop="is_execute_test" required>
            <el-radio-group v-model="netLLinkAForm.is_execute_test">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否根据测评和渗透测试结果进行安全加固改造？" label-width="280px" prop="is_execute_reform" required>
            <el-radio-group v-model="netLLinkAForm.is_execute_reform">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">安全事件报告处置</h4>
          </div>
          <el-form-item label="是否制定安全事件（事故）报告制度？" label-width="280px" prop="is_handle_institution" required>
            <el-radio-group v-model="netLLinkAForm.is_handle_institution">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发生安全事件（事故）是否向属地公安机关报告？" label-width="280px" prop="is_handle_report" required>
            <el-radio-group v-model="netLLinkAForm.is_handle_report">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有完整安全事件处置记录？" label-width="280px" prop="is_handle_record" required>
            <el-radio-group v-model="netLLinkAForm.is_handle_record">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否按照要求保留完整日志？" label-width="280px" prop="is_handle_log" required>
            <el-radio-group v-model="netLLinkAForm.is_handle_log">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">应急预案的制定、演练和完善情况</h4>
          </div>
          <el-form-item label="是否有应急预案，并有相应的预案文档？" label-width="280px" prop="is_perfect_file" required>
            <el-radio-group v-model="netLLinkAForm.is_perfect_file">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有应急保障队伍并有人员联系方式？" label-width="280px" prop="is_perfect_contact" required>
            <el-radio-group v-model="netLLinkAForm.is_perfect_contact">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否定期应急演练并有应急演练的文档记录？" label-width="280px" prop="is_perfect_record" required>
            <el-radio-group v-model="netLLinkAForm.is_perfect_record">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否根据演练结果对应急预案进行完善？" label-width="280px" prop="is_perfect_reserve" required>
            <el-radio-group v-model="netLLinkAForm.is_perfect_reserve">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">机房安全管理制度执行情况</h4>
          </div>
          <el-form-item label="本单位机房进出人员管理是否按照制度执行，并有详细记录？" label-width="280px" prop="is_institution_detail" required>
            <el-radio-group v-model="netLLinkAForm.is_institution_detail">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="本单位机房日常监控是否制度执行并有监控记录？" label-width="280px" prop="is_institution_monitor" required>
            <el-radio-group v-model="netLLinkAForm.is_institution_monitor">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">网络边界安全防护设备情况</h4>
          </div>
          <el-form-item label="是否部署防火墙？" label-width="280px" prop="is_protect_firewall" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_firewall">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否对外屏蔽了不必要的服务/端口？" label-width="280px" prop="is_protect_port" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_port">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否部署入侵检测（防护）设备？" label-width="280px" prop="is_protect_invasion" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_invasion">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否部署防病毒网关？" label-width="280px" prop="is_protect_gateway" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_gateway">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否部署抗拒绝服务攻击设备？" label-width="280px" prop="is_protect_attack" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_attack">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否部署Web应用防火墙？" label-width="280px" prop="is_protect_web" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_web">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否部署设备？" label-width="280px" prop="is_protect_equipment" required>
            <el-radio-group v-model="netLLinkAForm.is_protect_equipment">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">漏洞扫描措施及修复升级情况</h4>
          </div>
          <el-form-item label="是否进行过漏洞扫描，并有详细记录？" label-width="280px" prop="is_up_record" required>
            <el-radio-group v-model="netLLinkAForm.is_up_record">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发现的漏洞是否及时修复？" label-width="280px" prop="is_up_repair" required>
            <el-radio-group v-model="netLLinkAForm.is_up_repair">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">管理终端安全防护措施</h4>
          </div>
          <el-form-item label="是否有控制措施（如地址绑定，网络接入控制等）？" label-width="280px" prop="is_measures" required>
            <el-radio-group v-model="netLLinkAForm.is_measures">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">主要设备可用性</h4>
          </div>
          <el-form-item label=" 是否双机热备？" label-width="150px" prop="is_usability_hot" required>
            <el-radio-group v-model="netLLinkAForm.is_usability_hot">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否采用冷备方式？" label-width="150px" prop="is_usability_cold" required>
            <el-radio-group v-model="netLLinkAForm.is_usability_cold">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="12">


            <el-form-item>
              <el-button type="primary" @click="onSubmit('0')">暂存</el-button>
              <el-button type="primary" @click="onSubmit('1')">保存</el-button>
              <el-button type="gray" @click="goBack">返回</el-button>
              <el-button type="primary" v-if="this.$route.params.id"  @click="exportView">导出</el-button>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
    </div>
</div>
</template>

<script>
import utils from 'components/js/common.js'
import selectOrganization from "components/selectOrganization/selectOrganization.vue"
import {
  mapState
} from 'vuex'
export default {
  components: {
    selectOrganization,
  },
  data() {
    let validateIp = (rule, value, callback) => {
      if(this.netLLinkAForm.ip_range1===''||this.netLLinkAForm.ip_range2===''){callback(new Error('请输入Ip'))}
      var flag;
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

           if (re.test(this.netLLinkAForm.ip_range1)&&re.test(this.netLLinkAForm.ip_range2)){
             flag = true
           }else{
             flag = false
           }

     if(flag){callback()}else{callback(new Error('格式错误，请重新输入'));}
    };

    let validateOtherName = (rule, value, callback) => {
      let req = rule.required;
    if (value==='其他') {
      if (this.netLLinkAForm['other_'+req]!=null&&this.netLLinkAForm['other_'+req]!='') {
        callback();
      } else {
        callback(new Error('请输入其他的名字'));
      }
    } else {
      callback();
    }

    };

    return {
      tableId: 'unitlisttable',
      dialog_unit: false,
      netLLinkAForm: {
      	id:null,
      	unit_name:"",
      	unit_addr:"",
      	operation_user_id:null,
      	safety_charger:"",
      	safety_charger_duty:"",
      	safety_charge_phone:"",
      	operation_safety_charger:"",
      	operation_safety_charger_duty:"",
      	operation_safety_charger_phone:"",
      	affiliation:"",
      	other_affiliation:"",
      	unit_type:"",
      	other_unit_type:"",
      	industry_category:"",
      	other_category:"",
      	evaluation:"",
      	grading:"",
      	safety_liability:"",
      	application_system_situation:"",
      	ip_range:"",
      	transport_protocol:"",
      	open_port:"",
      	operator:"",
      	operator_contact:"",
      	physical_access:"",
      	access_bandwidth:"",
      	network_devices:"",
      	is_implementation_dept:"",
      	is_implementation_charger:"",
      	is_implementation_dudget:"",
      	is_implementation_agreement:"",
      	is_execute_grading:"",
      	is_execute_record:"",
      	is_execute_test:"",
      	is_execute_reform:"",
      	is_handle_institution:"",
      	is_handle_report:"",
      	is_handle_record:"",
      	is_handle_log:"",
      	is_perfect_file:"",
      	is_perfect_contact:"",
      	is_perfect_record:"",
      	is_perfect_reserve:"",
      	is_institution_detail:"",
      	is_institution_monitor:"",
      	is_protect_firewall:"",
      	is_protect_port:"",
      	is_protect_invasion:"",
      	is_protect_gateway:"",
      	is_protect_attack:"",
      	is_protect_web:"",
      	is_protect_equipment:"",
      	is_up_record:"",
      	is_up_repair:"",
      	is_measures:"",
      	is_usability_hot:"",
      	is_usability_cold:"",
      	user_id:"",
      	status:"",
        bw_type:"",
        ip_range1:"",
    		ip_range2:"",
      },
      categoryCheckbox: [],
      rules: {
        unit_name: [{  required: true,  message: '请输入运维名称',  trigger: 'blur'   }],
        unit_addr: [{  required: true, message: '请输入单位地址',  trigger: 'blur'  }],
        operation_user_id: [{ type: 'number',  required: true,message: '请选择责任单位',  trigger: 'change'  }],
        safety_charger: [{  required: true,  message: '请输入姓名',  trigger: 'blur'   }],
        safety_charger_duty: [ { required: true, message: '请输入职务/职称', trigger: 'blur' }  ],
        safety_charge_phone: [ { required: true, message: '请输入联系电话', trigger: 'blur' }  ],
        operation_safety_charger: [ { required: true, message: '请输入姓名', trigger: 'blur' }  ],
        operation_safety_charger_duty: [ { required: true, message: '请输入职务/职称', trigger: 'blur' }  ],
        operation_safety_charger_phone: [ { required: true, message: '请输入联系电话', trigger: 'blur' }  ],

        affiliation: [ { required: true, message: '请选择隶属关系', trigger: 'change' } ,
                        { required: 'affiliation',validator: validateOtherName, trigger: 'change,blur' }],
        unit_type: [ { required: true, message: '请选择单位类型', trigger: 'change' } ,
                      { required: 'unit_type',validator: validateOtherName, trigger: 'change,blur' }],
        industry_category: [ { required: true, message: '请选择行业类别', trigger: 'change' },
                              { required: 'category',validator: validateOtherName, trigger: 'change,blur' }],
        grading: [ { required: true, message: '请选择等级保护定级', trigger: 'change' }  ],
        evaluation: [ { required: true, message: '请选择等级测评', trigger: 'change' }  ],
        safety_liability: [ { required: true, message: '请选择网络安全责任书', trigger: 'change' }  ],
        application_system_situation: [ { required: true, message: '请输入接入网络承载应用系统情况', trigger: 'blur' }  ],

        ip_range_check: [{required: true , validator: validateIp, trigger: 'blur' }],
        transport_protocol: [{  required: true,  message: '请输入主要传输协议',  trigger: 'blur'   }],
        open_port: [ { required: true, message: '请输入主要开发接口', trigger: 'blur' }  ],
        operator: [ { required: true, message: '请输入接入运营商', trigger: 'blur' }  ],
        operator_contact: [ { required: true, message: '请输入运营商联系方式', trigger: 'blur' }  ],
        physical_access: [ { required: true, message: '请输入接入物理位置', trigger: 'blur' }  ],
        access_bandwidth: [ { required: true, message: '请输入接入带宽', trigger: 'blur' }  ],
        network_devices: [ { required: true, message: '请输入网络设备型号及处理能力描述', trigger: 'blur' }  ],

        is_implementation_dept: [ { required: true, message: '请选择是否落实了单位网站安全责任部门', trigger: 'change' }  ],
        is_implementation_charger: [ { required: true, message: '请选择是否落实了单位网站安全责任人', trigger: 'change' }  ],
        is_implementation_dudget: [ { required: true, message: '请选择是否开展安全工作的经费是否纳入年度预算', trigger: 'change' }  ],
        is_implementation_agreement: [ { required: true, message: '请选择是否有内容管理员，并签订保密协议', trigger: 'change' }  ],
        is_execute_grading: [ { required: true, message: '请选择是否确定了安全保护等级', trigger: 'change' }  ],
        is_execute_record: [ { required: true, message: '请选择是否按要求到公安机关进行了备案', trigger: 'change' }  ],
        is_execute_test: [ { required: true, message: '请选择是否进行了外部渗透测试', trigger: 'change' }  ],
        is_execute_reform: [ { required: true, message: '请选择是否根据测评和渗透测试结果进行安全加固改造', trigger: 'change' }  ],
        is_handle_institution: [ { required: true, message: '请选择是否制定安全事件（事故）报告制度', trigger: 'change' }  ],
        is_handle_report: [ { required: true, message: '请选择发生安全事件（事故）是否向属地公安机关报告', trigger: 'change' }  ],
        is_handle_record: [ { required: true, message: '请选择是否有完整安全事件处置记录', trigger: 'change' }  ],
        is_handle_log: [ { required: true, message: '请选择是否按照要求保留完整日志', trigger: 'change' }  ],
        is_perfect_file: [ { required: true, message: '请选择是否有应急预案，并有相应的预案文档', trigger: 'change' }  ],
        is_perfect_contact: [ { required: true, message: '请选择是否有应急保障队伍并有人员联系方式', trigger: 'change' }  ],
        is_perfect_record: [ { required: true, message: '请选择是否定期应急演练并有应急演练的文档记录', trigger: 'change' }  ],
        is_perfect_reserve: [ { required: true, message: '请选择是否根据演练结果对应急预案进行完善', trigger: 'change' }  ],
        is_institution_detail: [ { required: true, message: '请选择本单位机房进出人员管理是否按照制度执行，并有详细记录', trigger: 'change' }  ],
        is_institution_monitor: [ { required: true, message: '请选择本单位机房日常监控是否制度执行并有监控记录', trigger: 'change' }  ],
        is_protect_firewall: [ { required: true, message: '请选择是否部署防火墙', trigger: 'change' }  ],
        is_protect_port: [ { required: true, message: '请选择是否对外屏蔽了不必要的服务/端口', trigger: 'change' }  ],
        is_protect_invasion: [ { required: true, message: '请选择是否部署入侵检测（防护）设备', trigger: 'change' }  ],
        is_protect_gateway: [ { required: true, message: '请选择是否部署防病毒网关', trigger: 'change' }  ],
        is_protect_attack: [ { required: true, message: '请选择是否部署抗拒绝服务攻击设备', trigger: 'change' }  ],
        is_protect_web: [ { required: true, message: '请选择是否部署Web应用防火墙', trigger: 'change' }  ],
        is_protect_equipment: [ { required: true, message: '请选择是否部署设备', trigger: 'change' }  ],
        is_up_record: [ { required: true, message: '请选择是否进行过漏洞扫描，并有详细记录', trigger: 'change' }  ],
        is_up_repair: [ { required: true, message: '请选择发现的漏洞是否及时修复', trigger: 'change' }  ],
        is_measures: [ { required: true, message: '请选择是否有控制措施（如地址绑定，网络接入控制等）', trigger: 'change' }  ],
        is_usability_hot: [ { required: true, message: '请选择是否双机热备', trigger: 'change' }  ],
        is_usability_cold: [ { required: true, message: '请选择是否采用冷备方式', trigger: 'change' }  ],


      }

    }

  },
  methods: {
    exportView() {
     var id = this.$route.params.id;
     var param = "reportType=wordForm&exportFileName=互联网接入网络链路基本情况调查表&id="+id;
     window.location.href = "/ssa/netLinkAccess/downloadNetLinkAccessWord.do?" + param;
   },
    checkForm(){
      var flag = false;
      this.$refs["netLLinkAForm"].validate((valid) => {
        if (valid) {
          flag =true;
        } else {
          flag=false;
        }
      });
      return flag;
    },
    async onSubmit(status) {
      if(this.checkForm()){
        this.netLLinkAForm.status =status;
        this.netLLinkAForm.ip_range=this.netLLinkAForm.ip_range1+";"+this.netLLinkAForm.ip_range2;
        var msg = await utils.req("/ssa/netLinkAccess/saveData.do", this.netLLinkAForm, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.goBack();
      }
    },
    goBack() {
      this.$router.go(-1);
    }

  },
  mounted: function() {
    this.utils.req("/ssa/netLinkAccess/getCategory.do", null, this).then(data => {
      this.categoryCheckbox = data;
    });
  },
  created: function() {
    //  修改赋值
    if (this.$route.params.handle == "update") {
      var id = this.$route.params.id;
      var params = {};
      params.id = id;
      this.utils.req("/ssa/netLinkAccess/getInfoFormByid.do", params, this).then(data => {
        this.netLLinkAForm = data;
        if (this.netLLinkAForm.ip_range != null && this.netLLinkAForm.ip_range != "") {
          this.netLLinkAForm.ip_range1=this.netLLinkAForm.ip_range.split(";")[0];
          this.netLLinkAForm.ip_range2=this.netLLinkAForm.ip_range.split(";")[1];
        }
    });
  }

    //新增赋值
    if (this.$route.query.handle == "add") {
      //this.netLLinkAForm.bw_type = this.$route.query.bw_type;
    }

  }
}
</script>

<style>

</style>
