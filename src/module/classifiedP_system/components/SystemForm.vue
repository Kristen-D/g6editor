<template>
<div class="whitebackground Whitespace alter-el-form" v-if="this.$route.params.handle !='view'">
  <div v-if="this.$route.params.handle =='update' || this.$route.params.handle =='change' || this.$route.params.handle =='add'" class="top-title">新建备案系统</div>
  <el-form v-if="this.$route.params.handle =='update' || this.$route.params.handle =='change' || this.$route.params.handle =='add' || this.$route.params.tkey =='System_Rectification'" ref="systemForm" :model="systemForm" :rules="rules" label-width="180px">
    <div class="el-sub-panel">

      <div class="el-sub-panel-heading">
        <h4 class="sub-title">备案单位信息</h4>
      </div>
      <el-form-item label="单位名称：" prop="unit_name">
        <el-input v-model="systemForm.unit_name" placeholder="单位名称" :disabled="true" class="set-input-width40"></el-input>
        <el-button type="text" @click="dialog_unit = true">选择</el-button>
        <el-dialog title="备案单位" :visible.sync="dialog_unit">

          <unitList :id="tableId" @dialogUnit="dialogUnit"></unitList>
        </el-dialog>
      </el-form-item>
      <el-form-item label="备案表编号：" required>
        <el-input v-model="systemForm.record_code" placeholder="备案表编号" :disabled="true" class="set-input-width40"></el-input>
      </el-form-item>
    </div>

    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">信息系统情况</h4>
      </div>
      <el-form-item label="是否已发备案证明：" required>
        <el-radio-group v-model="systemForm.filing">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统是否预备案：" required>
        <el-radio-group v-model="systemForm.pre_filing">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统是否国家级系统：" required>
        <el-radio-group v-model="systemForm.national_sys">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备案证明编号：" prop="record_approval_code">
        <el-input v-model="systemForm.record_approval_code" placeholder="备案证明编号" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="系统编号：" prop="sys_number">
        <el-input v-model="systemForm.sys_number" placeholder="系统编号" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="系统名称：" prop="sys_name">
        <el-input v-model="systemForm.sys_name" placeholder="系统名称" class="set-input-width40"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="系统简称：" prop="sys_abbr">
        <el-input v-model="systemForm.sys_abbr" placeholder="系统简称" class="set-input-width40"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="业务类型：" prop="biz_type">
        <el-radio-group v-model="systemForm.biz_type" @change="getClean('ohter_biz_type')">
          <el-radio label="生产作业" name="biz_type"></el-radio>
          <el-radio label="指挥调度" name="biz_type"></el-radio>
          <el-radio label="管理控制" name="biz_type"></el-radio>
          <el-radio label="内部办公" name="biz_type"></el-radio>
          <el-radio label="公众服务" name="biz_type"></el-radio>
          <el-radio label="其他" name="biz_type"></el-radio>
          <el-input v-if="systemForm.biz_type=='其他'" v-model="systemForm.other_biz_type" size="mini" style="width:10%"></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="业务描述：" prop="biz_desc">
        <el-input type="textarea" :rows="3" v-model="systemForm.biz_desc" placeholder="请输入内容" class="set-input-width75"></el-input>
      </el-form-item>
      <el-form-item label="服务范围：" prop="service_area">
        <el-radio-group v-model="systemForm.service_area" @change="getClean('other_service_area')">
          <div style="padding-bottom:20px">
            <el-radio label="10" name="service_area" style="width:150px">全国</el-radio>
            <el-radio label="11" name="service_area" style="width:150px">跨省(区，市)
              <el-input v-if="systemForm.service_area=='11'" v-model="systemForm.other_service_area" size="mini" style="width:25%" placeholder="个"></el-input>
            </el-radio>
            <el-radio label="20" name="service_area" style="width:150px">全省（区，市）</el-radio>
          </div>
          <div>
            <el-radio label="21" name="service_area" style="width:150px">跨地(区，市)
              <el-input v-if="systemForm.service_area=='21'" v-model="systemForm.other_service_area" size="mini" style="width:25%" placeholder="个"></el-input>
            </el-radio>
            <el-radio label="30" name="service_area" style="width:150px">地（区，市）内</el-radio>
            <el-radio label="99" name="service_area">其他</el-radio>
            <el-input v-if="systemForm.service_area=='99'" v-model="systemForm.other_service_area" size="mini" style="width:100px"></el-input>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务对象：" prop="service_object">
        <el-radio-group v-model="systemForm.service_object" @change="getClean('other_service_object')">
          <el-radio label="单位内部人员" name="service_object"></el-radio>
          <el-radio label="社会公众人员" name="service_object"></el-radio>
          <el-radio label="两者均包括" name="service_object"></el-radio>
          <el-radio label="其他" name="service_object"></el-radio>
          <el-input v-if="systemForm.service_object=='其他'" v-model="systemForm.other_service_object" size="mini" style="display:inline-block; width:15%"></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="覆盖范围：" prop="coverage_access">
        <el-radio-group v-model="systemForm.coverage_access" style="display:inline-block; width:80%" @change="getClean('other_coverage_access')">
          <el-radio label="局域网" name="coverage_access"></el-radio>
          <el-radio label="城域网" name="coverage_access"></el-radio>
          <el-radio label="广域网" name="coverage_access"></el-radio>
          <el-radio label="其他" name="coverage_access"></el-radio>
          <el-input v-if="systemForm.coverage_access=='其他'" v-model="systemForm.other_coverage_access" size="mini" style="display:inline-block; width:15%"></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网络性质：" prop="network_nature">
        <el-radio-group v-model="systemForm.network_nature" style="display:inline-block; width:80%" @change="getClean('other_network_nature')">
          <el-radio label="业务专网" name="network_nature"></el-radio>
          <el-radio label="互联网" name="network_nature"></el-radio>
          <el-radio label="其他" name="network_nature"></el-radio>
          <el-input v-if="systemForm.network_nature=='其他'" v-model="systemForm.other_network_nature" size="mini" style="display:inline-block; width:15%"></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统互联情况：" prop="sys_situation">
        <el-radio-group v-model="systemForm.sys_situation">
          <el-radio label="与其他行业系统连接" name="sys_situation"></el-radio>
          <el-radio label="与本行业其他单位系统连接" name="sys_situation"></el-radio>
          <el-radio label="与本单位其他系统连接" name="sys_situation"></el-radio>
          <el-radio label="其他" name="sys_situation"></el-radio>
          <el-input v-if="systemForm.sys_situation=='其他'" v-model="systemForm.other_sys_situation" size="mini" style="display:inline-block; width:80px"></el-input>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="关键产品使用情况：">
        <table>
          <el-form-item>
            <tr>
              <td width="120px" align="center">产品类型</td>
              <td width="120px" align="center">数量</td>
              <td width="300px" align="center">使用国产频率</td>
            </tr>
          </el-form-item>
          <tr>
            <el-form-item style="float:left;width:120px;">
              <el-checkbox v-model="systemForm.special_prod_info" @change="otherChange('special_prod')">安全专用产品</el-checkbox>
            </el-form-item>
            <el-form-item prop="special_prod_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!systemForm.special_prod_info" v-model="systemForm.special_prod_amount" size="mini" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item prop="other_special_prod_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!systemForm.special_prod_info" v-model="systemForm.special_prod_usage" style="width:100%" @change="radioChange('special_prod_usage','special_ohter')">
                <el-radio :label="100" name="special_prod_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="special_prod_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="special_prod_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.special_prod_usage=='99'" v-model.number="systemForm.other_special_prod_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>

          <tr>
            <el-form-item style="float:left;width:120px;">
              <el-checkbox v-model="systemForm.network_prod_info" @change="otherChange('network_prod')">网络产品</el-checkbox>
            </el-form-item>
            <el-form-item prop="network_prod_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!systemForm.network_prod_info" v-model="systemForm.network_prod_amount" size="mini" placeholder="数量" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item prop="other_network_prod_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!systemForm.network_prod_info" v-model="systemForm.network_prod_usage" style="width:100%" @change="radioChange('network_prod_usage','network_ohter')">
                <el-radio :label="100" name="network_prod_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="network_prod_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="network_prod_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.network_prod_usage=='99'" v-model="systemForm.other_network_prod_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>



          <tr>
            <el-form-item style="float:left;width:120px;">
              <el-checkbox v-model="systemForm.os_info" @change="otherChange('os')">操作系统</el-checkbox>
            </el-form-item>
            <el-form-item prop="os_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!systemForm.os_info" v-model="systemForm.os_amount" size="mini" placeholder="数量" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item prop="other_os_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!systemForm.os_info" v-model="systemForm.os_usage" style="width:100%" @change="radioChange('os_usage','os_ohter')">
                <el-radio :label="100" name="os_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="os_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="os_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.os_usage=='99'" v-model="systemForm.other_os_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>

          <tr>
            <el-form-item style="float:left;width:120px;">
              <el-checkbox v-model="systemForm.db_info" @change="otherChange('db')">数据库</el-checkbox>
            </el-form-item>
            <el-form-item prop="db_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!systemForm.db_info" v-model="systemForm.db_amount" size="mini" placeholder="数量" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item prop="other_db_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!systemForm.db_info" v-model="systemForm.db_usage" style="width:100%" @change="radioChange('db_usage','db_ohter')">
                <el-radio :label="100" name="db_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="db_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="db_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.db_usage=='99'" v-model="systemForm.other_db_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>

          <tr>
            <el-form-item style="float:left;width:120px;">
              <el-checkbox v-model="systemForm.server_info" @change="otherChange('server')">服务器</el-checkbox>
            </el-form-item>
            <el-form-item prop="server_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!systemForm.server_info" v-model="systemForm.server_amount" size="mini" placeholder="数量" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item prop="other_server_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!systemForm.server_info" v-model="systemForm.server_usage" style="width:100%" @change="radioChange('server_usage','server_ohter')">
                <el-radio :label="100" name="server_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="server_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="server_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.server_usage=='99'" v-model="systemForm.other_server_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>

          <tr>
            <el-form-item style="float:left;width:120px;" prop="third_soft_info">
              <el-checkbox v-model="configData.third_soft_info" @change="otherChange('third_soft')">
                <el-input v-bind:disabled="!configData.third_soft_info" v-model="systemForm.third_soft_info" size="small" placeholder="其他" style="width:80px"></el-input>
              </el-checkbox>
              </td>
            </el-form-item>
            <el-form-item prop="third_soft_amount" class="cruxproduse" style="width:120px;">
              <el-input v-bind:disabled="!configData.third_soft_info" v-model="systemForm.third_soft_amount" size="mini" placeholder="数量" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item prop="other_third_soft_usage" class="cruxproduse" style="width:430px;">
              <el-radio-group v-bind:disabled="!configData.third_soft_info" v-model="systemForm.third_soft_usage" style="width:100%" @change="radioChange('third_soft_usage','third_soft_ohter')">
                <el-radio :label="100" name="third_soft_usage" style="width:23%;margin-left: 5px;">全部使用</el-radio>
                <el-radio :label="0" name="third_soft_usage" style="width:23%;margin-left: 5px;">全未使用</el-radio>
                <el-radio :label="99" name="third_soft_usage" style="width:23%;margin-left: 5px;">部分使用</el-radio>
                <el-input v-if="systemForm.third_soft_usage=='99'" v-model="systemForm.other_third_soft_usage" placeholder="%" size="mini" style="display:inline-block; width:60px"></el-input>
              </el-radio-group>
            </el-form-item>
          </tr>
        </table>
      </el-form-item>
      <el-form-item label="系统采用服务器：">
        <table>
          <tr>
            <el-form-item>
            <td width="120px" align="center">服务类型</td>
            <td width="430px" align="center">服务责任方类型</td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.rating" @change="sysServerChange('rating')">等级测评</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.rating" v-model="systemForm.rating" style="width:100%">
                <el-radio label="1" name="rating" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="rating" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="rating" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.risk_assessment" @change="sysServerChange('risk_assessment')">风险评估</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.risk_assessment" v-model="systemForm.risk_assessment" style="width:100%">
                <el-radio label="1" name="risk_assessment" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="risk_assessment" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="risk_assessment" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.disaster_recovery" @change="sysServerChange('disaster_recovery')">灾害恢复</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.disaster_recovery" v-model="systemForm.disaster_recovery" style="width:100%">
                <el-radio label="1" name="disaster_recovery" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="disaster_recovery" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="disaster_recovery" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.emergency_response" @change="sysServerChange('emergency_response')">应急响应</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.emergency_response" v-model="systemForm.emergency_response" style="width:100%">
                <el-radio label="1" name="emergency_response" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="emergency_response" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="emergency_response" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.sys_integration" @change="sysServerChange('sys_integration')">系统集成</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.sys_integration" v-model="systemForm.sys_integration" style="width:100%">
                <el-radio label="1" name="sys_integration" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="sys_integration" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="sys_integration" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.safety_advice" @change="sysServerChange('safety_advice')">安全咨询</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.safety_advice" v-model="systemForm.safety_advice" style="width:100%">
                <el-radio label="1" name="safety_advice" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="safety_advice" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="safety_advice" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item >
            <td align="left" width="120px">
              <el-checkbox v-model="configData.safety_training" @change="sysServerChange('safety_training')">安全培训</el-checkbox>
            </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.safety_training" v-model="systemForm.safety_training" style="width:100%">
                <el-radio label="1" name="safety_training" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="safety_training" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="safety_training" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
            </td>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item prop="other_name" >
              <td align="left" width="120px">
              <el-checkbox v-model="configData.other" @change="sysServerChange('other')">
                <el-input v-bind:disabled="!configData.other" v-model="systemForm.other_name" size="small" placeholder="其他" style="width:80px"></el-input>
              </el-checkbox>
              </td>
            <td align="center" width="430px">
              <el-radio-group v-bind:disabled="!configData.other" v-model="systemForm.other" style="width:100%">
                <el-radio label="1" name="other" style="width:30%;margin-left: 5px;">本行业(单位)</el-radio>
                <el-radio label="2" name="other" style="width:30%;margin-left: 5px;">国内其他服务商</el-radio>
                <el-radio label="3" name="other" style="width:30%;margin-left: 5px;">国外服务商</el-radio>
              </el-radio-group>
              </td>
            </el-form-item>
            </tr>
        </table>
      </el-form-item>
      <el-form-item label="等级测评单位：" prop="rating_unit">
        <el-input v-model="systemForm.rating_unit" placeholder="单位名称" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="投入运行时间：" prop="usage_time">
        <el-date-picker v-model="systemForm.usage_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否分系统：" required>
        <el-radio-group v-model="systemForm.is_sub_system">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="systemForm.is_sub_system=='1'" label="上级系统名称：">
        <el-input v-model="systemForm.parent_sys_name" placeholder="上级系统名称" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item v-if="systemForm.is_sub_system=='1'" label="上级系统所属单位名称：">
        <el-input v-model="systemForm.parent_unit_name" placeholder="上级系统所属单位名称" class="set-input-width40"></el-input>
      </el-form-item>
    </div>

    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">信息系统定级情况</h4>
      </div>
      <el-form-item label="业务信息等级：">
        <a title="从业务信息安全角度反映的信息系统安全保护等级"><i class="el-icon-information"></i></a>{{ configData.biz_level }}
        <el-form-item label="损害客体及损害程度" style="display:block">
          </br>
          <el-checkbox-group v-model="configData.biz_protect_level" @change="getLevel('biz_protect_level','biz_level','biz_max')" style="display:block">
            <div>
              <el-checkbox label="1-1" style="margin-left: 5px;">仅对公民、法人和其他组织的合法权益造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="2-2" style="margin-left: 5px;">对公民、法人和其他组织的合法权益造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="3-2" style="margin-left: 5px;">对社会秩序和公共利益造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="4-3" style="margin-left: 5px;">对社会秩序和公共利益造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="5-3" style="margin-left: 5px;">对国家安全造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="6-4" style="margin-left: 5px;">对社会秩序和公共利益造成特别严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="7-4" style="margin-left: 5px;">对国家安全造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="8-5" style="margin-left: 5px;">对国家安全造成特别严重损害</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>
      <el-form-item label="系统服务等级：">
        <a title="从系统服务安全角度反映的信息系统安全保护等级"><i class="el-icon-information"></i></a>{{ configData.sys_service_level }}
        <el-form-item label="损害客体及损害程度">
          </br>
          <el-checkbox-group v-model="configData.sys_service_proect_level" @change="getLevel('sys_service_proect_level','sys_service_level','sys_service_max')">
            <div>
              <el-checkbox label="1-1" style="margin-left: 5px;">仅对公民、法人和其他组织的合法权益造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="2-2" style="margin-left: 5px;">对公民、法人和其他组织的合法权益造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="3-2" style="margin-left: 5px;">对社会秩序和公共利益造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="4-3" style="margin-left: 5px;">对社会秩序和公共利益造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="5-3" style="margin-left: 5px;">对国家安全造成损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="6-4" style="margin-left: 5px;">对社会秩序和公共利益造成特别严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="7-4" style="margin-left: 5px;">对国家安全造成严重损害</el-checkbox>
            </div>
            <div>
              <el-checkbox label="8-5" style="margin-left: 5px;">对国家安全造成特别严重损害</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>
      <el-form-item label="信息系统等级：">
        <a title="业务信息安全保护等级和系统服务安全保护等级的较高者确定为定级对象的安全保护等级。"><i class="el-icon-information"></i></a>{{ systemForm.info_sys_protec_level }}
      </el-form-item>
      <el-form-item label="定级时间：" prop="grading_time">
        <el-date-picker v-model="systemForm.grading_time" type="datetime" placeholder="选择定级时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="专家评审：" required>
        <el-radio-group v-model="systemForm.expert_review">
          <el-radio label="1">已评审</el-radio>
          <el-radio label="0">未评审</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有主管部门：" required>
        <el-radio-group v-model="systemForm.has_admin">
          <el-radio :label="1">有</el-radio>
          <el-radio :label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="systemForm.has_admin=='1'" label="主管部门名称：">
        <el-input v-model="systemForm.admin_name" placeholder="单位名称" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item v-if="systemForm.has_admin=='1'" label="主管部门审批定级情况：">
        <el-radio-group v-model="systemForm.approval_info">
          <el-radio label="1">已审批</el-radio>
          <el-radio label="0">未审批</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系统定级报告：" required>
        <el-radio-group v-model="systemForm.rating_report">
          <el-radio label="1">有</el-radio>
          <el-radio label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="systemForm.rating_report == '1'" label="审核整改通知:" required>
        <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=rating_report_filepath&name=rating_report_filename" :on-success="handleSuccessFile" :file-list="fileList_report" :on-remove="handleRemove_report">
          <el-button slot="trigger" size="small" type="text" v-show="systemForm.rating_report_filepath == ''">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="填单人：" prop="informant">
        <el-input v-model="systemForm.informant" placeholder="填单人" class="set-input-width40"></el-input>
      </el-form-item>
      <el-form-item label="填单日期：" prop="filling_time">
        <el-date-picker v-model="systemForm.filling_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
    </div>

    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">信息系统提交材料</h4>
      </div>
      <el-form-item label="">
        <el-form-item label="材料列表">
          </br>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_1" style="margin-left: 5px;">系统拓扑结构及说明</el-checkbox>
            </td>
            <td v-show="configData.attachment_1==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath1&name=attachment_filename1" :on-success="handleSuccessFile" :file-list="fileList1" :on-remove="handleRemove1">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath1 === ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_2" style="margin-left: 5px;">系统安全组织机构及管理制度</el-checkbox>
            </td>
            <td v-show="configData.attachment_2==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath2&name=attachment_filename2" :on-success="handleSuccessFile" :file-list="fileList2" :on-remove="handleRemove2">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath2 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_3" style="margin-left: 5px;">系统安全保护设施设计实施方案或改建实施方案</el-checkbox>
            </td>
            <td v-show="configData.attachment_3==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath3&name=attachment_filename3" :on-success="handleSuccessFile" :file-list="fileList3" :on-remove="handleRemove3">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath3 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_4" style="margin-left: 5px;">系统使用的安全产品清单及认证、销售许可证明</el-checkbox>
            </td>
            <td v-show="configData.attachment_4==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath4&name=attachment_filename4" :on-success="handleSuccessFile" :file-list="fileList4" :on-remove="handleRemove4">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath4 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_5" style="margin-left: 5px;">系统等级测评报告</el-checkbox>
            </td>
            <td v-show="configData.attachment_5==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath5&name=attachment_filename5" :on-success="handleSuccessFile" :file-list="fileList5" :on-remove="handleRemove5">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath5 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_6" style="margin-left: 5px;">专家评审情况</el-checkbox>
            </td>
            <td v-show="configData.attachment_6==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath6&name=attachment_filename6" :on-success="handleSuccessFile" :file-list="fileList6" :on-remove="handleRemove6">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath6 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
          <div>
            <td style="width:400px">
              <el-checkbox v-model="configData.attachment_7" style="margin-left: 5px;">上级主管部门审批意见</el-checkbox>
            </td>
            <td v-show="configData.attachment_7==true">
              <el-upload ref="upload" action="/ssa/classifiedP/upLoad.do?path=attachment_filepath7&name=attachment_filename7" :on-success="handleSuccessFile" :file-list="fileList7" :on-remove="handleRemove7">
                <el-button slot="trigger" size="small" type="text" v-show="systemForm.attachment_filepath7 == ''">+添加附件</el-button>
              </el-upload>
            </td>
          </div>
        </el-form-item>
      </el-form-item>
    </div>
    <el-row>
      <el-col :span="12">


        <el-form-item v-if="this.$route.params.handle =='update' || this.$route.params.handle =='add' || this.$route.params.handle =='change'">
          <el-button type="primary" @click="handleSave('approve')">提交</el-button>
          <el-button type="primary" @click="handleSave('save')">保存</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>
        <el-form-item v-if="this.$route.params.tkey =='System_Rectification'">
          <el-button type="primary" @click="SubmitTask('systemForm')">提交</el-button>
          <el-button type="gray" @click="goBack">返回</el-button>
        </el-form-item>

      </el-col>
    </el-row>

  </el-form>
  <!---------------------------------------------------材料签收 -------------------------------------------------->
  <el-form v-if="this.$route.params.tkey =='System_Sign'" ref="signForm" :model="signForm" label-width="150px">

    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">材料签收</h4>
      </div>
      <el-form-item label="接收材料回执：" required>
        <el-upload ref="signUpload" action="/ssa/classifiedP/completeSignTask.do" :on-success="handleSuccess" :data="signForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
          <div style="display:inline-block; min-width:100px;"><a type="text" href="/ssa/classifiedP/downloadTemplate.do?fileName=System_Receive.docx" class="downloadtext font-color">模板下载</a></div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button v-if="this.$route.params.tkey =='System_Sign'" type="primary" @click="SignTaskSubmit()">提交审批</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </div>
  </el-form>
  <!---------------------------------------------------系统核查 -------------------------------------------------->
  <el-form v-if="this.$route.params.tkey =='System_Check'" ref="systemCheckOpinion" :model="systemCheckOpinion" label-width="120px">
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">系统核查</h4>
      </div>
      <el-form-item label="是否通过">
        <el-radio-group v-model="systemCheckOpinion.isPass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见">
        <el-input type="textarea" v-model="systemCheckOpinion.reason"></el-input>
      </el-form-item>
      <el-form-item v-show="systemCheckOpinion.isPass == false" label="审核整改通知:" required>
        <el-upload ref="checkUpload" action="/ssa/classifiedP/completeCheckTask.do" :on-success="handleSuccess" :data="systemCheckOpinion" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
          <div style="display:inline-block; min-width:100px;"><a type="text" href="/ssa/classifiedP/downloadTemplate.do?fileName=System_Rectification.docx" class="downloadtext font-color">模板下载</a></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CheckTaskSubmit()">提交</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </div>
  </el-form>
  <!---------------------------------------------------材料上传 -------------------------------------------------->
  <el-form v-if="this.$route.params.tkey =='System_Issued'" ref="issuedForm" :model="issuedForm" label-width="120px">
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">材料上传</h4>
      </div>
      <el-form-item label="系统材料上传" required>
        <el-upload ref="issuedUpload" action="/ssa/classifiedP/completeIssuedTask.do" :on-success="handleSuccess" :data="issuedForm" :auto-upload="false">
          <el-button slot="trigger" size="small" type="text">+添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="IssuedTaskSubmit()">提交审批</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
      </el-form-item>
    </div>
  </el-form>
  <!---------------------------------------------------材料审核 -------------------------------------------------->
  <el-form v-if="this.$route.params.tkey =='System_FileCheck'" ref="systemProcessOpinion" :model="systemProcessOpinion" label-width="120px" :rules="processOpinionRules">
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">材料审核</h4>
      </div>
      <el-form-item label="审核意见" prop="reason">
        <el-input type="textarea" v-model="systemProcessOpinion.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="this.$route.params.tkey =='System_FileCheck'" type="primary" @click="SubmitEnd(true)">归档</el-button>
        <el-button v-if="this.$route.params.tkey =='System_FileCheck'" type="primary" @click="SubmitEnd(false)">驳回</el-button>
        <el-button type="gray" @click="goBack">返回</el-button>
        <el-button type="text" size="small" @click="exportView">导出打印备案证明</el-button>
      </el-form-item>
    </div>
  </el-form>

