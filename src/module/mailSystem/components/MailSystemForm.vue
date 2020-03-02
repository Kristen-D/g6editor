<template>
<div>

    <div class="whitebackground Whitespace">
      <div class="top-title" v-if="!this.$route.params.id">新增邮件系统</div>
      <div class="top-title" v-if="this.$route.params.id">编辑邮件系统</div>
      <el-form ref="mailSystemForm" :model="mailSystemForm" :rules="rules" label-width="130px">
        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">单位信息</h4>
          </div>
          <el-form-item label="单位名称：" prop="unit_id" required>
            <selectOrganization v-model="mailSystemForm.unit_id" class="set-input-width40" orgType="2" orgstring="请选择单位"  >
            </selectOrganization>
            <!-- <el-input v-model="mailSystemForm.unit_name" placeholder="" :disabled="true" class="set-input-width40"></el-input>
            <el-button type="text" @click="dialog_unit = true">选择</el-button>
            <el-dialog title="备案单位" :visible.sync="dialog_unit">

              <unitList :id="tableId" @dialogUnit="dialogUnit"></unitList>
            </el-dialog> -->
          </el-form-item>
          <el-form-item label="单位地址：" prop="unit_addr" required>
            <el-input v-model="mailSystemForm.unit_addr" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
        </div>

        <div class="el-sub-panel">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">网络安全负责人</h4>
          </div>
          <el-form-item label="姓名：" style="width:50%" prop="charger" required>
            <el-input v-model="mailSystemForm.charger" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="职务/职称：" style="width:50%" prop="charger_duty" required>
            <el-input v-model="mailSystemForm.charger_duty" placeholder="职务/职称"></el-input>
          </el-form-item>
          <el-form-item label="办公室电话：" style="width:50%" prop="charge_office_phone" required>
            <el-input v-model="mailSystemForm.charge_office_phone" placeholder="办公室电话"></el-input>
          </el-form-item>
          <el-form-item label="移动电话：" style="width:50%" prop="charge_person_phone" required>
            <el-input v-model="mailSystemForm.charge_person_phone" placeholder="移动电话"></el-input>
          </el-form-item>
        </div>

        <div class="el-sub-panel">
        <div class="el-sub-panel-heading">
          <h4 class="sub-title">网络安全联系人</h4>
        </div>
        <el-form-item label="姓名：" style="width:50%" prop="contacts" required>
          <el-input v-model="mailSystemForm.contacts" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="职务/职称：" style="width:50%" prop="contacts_duty" required>
          <el-input v-model="mailSystemForm.contacts_duty" placeholder="职务/职称"></el-input>
        </el-form-item>
        <el-form-item label="办公室电话：" style="width:50%" prop="contacts_office_phone" required>
          <el-input v-model="mailSystemForm.contacts_office_phone" placeholder="办公室电话"></el-input>
        </el-form-item>
        <el-form-item label="移动电话：" style="width:50%" prop="contacts_person_phone" required>
          <el-input v-model="mailSystemForm.contacts_person_phone" placeholder="移动电话"></el-input>
        </el-form-item>
      </div>

      <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">其他信息</h4>
      </div>
      <el-form-item label="隶属关系：" prop="affiliation" required>
        <el-radio-group v-model="mailSystemForm.affiliation" style="display:inline-block;">
          <el-radio label="中央" name="affiliation" style="width:60px;margin-left: 8px;"></el-radio>
          <el-radio label="省(自治区、直辖市)" name="affiliation" style="width:150px;margin-left: 8px;"></el-radio>
          <el-radio label="地区(区、市、州、盟)" name="affiliation" style="width:160px;margin-left: 5px;"></el-radio>
          <el-radio label="县(区、市、旗)" name="affiliation" style="width:150px;margin-left: 8px;"></el-radio>
          <el-radio label="其他" name="affiliation" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="mailSystemForm.affiliation=='其他'" size="mini" v-model="mailSystemForm.other_affiliation" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="单位类型：" prop="unit_type" required>
        <el-radio-group v-model="mailSystemForm.unit_type" style="display:inline-block; width:90%">
          <el-radio label="党委机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="政府机关" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="事业单位" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="企业" name="unit_type" style="width:18%;margin-left: 5px;"></el-radio>
          <el-radio label="其他" name="unit_type" style="width:8%;margin-left: 5px;"></el-radio>
          <el-input v-if="mailSystemForm.unit_type=='其他'" size="mini" v-model="mailSystemForm.other_unit_type" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="行业类别：" prop="industry_category" required>
        <el-radio-group v-model="mailSystemForm.industry_category" style="display:inline-block; width:90%">
          <el-radio v-for="item in categoryCheckbox" :label="item.value" style="width:22%;margin-left: 5px;">{{item.name}}
          </el-radio>
          <el-radio label="其他" name="industry_category" style="width:8%;margin-left: 5px;">其他</el-radio>
          <el-input v-if="mailSystemForm.industry_category=='其他'" size="mini" v-model="mailSystemForm.other_category" style="display:inline-block; width:10%"></el-input>
        </el-radio-group>
          <!-- <el-input v-bind:disabled="unitHandleForm.category_other" v-model="unitHandleForm.other_category" style="display:inline-block; width:20%"></el-input> -->
      </el-form-item>
      <el-form-item label="填表人：" prop="informant" required>
        <el-input v-model="mailSystemForm.informant" placeholder="" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="审核人：" prop="auditor" required>
        <el-input v-model="mailSystemForm.auditor" placeholder="" class="set-input-width40"></el-input>
      </el-form-item>
    </div>
    <div class="el-sub-panel">
    <el-form-item label="邮件系统类型：" prop="mail_type" required>
      <el-radio-group v-model="mailSystemForm.mail_type">
        <el-radio label="have">自有</el-radio>
        <el-radio label="rent">租用</el-radio>
      </el-radio-group>
    </el-form-item>
    </div>
        <div class="el-sub-panel" v-if="mailSystemForm.mail_type=='have'">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">自有邮件系统</h4>
          </div>
          <el-form-item label="邮件系统名称：" prop="mail_sys_name" required>
            <el-input v-model="mailSystemForm.mail_sys_name" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="邮件服务器域名：" prop="mail_sys_domain" required>
            <el-input v-model="mailSystemForm.mail_sys_domain" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="部署方式：" prop="deployment_mode" required>
            <el-radio-group v-model="mailSystemForm.deployment_mode">
              <el-radio label="1">自主研发邮件系统</el-radio>
              <el-radio label="0">购买邮件系统</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="品牌及版本：" prop="mail_sys_version" required>
            <el-input v-model="mailSystemForm.mail_sys_version" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="归属地域：" prop="mail_sys_region" required>
            <el-radio-group v-model="mailSystemForm.mail_sys_region">
              <el-radio label="1">国内</el-radio>
              <el-radio label="2">国外</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="服务器IP地址：" prop="mail_sys_ip" required>
            <el-input v-model="mailSystemForm.mail_sys_ip" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="用户数：" prop="user_num" required>
            <el-input v-model="mailSystemForm.user_num" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="等级保护定级：" prop="grading" required>
            <el-radio-group v-model="mailSystemForm.grading">
              <el-radio label="2">二级</el-radio>
              <el-radio label="3">三级</el-radio>
              <el-radio label="4">四级</el-radio>
              <el-radio label="0">未定级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="等级保护备案：" prop="recorde" required>
            <el-radio-group v-model="mailSystemForm.recorde">
              <el-radio label="1">已备案</el-radio>
              <el-radio label="0">未备案</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备案公安机关名称：" v-if="mailSystemForm.recorde=='1'" prop="record_public_unit" required>
            <el-input v-model="mailSystemForm.record_public_unit" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="备案证明编号："  v-if="mailSystemForm.recorde=='1'" prop="record_approval_code" required>
            <el-input v-model="mailSystemForm.record_approval_code" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="等级测评：" prop="evaluation" required>
            <el-radio-group v-model="mailSystemForm.evaluation">
              <el-radio label="1">已展开</el-radio>
              <el-radio label="0">未展开</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="测评机构名称：" v-if="mailSystemForm.evaluation=='1'" prop="evaluation_organ" required>
            <el-input v-model="mailSystemForm.evaluation_organ" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="评测时间：" v-if="mailSystemForm.evaluation=='1'" prop="evaluation_time" required>
            <el-date-picker v-model="mailSystemForm.evaluation_time" type="date" placeholder="选择评测时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="邮件网关："  prop="mail_gateway" required>
            <el-checkbox-group v-model="configData.mail_gateway" style="display:block">
                <el-checkbox label="1">垃圾邮件拦截</el-checkbox>
                <el-checkbox label="2">病毒附件拦截</el-checkbox>
                <el-checkbox label="3">防钓鱼预警机制</el-checkbox>
                <el-checkbox label="4">DDOS攻击</el-checkbox>
                <el-checkbox label="5" @change="otherChange('mail_gateway_other')">其他</el-checkbox>
                <el-input v-if="configData.mail_gateway_other==false" v-model="mailSystemForm.mail_gateway_other" size="mini" style="display:inline-block; width:80px"></el-input>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="账号防护：" prop="account_protection" required>
            <el-checkbox-group v-model="configData.account_protection" style="display:block">
                <el-checkbox label="1">动态验证码</el-checkbox>
                <el-checkbox label="2">多因素安全认证</el-checkbox>
                <el-checkbox label="3">密码安全控制</el-checkbox>
                <el-checkbox label="4">异地登录提醒</el-checkbox>
                <el-checkbox label="5" @change="otherChange('account_protection_other')">其他</el-checkbox>
                <el-input v-if="configData.account_protection_other==false" v-model="mailSystemForm.account_protection_other" size="mini" style="display:inline-block; width:80px"></el-input>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="加密保护：" prop="encryption_protection" required>
            <el-checkbox-group v-model="configData.encryption_protection" style="display:block">
                <el-checkbox label="1">邮件内容加密传输</el-checkbox>
                <el-checkbox label="2">邮件内容加密存储</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="监控审核：" prop="monitor_auditing" required>
            <el-checkbox-group v-model="configData.monitor_auditing" style="display:block">
                <el-checkbox label="1">邮件头分析</el-checkbox>
                <el-checkbox label="2">关键字过滤</el-checkbox>
                <el-checkbox label="3">恶意IP、实时报警</el-checkbox>
                <el-checkbox label="4">附件</el-checkbox>
                <el-checkbox label="5" @change="otherChange('monitor_auditing_other')">其他</el-checkbox>
                <el-input v-if="configData.monitor_auditing_other==false" v-model="mailSystemForm.monitor_auditing_other" size="mini" style="display:inline-block; width:80px"></el-input>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="邮件安全协议：" prop="mail_protocol" required>
            <el-checkbox-group v-model="configData.mail_protocol" style="display:block">
                <el-checkbox label="SPF">SPF</el-checkbox>
                <el-checkbox label="DKIM">DKIM</el-checkbox>
                <el-checkbox label="rDNS">rDNS</el-checkbox>
                <el-checkbox label="DMARC">DMARC</el-checkbox>
                <el-checkbox label="other" @change="otherChange('mail_protocol_other')">其他</el-checkbox>
                <el-input v-if="configData.mail_protocol_other==false" v-model="mailSystemForm.mail_protocol_other" size="mini" style="display:inline-block; width:80px"></el-input>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他安全措施：" >
            <el-input v-model="mailSystemForm.other_measures" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
        </div>


        <div class="el-sub-panel" v-if="mailSystemForm.mail_type=='rent'">
          <div class="el-sub-panel-heading">
            <h4 class="sub-title">租用邮件系统</h4>
          </div>
          <el-form-item label="邮件系统名称：" prop="mail_sys_name" required>
            <el-input v-model="mailSystemForm.mail_sys_name" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="邮件服务器域名：" prop="mail_sys_domain" required>
            <el-input v-model="mailSystemForm.mail_sys_domain" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="提供邮件系统单位名称：" prop="provider_unit" required>
            <el-input v-model="mailSystemForm.provider_unit" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="提供邮件系统单位地址：" prop="provider_addr" required>
            <el-input v-model="mailSystemForm.provider_addr" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="提供邮件系统单位负责人：" prop="provider_charger_check" required>
            <el-input v-model="mailSystemForm.provider_charger" placeholder="姓名" class="set-input-width40" style="display:inline-block; width:30%"></el-input>
            <el-input v-model="mailSystemForm.provider_charger_phone" placeholder="联系电话" class="set-input-width40" style="display:inline-block; width:30%"></el-input>
          </el-form-item>
          <el-form-item label="提供邮件系统单位联系人：" prop="provider_contacts_check" required>
            <el-input v-model="mailSystemForm.provider_contacts" placeholder="姓名" class="set-input-width40" style="display:inline-block; width:30%"></el-input>
            <el-input v-model="mailSystemForm.provider_contacts_phone" placeholder="联系电话" class="set-input-width40" style="display:inline-block; width:30%"></el-input>
          </el-form-item>
          <el-form-item label="服务器IP地址：" prop="mail_sys_ip" required>
            <el-input v-model="mailSystemForm.mail_sys_ip" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="用户数：" prop="user_num" required>
            <el-input v-model="mailSystemForm.user_num" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="租用时限：" prop="lease" required>
            <el-input v-model="mailSystemForm.lease_time" placeholder="" size="mini" style="display:inline-block; width:50px">></el-input>年
            <el-date-picker v-model="mailSystemForm.lease_time_start" type="date" placeholder="开始期限"></el-date-picker>
            <el-date-picker v-model="mailSystemForm.lease_time_end" type="date" placeholder="结束期限"></el-date-picker>
          </el-form-item>
          <el-form-item label="提供方邮件系统等级保护定级：" prop="grading" required>
            <el-radio-group v-model="mailSystemForm.grading">
              <el-radio label="2">二级</el-radio>
              <el-radio label="3">三级</el-radio>
              <el-radio label="4">四级</el-radio>
              <el-radio label="0">未定级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提供方邮件系统等级保护备案：" prop="recorde" required>
            <el-radio-group v-model="mailSystemForm.recorde">
              <el-radio label="1">已备案</el-radio>
              <el-radio label="0">未备案</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备案公安机关名称：" v-if="mailSystemForm.recorde=='1'" prop="record_public_unit" required>
            <el-input v-model="mailSystemForm.record_public_unit" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="备案证明编号：" v-if="mailSystemForm.recorde=='1'" prop="record_approval_code" required>
            <el-input v-model="mailSystemForm.record_approval_code" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="提供方邮件系统等级测评：" prop="evaluation" required>
            <el-radio-group v-model="mailSystemForm.evaluation">
              <el-radio label="1">已展开</el-radio>
              <el-radio label="0">未展开</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="测评机构名称：" v-if="mailSystemForm.evaluation=='1'" prop="evaluation_organ" required>
            <el-input v-model="mailSystemForm.evaluation_organ" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="评测时间：" v-if="mailSystemForm.evaluation=='1'"  prop="evaluation_time" required>
            <el-date-picker v-model="mailSystemForm.evaluation_time" type="datetime" placeholder="选择评测时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="提供方邮件系统等级测评结果：" prop="evaluation_results" required>
            <el-radio-group v-model="mailSystemForm.evaluation_results">
              <el-radio label="2">符合</el-radio>
              <el-radio label="1">基本符合</el-radio>
              <el-radio label="0">不符合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮件系统安全责任落实情况：" prop="safety_responsibility" required>
            <el-input v-model="mailSystemForm.safety_responsibility" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="邮件系统运维责任落实情况：" prop="operation_responsibility" required>
            <el-input v-model="mailSystemForm.operation_responsibility" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
          <el-form-item label="其他需求说明的情况：" prop="other_instructions" required>
            <el-input v-model="mailSystemForm.other_instructions" placeholder="" class="set-input-width40"></el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="12">


            <el-form-item>
              <el-button type="primary" @click="onSubmit('0')">暂存</el-button>
              <el-button type="primary" @click="onSubmit('1')">保存</el-button>
              <el-button type="gray" @click="goBack">返回</el-button>
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

      if(value===null||value===''){
       callback();
      }
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
          if (re.test(value)){
           callback();
         }else{
           callback(new Error('格式错误，请重新输入'));
         }

    };
    let validateOther = (rule, value, callback) => {
      let req = rule.required;
      if (this.configData[req]) {
        if (this.configData[req].length>0) {
              if (this.configData[req].indexOf("5")!=-1||this.configData[req].indexOf("other")!=-1) {
                if (this.mailSystemForm[req+'_other']!=null&&this.mailSystemForm[req+'_other']!='') {
                  callback();
                } else {
                  callback(new Error('请输入其他的名称'))
                }
              } else {
                callback();
              }

        } else {
          callback(new Error('请选择名称'))
        }
      } else {
        callback()
      }
    };
    let validateCharger = (rule, value, callback) => {
      if (this.mailSystemForm.provider_charger===null||this.mailSystemForm.provider_charger==='') {
        callback(new Error('请输入姓名'))
      } else {
        if (this.mailSystemForm.provider_charger_phone===null||this.mailSystemForm.provider_charger_phone==='') {
          callback(new Error('请输入联系电话'))
        } else {
          callback()
        }
      }
    };
    let validateContacts = (rule, value, callback) => {
      if (this.mailSystemForm.provider_contacts===null||this.mailSystemForm.provider_contacts==='') {
        callback(new Error('请输入姓名'));
      } else {
        if (this.mailSystemForm.provider_contacts_phone===null||this.mailSystemForm.provider_contacts_phone==='') {
          callback(new Error('请输入联系电话'));
        } else {
          callback();
        }
      }
    };
    let validateLease = (rule, value, callback) => {
      if (this.mailSystemForm.lease_time===null||this.mailSystemForm.lease_time==='') {
        callback(new Error('请输入时限'));
      } else {
        if (this.mailSystemForm.lease_time_start===null||this.mailSystemForm.lease_time_start===undefined) {
          callback(new Error('请选择开始租期'));
        } else {
                if (this.mailSystemForm.lease_time_end===null||this.mailSystemForm.lease_time_end===undefined) {
                  callback(new Error('请选择结束租期'));
                } else {
                  callback();
                }
        }
      }
    };
    let validateOtherName = (rule, value, callback) => {
      let req = rule.required;
    if (value==='其他') {
      if (this.mailSystemForm['other_'+req]!=null&&this.mailSystemForm['other_'+req]!='') {
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
      mailSystemForm: {
      id:null,
      unit_id:null,
      unit_name:"",
      unit_addr:"",
      affiliation:"",
      other_affiliation:"",
      other_category:"",
      unit_type:"",
      other_unit_type:"",
      industry_category:"",
      charger:"",
      charger_duty:"",
      charge_office_phone:"",
      charge_person_phone:"",
  		contacts:"", contacts_duty:"",
      contacts_office_phone:"",
      contacts_person_phone:"",
  		other_coverage_access:"",
      mail_type:"",
      mail_sys_name:"",
      mail_sys_domain:"",
  		deployment_mode:"",
      mail_sys_version:"",
      mail_sys_region:"",
      mail_sys_ip:"",
  		user_num:null, grading:"",recorde:"", record_public_unit:"",
  		record_approval_code:"",
  		evaluation:"",evaluation_organ:"", evaluation_time:null,
  		mail_gateway:"",
  		mail_gateway_other:"", account_protection:"", account_protection_other:"",
  		encryption_protection:"", monitor_auditing:"",
  		monitor_auditing_other:"",mail_protocol:"",
  		mail_protocol_other:"",
  		other_measures:"", provider_unit:"", provider_addr:"", provider_charger:"",
  		provider_charger_phone:"", provider_contacts:"", provider_contacts_phone:"",
  		lease_time:"",lease_time_start:null, lease_time_end:null, evaluation_results:"",
  		safety_responsibility:"",operation_responsibility:"",other_instructions:"",
		  informant:"", auditor:"", status:null,
      bw_type:"",
      },
      categoryCheckbox: [],
      configData:{
        mail_gateway: [],
    		mail_gateway_other:true,
        account_protection: [],
        account_protection_other:true,
    		encryption_protection: [],
        monitor_auditing: [],
    		monitor_auditing_other:true,
        mail_protocol: [],
    		mail_protocol_other:true,
      },
      rules: {
        unit_id: [{ type: 'number',  required: true,  message: '请选择单位',  trigger: 'change'   }],
        unit_addr: [{  required: true,  message: '请输入单位地址',  trigger: 'blur'   }],
        charger: [ { required: true, message: '请输入姓名', trigger: 'blur' }  ],
        charger_duty: [ { required: true, message: '请输入职务/职称', trigger: 'blur' }  ],
        charge_office_phone: [ { required: true, message: '请输入办公室电话', trigger: 'blur' }  ],
        charge_person_phone: [ { required: true, message: '请输入移动电话', trigger: 'blur' }  ],
        contacts: [ { required: true, message: '请输入姓名', trigger: 'blur' }  ],
        contacts_duty: [ { required: true, message: '请输入职务/职称', trigger: 'blur' }  ],
        contacts_office_phone: [ { required: true, message: '请输入办公室电话', trigger: 'blur' }  ],
        contacts_person_phone: [ { required: true, message: '请输入移动电话', trigger: 'blur' }  ],

        affiliation: [ { required: true, message: '请选择隶属关系', trigger: 'change' },
                        { required: 'affiliation',validator: validateOtherName, trigger: 'change,blur' }],
        unit_type: [ { required: true, message: '请选择单位类型', trigger: 'change' },
                      { required: 'unit_type',validator: validateOtherName, trigger: 'change,blur' }],
        industry_category: [ { required: true, message: '请选择行业类别', trigger: 'change' },
                            { required: 'category',validator: validateOtherName, trigger: 'change,blur' }],

        informant: [{  required: true,  message: '请输入填表人',  trigger: 'blur'   }],
        auditor: [ { required: true, message: '请输入审核人', trigger: 'blur' }  ],
        mail_type: [ { required: true, message: '请选择邮件系统类型', trigger: 'change' }  ],
        mail_sys_name: [ { required: true, message: '请输入邮件系统名称', trigger: 'blur' }  ],
        mail_sys_domain: [ { required: true, message: '请输入邮件服务器域名', trigger: 'blur' }  ],
        deployment_mode: [ { required: true, message: '请选择部署方式', trigger: 'change' }  ],
        mail_sys_version: [ { required: true, message: '请输入品牌及版本', trigger: 'blur' }  ],
        mail_sys_region: [ { required: true, message: '请选择归属地域', trigger: 'change' }  ],
        mail_sys_ip: [{  required: true,  message: '请输入服务器IP地址',  trigger: 'blur'   },
                      { validator: validateIp, trigger: 'blur' }],
        user_num: [ { required: true, message: '请输入用户数', trigger: 'blur' }  ],
        grading: [ { required: true, message: '请选择等级保护定级', trigger: 'change' }  ],
        recorde: [ { required: true, message: '请选择等级保护备案', trigger: 'change' }  ],
        record_public_unit: [{  required: true,  message: '请输入备案公安机关名称',  trigger: 'blur'   }],
        record_approval_code: [ { required: true, message: '请输入备案证明编号', trigger: 'blur' }  ],
        evaluation: [ { required: true, message: '请选择等级测评', trigger: 'change' }  ],
        evaluation_organ: [{  required: true,  message: '请输入测评机构名称',  trigger: 'blur'   }],
        evaluation_time: [ {type: 'date',  required: true, message: '请选择评测时间', trigger: 'blur' }  ],

        mail_gateway: [  {type: 'array', required: 'mail_gateway',   validator:validateOther,trigger: 'change' }],
        account_protection: [ {type: 'array', required: 'account_protection', validator:validateOther, trigger: 'change' }  ],
        encryption_protection: [ {type: 'array', required: 'encryption_protection',validator:validateOther , trigger: 'change' }  ],
        monitor_auditing: [ {type: 'array', required: 'monitor_auditing', validator:validateOther, trigger: 'change' }  ],
        mail_protocol: [ {type: 'array', required: 'mail_protocol', validator:validateOther, trigger: 'change' }  ],

        provider_unit: [ { required: true, message: '请输入提供邮件系统单位名称', trigger: 'blur' }  ],
        provider_addr: [ { required: true, message: '请输入提供邮件系统单位地址', trigger: 'blur' }  ],
        provider_charger_check:[{required: true, validator: validateCharger, trigger: 'blur' }],
        provider_contacts_check:[{required: true, validator: validateContacts, trigger: 'blur' }],
        lease:[{required: true, validator: validateLease, trigger: 'blur,change' }],


        evaluation_results: [ { required: true, message: '请选择测评结果', trigger: 'change' }  ],
        safety_responsibility: [ { required: true, message: '请输入邮件系统安全责任落实情况', trigger: 'blur' }  ],
        operation_responsibility: [ { required: true, message: '请输入邮件系统运维责任落实情况', trigger: 'blur' }  ],
        other_instructions: [ { required: true, message: '请输入其他说明的情况', trigger: 'blur' }  ],

      }

    }

  },
  methods: {
    checkForm(){
      var flag = false;
      this.$refs["mailSystemForm"].validate((valid) => {
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
        if (this.mailSystemForm.evaluation_time != null && this.mailSystemForm.evaluation_time != undefined) {
          this.mailSystemForm.evaluation_time = this.utils.formatDate(new Date(this.mailSystemForm.evaluation_time), "yyyy-MM-dd")
        }
        if (this.mailSystemForm.lease_time_start != null && this.mailSystemForm.lease_time_start != undefined) {
          this.mailSystemForm.lease_time_start = this.utils.formatDate(new Date(this.mailSystemForm.lease_time_start), "yyyy-MM-dd")
        }
        if(this.mailSystemForm.lease_time_end != null && this.mailSystemForm.lease_time_end != undefined) {
          this.mailSystemForm.lease_time_end = this.utils.formatDate(new Date(this.mailSystemForm.lease_time_end), "yyyy-MM-dd")
        }
        this.mailSystemForm.status =status;
        this.mailSystemForm.mail_gateway = this.configData.mail_gateway.join(";");
        this.mailSystemForm.account_protection = this.configData.account_protection.join(";");
        this.mailSystemForm.encryption_protection = this.configData.encryption_protection.join(";");
        this.mailSystemForm.monitor_auditing = this.configData.monitor_auditing.join(";");
        this.mailSystemForm.mail_protocol = this.configData.mail_protocol.join(";");
        var msg = await utils.req("/ssa/mailSystem/saveData.do", this.mailSystemForm, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.goBack();
      }
    },
    otherChange(value){
        if(this.configData[value]){
            this.configData[value]=false;
        }else{
            this.configData[value]=true;
        }
    },
    dialogUnit(row) {
      this.dialog_unit = false;
      this.mailSystemForm.unit_id = row.unit_id;
      this.mailSystemForm.unit_name = row.unit_name;
      this.mailSystemForm.unit_addr = row.unit_addr;
      this.mailSystemForm.unit_type = row.unit_type;
      this.mailSystemForm.affiliation = row.affiliation;
      this.mailSystemForm.other_affiliation= row.other_affiliation;
      this.mailSystemForm.industry_category= row.industry_category;
      this.mailSystemForm.other_category = row.other_categoryother_category;
    },
    goBack() {
      this.$router.go(-1);
    }

  },
  mounted: function() {
    this.utils.req("/ssa/mailSystem/getCategory.do", null, this).then(data => {
      this.categoryCheckbox = data;
    });
  },
  created: function() {
    //  修改赋值
    if (this.$route.params.handle == "update") {
      var id = this.$route.params.id;
      var params = {};
      params.id = id;
      this.utils.req("/ssa/mailSystem/getMailForm.do", params, this).then(data => {
        this.mailSystemForm = data;
        if (data.evaluation_time != null && data.evaluation_time != "") {
          this.mailSystemForm.evaluation_time = new Date(data.evaluation_time);
        }
        if (data.lease_time_start != null && data.lease_time_start != "") {
          this.mailSystemForm.lease_time_start = new Date(data.lease_time_start);
        }
        if (data.lease_time_end != null && data.lease_time_end != "") {
          this.mailSystemForm.lease_time_end = new Date(data.lease_time_end);
        }
        if (this.mailSystemForm.mail_gateway != null && this.mailSystemForm.mail_gateway != "") {
          this.configData.mail_gateway = this.mailSystemForm.mail_gateway.split(";");
          if(this.mailSystemForm.mail_gateway.indexOf("5")!=-1){
            this.otherChange('mail_gateway_other');
          }
        }
        if (this.mailSystemForm.account_protection != null && this.mailSystemForm.account_protection != "") {
          this.configData.account_protection = this.mailSystemForm.account_protection.split(";");
          if(this.mailSystemForm.account_protection.indexOf("5")!=-1){
            this.otherChange('account_protection_other');
          }
        }
        if (this.mailSystemForm.encryption_protection != null && this.mailSystemForm.encryption_protection != "") {
          this.configData.encryption_protection = this.mailSystemForm.encryption_protection.split(";");
        }
        if (this.mailSystemForm.monitor_auditing != null && this.mailSystemForm.monitor_auditing != "") {
          this.configData.monitor_auditing = this.mailSystemForm.monitor_auditing.split(";");
          if(this.mailSystemForm.monitor_auditing.indexOf("5")!=-1){
            this.otherChange('monitor_auditing_other');
          }
        }
        if (this.mailSystemForm.mail_protocol != null && this.mailSystemForm.mail_protocol != "") {
          this.configData.mail_protocol = this.mailSystemForm.mail_protocol.split(";");
          if(this.mailSystemForm.mail_protocol.indexOf("other")!=-1){
            this.otherChange('mail_protocol_other');
          }
        }
    });
  }

    //新增赋值
    if (this.$route.query.handle == "add") {
      //this.mailSystemForm.bw_type = this.$route.query.bw_type;
    }

  }
}
</script>

<style>

</style>