</div>
</div>
</template>

<script>
import unitList from "./UnitList.vue"
export default {
  components: {
    unitList,
  },
  data() {
    let validateDevVersion = (rule, value, callback) => {
      if (value != null) {
        let pat = new RegExp("^([0-9]{1,4})$")
        if (pat.test(value)) {
          callback();
        } else {
          callback(new Error('数量为1~9999'))
        }
      } else {
        callback()
      }
    };
    let validateUsage = (rule, value, callback) => {
      let req = rule.required;
      if (this.configData[req]) {
        if (value != null) {
          let pat = /^((\d|[1-9]\d)(\.\d{1,2})?)$/
          if (value != "0" && value != "0.0" && value != "0.00" && value != "00.00" && pat.test(value)) {
            callback();
          } else {
            callback(new Error('请输入范围为0到100的数保留两位小数'))
          }
        } else {
          callback(new Error('请输入部分使用'))
        }
      } else {
        callback()
      }
    };
    let validateOther = (rule, value, callback) => {
      let req = rule.required;
      if (this.configData[req]) {
        if (value != null && value !="") {
            callback();
        } else {
          callback(new Error('请输入名称'))
        }
      } else {
        callback()
      }
    };
    return {
      tableId: 'unitlisttable',
      systemForm: {
        sys_id: null,
        //用户id
        user_id: null,
        //单位ID
        unit_id: "",
        //
        record_code: "",
        //备案
        filing: 1,
        //预备案
        pre_filing: 1,
        //国家级系统
        national_sys: "1",
        //备案证明编号
        record_approval_code: "",
        //系统编号
        sys_number: "",
        //系统名称
        sys_name: "",
        //系统简称
        sys_abbr: "",
        //业务类型
        biz_type: "",
        ohter_biz_type: "",
        //业务描述
        biz_desc: "",
        //服务范围
        service_area: "",
        ohter_service_area: "",
        //服务对象
        service_object: "",
        ohter_service_area: "",
        //覆盖访问
        coverage_access: "",
        ohter_service_area: "",
        //网络性质
        network_nature: "",
        ohter_service_area: "",
        //系统互联情况
        sys_situation: "",
        other_sys_situation: "",
        //安全专用产品名称及版本
        special_prod_info: false,
        //安全专用产品数量
        special_prod_amount: 0,
        //安全专用产品使用率
        special_prod_usage: "",
        //网络产品名称及版本
        network_prod_info: "",
        //网络产品数量
        network_prod_amount: 0,
        //网络产品使用率
        network_prod_usage: "",
        //操作系统名称及版本
        os_info: "",
        //操作系统数量
        os_amount: 0,
        //操作系统
        os_usage: "",
        //数据库名称及版本
        db_info: "",
        //数据库数量
        db_amount: 0,
        //数据库使用率
        db_usage: "",
        //服务器名称及版本
        server_info: "",
        //服务器数量
        server_amount: 0,
        //服务器使用量
        server_usage: "",
        //第三方软件名称及版本
        third_soft_info: "",
        //第三方软件数量
        third_soft_amount: 0,
        //第三方软件使用率
        third_soft_usage: "",
        //等级测评
        rating: "",
        //风险评估
        risk_assessment: "",
        //灾害恢复
        disaster_recovery: "",
        //应急响应
        emergency_response: "",
        //系统集成
        sys_integration: "",
        //安全咨询
        safety_advice: "",
        //安全培训
        safety_training: "",
        //其他
        other_name: "",
        other: "",
        //等级测评机构单位名称
        rating_unit: "",
        //投入使用时间
        usage_time: "",
        //系统是否分系统
        is_sub_system: 0,
        //上级系统名称
        parent_sys_name: "",
        parent_unit_name: "",
        //业务信息安全保护等级
        biz_protect_level: "",
        //系统服务安全保护等级
        sys_service_proect_level: "",
        //信息系统保护等级
        info_sys_protec_level: "",
        //定级时间
        grading_time: "",
        //专家评审情况
        expert_review: "0",
        //是否有主管部门
        has_admin: 0,
        //主管部门名称
        admin_name: "",
        //主管部门审批定级情况
        approval_info: "",
        //系统定级报告
        rating_report: "0",
        rating_report_filename: "",
        rating_report_filepath: "",
        //政府网站系统
        is_government: "",
        //填报人
        informant: "",
        //填报时间
        filling_time: "",
        processInstanceId: "",
        taskId: "",
        attachment_filename1: "",
        attachment_filename2: "",
        attachment_filename3: "",
        attachment_filename4: "",
        attachment_filename5: "",
        attachment_filename6: "",
        attachment_filename7: "",

        attachment_filepath1: "",
        attachment_filepath2: "",
        attachment_filepath3: "",
        attachment_filepath4: "",
        attachment_filepath5: "",
        attachment_filepath6: "",
        attachment_filepath7: "",

        // 部分使用
        other_special_prod_usage: null,
        other_db_usage: null,
        other_network_prod_usage: null,
        other_server_usage: null,
        other_third_soft_usage: null,
        other_os_usage: null,

        change:0,
        old_id:"",
        type:"",
      },
      dialog_unit: false,
      unitData: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      fileList_report: [],
      //处置单位
      handleOrg: "",
      treatPrincipalOptions: [],
      eventUnitOptions: [],
      securityEventType1Options: [],
      securityEventType2Options: [],
      infoArray: ["special_prod_info", "db_info", "network_prod_info", "server_info", "os_info"],
      usageArray: ["special_prod_usage", "db_usage", "network_prod_usage", "server_usage", "third_soft_usage", "os_usage"],
      serverTypeArray: ["rating", "risk_assessment", "disaster_recovery", "emergency_response", "sys_integration", "safety_advice", "safety_training", "other"],
      configData: {
        //业务类型
        biz_type: [],
        biz_ohter: false,
        ohter_biz_type: "",
        //服务范围
        service_area: [],
        area_sheng: false,
        area_di: false,
        area_other: false,
        other_service_area: "",
        //服务对象
        service_object: [],
        object_other: false,
        other_service_object: "",
        //覆盖访问
        coverage_access: [],
        access_other: false,
        other_coverage_access: "",
        //网络性质
        network_nature: [],
        nature_other: false,
        other_network_nature: "",
        //系统互联情况
        sys_situation: [],
        situation_other: false,
        other_sys_situation: "",

        //关键产品使用情况
        special_prod_info: true,
        special_ohter: true,
        special_prod_usage: null,
        network_prod_info: true,
        network_ohter: true,
        network_prod_usage: null,
        os_info: true,
        os_ohter: true,
        os_usage: null,
        db_info: true,
        db_ohter: true,
        db_usage: null,
        server_info: true,
        server_ohter: true,
        server_usage: null,
        third_soft: "",
        third_soft_info: false,
        third_soft_ohter: true,
        third_soft_usage: null,

        //系统采用服务器
        rating: false,
        risk_assessment: false,
        disaster_recovery: false,
        emergency_response: false,
        sys_integration: false,
        safety_advice: false,
        safety_training: false,
        other: false,

        //等级
        biz_level: "",
        biz_protect_level: [],
        sys_service_level: "",
        sys_service_proect_level: [],
        biz_max: 0,
        sys_service_max: 0,
        //提交材料
        attachment_1: "",
        attachment_2: "",
        attachment_3: "",
        attachment_4: "",
        attachment_5: "",
        attachment_6: "",
        attachment_7: "",
        req_special_prod_usage: false,
        req_db_usage: false,
        req_network_prod_usage: false,
        req_server_usage: false,
        req_third_soft_usage: false,
        req_os_usage: false,
      },
      systemProcessOpinion: {
        sys_id: null,
        isPass: true,
        reason: ""
      },
      signForm: {
        taskId: null,
        sys_id: null,
      },
      systemCheckOpinion: {
        taskId: null,
        sys_id: null,
        isPass: true,
        reason: ""
      },
      issuedForm: {
        taskId: null,
        sys_id: null,
      },
      rules: {
        //填报日期
        filling_time: [{
          type: 'date',
          required: true,
          message: '请选填报日期',
          trigger: 'change',
        }],
        //投入使用时间
        usage_time: [{
          type: 'date',
          required: true,
          message: '请选择投入运行日期',
          trigger: 'change',
        }],
        //定级日期
        grading_time: [{
          type: 'date',
          required: true,
          message: '请选择定级日期',
          trigger: 'change',
        }],
        //单位名称
        unit_name: [{
          required: true,
          message: '请选择备案单位',
          trigger: 'blur'
        }],
        //系统名称
        sys_name: [{
          required: true,
          message: '请输入系统名称',
          trigger: 'blur'
        }],
        //填单人
        informant: [{
          required: true,
          message: '请输入填单人',
          trigger: 'blur'
        }],
        //备案证明编号
        record_approval_code: [{
          required: true,
          message: '请输入备案证明编号',
          trigger: 'blur'
        }],
        //系统编号
        sys_number: [{
          required: true,
          message: '请输入系统编号',
          trigger: 'blur'
        }],
        //系统简称
        // sys_abbr: [{
        //   required: true,
        //   message: '请输入系统简称',
        //   trigger: 'blur'
        // }],
        //业务类型
        biz_type: [{
          required: true,
          message: '请选择业务类型',
          trigger: 'change'
        }],
        //业务描述
        biz_desc: [{
          required: true,
          message: '请输入业务描述',
          trigger: 'blur'
        }],
        //服务范围
        service_area: [{
          required: true,
          message: '请选择服务范围',
          trigger: 'change'
        }],
        //服务对象
        service_object: [{
          required: true,
          message: '请选择服务对象',
          trigger: 'change'
        }],
        //覆盖访问
        coverage_access: [{
          required: true,
          message: '请选择覆盖访问',
          trigger: 'change'
        }],
        //网络性质
        network_nature: [{
          required: true,
          message: '请选择网络性质',
          trigger: 'change'
        }],
        //系统互联情况
        sys_situation: [{
          required: true,
          message: '请选择系统互联情况',
          trigger: 'change'
        }],
        //等级测评单位
        rating_unit: [{
          required: true,
          message: '请输入等级测评单位',
          trigger: 'blur'
        }],
        special_prod_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        network_prod_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        db_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        os_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        server_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        third_soft_amount: [{
          validator: validateDevVersion,
          trigger: 'blur'
        }],
        other_special_prod_usage: [{
          required: 'req_special_prod_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
        other_db_usage: [{
          required: 'req_db_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
        other_network_prod_usage: [{
          required: 'req_network_prod_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
        other_server_usage: [{
          required: 'req_server_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
        other_third_soft_usage: [{
          required: 'req_third_soft_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
        other_os_usage: [{
          required: 'req_os_usage',
          validator: validateUsage,
          trigger: 'blur'
        }],
         third_soft_info:[{
            required: 'third_soft_info',
            validator:validateOther,
            trigger: 'blur'
          }],
        other_name:[{
           required: 'other',
           validator:validateOther,
           trigger: 'blur'
         }],
      },
      processOpinionRules: {
        //审批意见
        reason: [{
          required: true,
          message: '请输入审批意见',
          trigger: 'blur'
        }],
      },







    }
  },
  watch: {

  },
  methods: {
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    handleSave(type) {
      this.$refs["systemForm"].validate(async(valid) => {
        if (valid) {
          this.systemForm.grading_time = this.utils.formatDate(new Date(this.systemForm.grading_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.usage_time = this.utils.formatDate(new Date(this.systemForm.usage_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.filling_time = this.utils.formatDate(new Date(this.systemForm.filling_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.biz_protect_level = this.configData.biz_protect_level.join(";");
          this.systemForm.sys_service_proect_level = this.configData.sys_service_proect_level.join(";");
          this.setUsage("save");
          //let data = await this.utils.reqBackState("/ssa/classifiedP/saveSystemInfo.do", this.systemForm, this);
          var msg;
          if (type == 'save') {
            //进行保存
            msg = await this.utils.req("/ssa/classifiedP/saveSystemInfo.do", this.systemForm, this);
          } else if (type == 'approve') {
            //保存并发起流程
            msg = await this.utils.req("/ssa/classifiedP/startSystemProcess.do", this.systemForm, this);
          }
          this.$message({
            type: "success",
            message: msg
          });
          this.goBack();
        }else {
          this.$alert('请正确填写表单内容', '警告', {
            type: "warning"
          });
        }
      });

    },

    //流程提交
    SignTaskSubmit() {
      this.signForm.taskId = this.$route.params.taskId;
      this.signForm.sys_id = this.$route.params.sys_id;
      if (this.$refs["signUpload"].uploadFiles.length == 0) {
        this.$alert('请上传附件', '警告', {
          type: "warning"
        });
      } else if (this.$refs["signUpload"].uploadFiles.length == 1) {
        this.$refs["signUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },
    async CheckTaskSubmit() {
      var taskId = this.$route.params.taskId;
      var sys_id = this.$route.params.sys_id;
      var params = {};
      params = this.systemCheckOpinion;
      params.sys_id = sys_id;
      params.taskId = taskId;
      if (!this.systemCheckOpinion.isPass) {
        if (this.$refs["checkUpload"].uploadFiles.length == 0) {
          this.$alert('请上传附件', '警告', {
            type: "warning"
          });
        } else if (this.$refs["checkUpload"].uploadFiles.length == 1) {
          this.$refs["checkUpload"].submit();
        } else {
          this.$alert('多文件请打包上传', '警告', {
            type: "warning"
          });
        }
      } else {
        var msg = await this.utils.req("/ssa/classifiedP/completeCheckTask.do", params, this);
        this.$message({
          message: msg,
          type: 'success'
        });
        this.goBack();
      }
    },
    IssuedTaskSubmit() {
      this.issuedForm.taskId = this.$route.params.taskId;
      this.issuedForm.sys_id = this.$route.params.sys_id;
      if (this.$refs["issuedUpload"].uploadFiles.length == 0) {
        this.$alert('请上传附件', '警告', {
          type: "warning"
        });
      } else if (this.$refs["issuedUpload"].uploadFiles.length == 1) {
        this.$refs["issuedUpload"].submit();
      } else {
        this.$alert('多文件请打包上传', '警告', {
          type: "warning"
        });
      }
    },
    async Submit() {
      var taskId = this.$route.params.taskId;
      var sys_id = this.$route.params.sys_id;
      var params = {};
      params = this.systemProcessOpinion;
      params.sys_id = sys_id;
      params.taskId = taskId;
      params.isPass = isPass;
      var msg = await this.utils.req("/ssa/classifiedP/completeSystemAddTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    async SubmitEnd(isPass) {
      var taskId = this.$route.params.taskId;
      var sys_id = this.$route.params.sys_id;
      var params = {};
      params = this.systemProcessOpinion;
      params.sys_id = sys_id;
      params.taskId = taskId;
      params.isPass = isPass;
      var msg = await this.utils.req("/ssa/classifiedP/completeSystemEndTask.do", params, this);
      this.$message({
        type: "success",
        message: msg
      });
      this.goBack();
    },
    async SubmitTask(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          var taskId = this.$route.params.taskId;
          this.systemForm.grading_time = this.utils.formatDate(new Date(this.systemForm.grading_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.usage_time = this.utils.formatDate(new Date(this.systemForm.usage_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.filling_time = this.utils.formatDate(new Date(this.systemForm.filling_time), "yyyy-MM-dd hh:mm:ss")
          this.systemForm.biz_protect_level = this.configData.biz_protect_level.join(";");
          this.systemForm.sys_service_proect_level = this.configData.sys_service_proect_level.join(";");
          this.setUsage("save");
          this.systemForm.taskId = taskId;
          let msg = await this.utils.req("/ssa/classifiedP/completeSystemTask.do", this.systemForm, this);
          this.$message({
            type: "success",
            message: msg
          });
          this.goBack();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    getClean(value) {
      //if(this.systemForm[value] = ""){return};
      //this.systemForm[value] = "";
    },
    otherChange(value) {
      var info = value + "_info";
      var usage = value + "_usage";
      var amount = value + "_amount";
      if (!this.configData[info] && info == "third_soft_info") {
        this.systemForm[amount] = 0;
        this.systemForm[usage] = "";
        this.systemForm[info] = "";
      } else if (!this.systemForm[info] && info != "third_soft_info") {
        this.systemForm[amount] = 0;
        this.systemForm[usage] = "";
      } else {
        this.systemForm[usage] = 100;

      }
    },
    radioChange(leble, value) {
      var req = "req_" + leble;
      if (this.systemForm[leble] == "99") {
        if (this.configData[value]) {
          this.configData[value] = false;
          this.configData[req] = true;
        }
      } else {
        this.configData[value] = true;
        this.configData[req] = false;
      }
    },
    handleSuccess(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.result, "消息");
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.goBack();
      }
    },
    exportView() {
      var sys_id = this.$route.params.sys_id;
      var param = "reportType=pdfForm&exportFileName=信息系统安全等级备案备案证明&sys_id="+sys_id;
      window.location.href = "/ssa/classifiedP/downloadWord.do?" + param;
    },
    dialogUnit(row) {
      this.dialog_unit = false;
      this.systemForm.unit_id = row.unit_id;
      this.systemForm.unit_name = row.unit_name;
      this.systemForm.record_code = row.record_code;
    },
    setUsage(type) {
      if (type == "save") {
        for (var item in this.usageArray) {
          let other = "other_" + this.usageArray[item];
          if (this.systemForm[this.usageArray[item]] != "0" && this.systemForm[this.usageArray[item]] != "100" && this.systemForm[this.usageArray[item]] != "") {
            this.systemForm[this.usageArray[item]] = this.systemForm[other];
          }
        }
      } else if (type == "load") {
        for (var item in this.usageArray) {
          let other = "other_" + this.usageArray[item];
          if (this.systemForm[this.usageArray[item]] != "0" && this.systemForm[this.usageArray[item]] != "100" && this.systemForm[this.usageArray[item]] != null) {
            this.systemForm[other] = this.systemForm[this.usageArray[item]];
            this.systemForm[this.usageArray[item]] = 99;
          }
        }
        if (this.systemForm["third_soft_info"] != "") {
          this.configData["third_soft_info"] = true;
        }
      }
    },
    setInfo() {
      for (var item in this.infoArray) {
        if (this.systemForm[this.infoArray[item]] == "true") {
          this.systemForm[this.infoArray[item]] = true;
        } else {
          this.systemForm[this.infoArray[item]] = false;
        }
      }
    },
    setServerType() {
      for (var item in this.serverTypeArray) {
        if (this.systemForm[this.serverTypeArray[item]] != "") {
          this.configData[this.serverTypeArray[item]] = true;
        }
      }
    },
    getLevel(key, levelkey, maxkey) {
      let max = 0;
      this.configData[key].forEach(function(item) {
        if (max < item.split("-")[1]) {
          max = item.split("-")[1];
        }
      });
      this.configData[maxkey] = max;
      this.configData[levelkey] = this.getLeveText(max);
      if (this.configData.biz_max > this.configData.sys_service_max) {
        this.systemForm.info_sys_protec_level = this.getLeveText(this.configData.biz_max);
      } else {
        this.systemForm.info_sys_protec_level = this.getLeveText(this.configData.sys_service_max);
      }
      //.split(";")
    },
    getLeveText(value) {
      let msg = "";
      switch (value) {
        case '1':
          msg = '第一级';
          break;
        case '2':
          msg = '第二级';
          break;
        case '3':
          msg = '第三级';
          break;
        case '4':
          msg = '第四级';
          break;
        case '5':
          msg = '第五级';
          break;
        default:
          break;
      }
      return msg;
    },
    handleSuccessFile(response, file, fileList) {
      if (!response.state) {
        this.$alert(response.result.result, "消息");
      } else {
        this.systemForm[response.data.formPath] = response.data.filepath;
        this.systemForm[response.data.formName] = response.data.filename;
      }
    },
    handleRemove_report(file, fileList) {
      this.systemForm.rating_report_filename = "";
      this.systemForm.rating_report_filepath = "";
    },
    handleRemove1(file, fileList) {
      this.systemForm.attachment_filepath1 = "";
      this.systemForm.attachment_filename1 = "";
    },
    handleRemove2(file, fileList) {
      this.systemForm.attachment_filepath2 = "";
      this.systemForm.attachment_filename2 = "";
    },
    handleRemove3(file, fileList) {
      this.systemForm.attachment_filepath3 = "";
      this.systemForm.attachment_filename3 = "";
    },
    handleRemove4(file, fileList) {
      this.systemForm.attachment_filepath4 = "";
      this.systemForm.attachment_filename4 = "";
    },
    handleRemove5(file, fileList) {
      this.systemForm.attachment_filepath5 = "";
      this.systemForm.attachment_filename5 = "";
    },
    handleRemove6(file, fileList) {
      this.systemForm.attachment_filepath6 = "";
      this.systemForm.attachment_filename6 = "";
    },
    handleRemove7(file, fileList) {
      this.systemForm.attachment_filepath7 = "";
      this.systemForm.attachment_filename7 = "";
    },
    sysServerChange(value) {
      if (!this.configData[value]) {
        this.systemForm[value] = "";
      } else {
        this.systemForm[value] = "1";
      }
    },
  },
  mounted: async function() {},
  created: function() {
    if (this.$route.params.handle == 'update' || this.$route.params.tkey == 'System_Rectification') {
      var sys_id = this.$route.params.sys_id;
      var params = {};
      params.sys_id = sys_id;
      this.utils.req("/ssa/classifiedP/getSystemForm.do", params, this).then(data => {
        this.systemForm = data;
        this.systemForm.usage_time = new Date(data.usage_time);
        this.systemForm.grading_time = new Date(data.grading_time);
        this.systemForm.filling_time = new Date(data.filling_time);
        if (this.systemForm.biz_protect_level != null && this.systemForm.biz_protect_level != "") {
          this.configData.biz_protect_level = this.systemForm.biz_protect_level.split(";");
        }
        if (this.systemForm.biz_protect_level != null && this.systemForm.biz_protect_level != "") {
          this.configData.sys_service_proect_level = this.systemForm.sys_service_proect_level.split(";");
        }
        this.getLevel("biz_protect_level", "biz_level", "biz_max");
        this.getLevel("sys_service_proect_level", "sys_service_level", "sys_service_max");
        this.setUsage("load");
        this.setServerType();
        this.setInfo();
        if (this.systemForm.rating_report_filename != null && this.systemForm.rating_report_filename != "" &&this.systemForm.attachment_filename1=="1") {
          this.fileList_report = [{
            name: this.systemForm.rating_report_filename,
            url: this.systemForm.rating_report_filepath,
          }];
        }
        if (this.systemForm.attachment_filename1 != null && this.systemForm.attachment_filename1 != "") {
          this.configData.attachment_1 = true;
          this.fileList1 = [{
            name: this.systemForm.attachment_filename1,
            url: this.systemForm.attachment_filepath1,
          }];
        }
        if (this.systemForm.attachment_filename2 != null && this.systemForm.attachment_filename2 != "") {
          this.configData.attachment_2 = true;
          this.fileList2 = [{
            name: this.systemForm.attachment_filename2,
            url: this.systemForm.attachment_filepath2,
          }];
        }
        if (this.systemForm.attachment_filename3 != null && this.systemForm.attachment_filename3 != "") {
          this.configData.attachment_3 = true;
          this.fileList3 = [{
            name: this.systemForm.attachment_filename3,
            url: this.systemForm.attachment_filepath3,
          }];
        }
        if (this.systemForm.attachment_filename4 != null && this.systemForm.attachment_filename4 != "") {
          this.configData.attachment_4 = true;
          this.fileList4 = [{
            name: this.systemForm.attachment_filename4,
            url: this.systemForm.attachment_filepath4,
          }];
        }
        if (this.systemForm.attachment_filename5 != null && this.systemForm.attachment_filename5 != "") {
          this.configData.attachment_5 = true;
          this.fileList5 = [{
            name: this.systemForm.attachment_filename5,
            url: this.systemForm.attachment_filepath5,
          }];
        }
        if (this.systemForm.attachment_filename6 != null && this.systemForm.attachment_filename6 != "") {
          this.configData.attachment_6 = true;
          this.fileList6 = [{
            name: this.systemForm.attachment_filename6,
            url: this.systemForm.attachment_filepath6,
          }];
        }
        if (this.systemForm.attachment_filename7 != null && this.systemForm.attachment_filename7 != "") {
          this.configData.attachment_7 = true;
          this.fileList7 = [{
            name: this.systemForm.attachment_filename7,
            url: this.systemForm.attachment_filepath7,
          }];
        }
        if(this.$route.params.handle =='change'){
          this.systemForm.old_id=sys_id;
          this.systemForm.sys_id=null;
          this.systemForm.change=parseInt(this.systemForm.change)+1;
          this.systemForm.type="change";
        }
      });
    }
  },
}
</script>
<style>
.cruxproduse {
  float: left;
}

.el-form-item .cruxproduse .el-form-item__content {
  margin-left: 20px !important;
}

.el-form-item .cruxproduse .el-form-item__content .el-input {
  max-width: 120px !important;
  width: 60px;
}
</style>
