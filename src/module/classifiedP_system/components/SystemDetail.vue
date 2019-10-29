<template>
  <div class="whitebackground Whitespace alter-el-form" v-if="this.$route.params.tkey == 'System_Sign' || this.$route.params.tkey== 'System_Check' || this.$route.params.tkey == 'System_FileCheck' || this.$route.params.tkey == 'System_Issued' || this.$route.params.handle == 'view'">
    <div class="top-title">系统单位信息</div>
    <div class="el-sub-panel">
      <div class="el-sub-panel-heading">
        <h4 class="sub-title">备案单位信息</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>单位名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.unit_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>备案表编号：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.record_code}}</div>
      </el-col>
    </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
    <h4 class="sub-title">信息系统情况</h4>
  </div>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>是否已发备案证明：</div>
    </el-col>
    <el-col :span="16">
    <div v-if="systemDetail.filing ==1">是</div>
    <div v-if="systemDetail.filing ==0">否</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>系统是否预备案：</div>
    </el-col>
    <el-col :span="16">
    <div v-if="systemDetail.pre_filing ==1">是</div>
    <div v-if="systemDetail.pre_filing ==0">否</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>系统是否国家级系统：</div>
    </el-col>
    <el-col :span="16">
    <div v-if="systemDetail.national_sys =='1'">是</div>
    <div v-if="systemDetail.national_sys =='0'">否</div>
    </el-col>
  </el-row>
  <el-row class="process-content" :gutter="20">
    <el-col :span="4">
      <div>备案证明编号：</div>
    </el-col>
    <el-col :span="16">
      <div>{{systemDetail.record_approval_code}}</div>
    </el-col>
  </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.sys_name}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统编号：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.sys_number}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统简介：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.sys_abbr}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>业务类型：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.biz_type}}
        <span v-if="systemDetail.biz_type=='其他'">-{{systemDetail.other_biz_type}}</span>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>业务描述：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.biz_desc}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>服务范围：</div>
      </el-col>
      <el-col :span="16">
      <div v-if="systemDetail.service_area=='10'">全国</div>
      <div v-if="systemDetail.service_area=='11'">跨省(区，市){{systemDetail.other_service_area}}个</div>
      <div v-if="systemDetail.service_area=='20'">全省（区，市）</div>
      <div v-if="systemDetail.service_area=='21'">跨地(区，市){{systemDetail.other_service_area}}个</div>
      <div v-if="systemDetail.service_area=='30'">地（区，市）内</div>
      <div v-if="systemDetail.service_area=='99'">其他-{{systemDetail.other_service_area}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>服务对象：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.service_object}}
        <span v-if="systemDetail.service_object=='其他'">-{{systemDetail.other_service_object}}</span>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>覆盖范围：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.coverage_access}}
        <span v-if="systemDetail.coverage_access=='其他'">-{{systemDetail.other_coverage_access}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>网络性质：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.network_nature}}
        <span v-if="systemDetail.network_nature=='其他'">-{{systemDetail.other_network_nature}}</span></div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统互联情况：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.sys_situation}}
        <span v-if="systemDetail.sys_situation=='其他'">-{{systemDetail.other_sys_situation}}</span></div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>关键产品使用：</div>
      </el-col>
      <el-col :span="16">
      <table>
        <tr>
          <td width="120px" align="left">产品类型</td>
          <td width="60px" align="left">数量</td>
          <td width="300px" align="left">使用国产频率</td>
        </tr>
        <tr v-if="systemDetail.special_prod_info=='true'">
          <td>安全专用产品</td>
          <td>{{systemDetail.special_prod_amount}}</td>
          <td>
            <span v-if="systemDetail.special_prod_usage=='100'">全部使用</span>
            <span v-if="systemDetail.special_prod_usage=='0'">全部未使用</span>
            <span v-if="systemDetail.special_prod_usage!='100' && systemDetail.special_prod_usage!='0'">部分使用 &nbsp;{{systemDetail.special_prod_usage}}%</span>
          </td>
        </tr>
        <tr v-if="systemDetail.network_prod_info=='true'">
          <td>网络产品</td>
          <td>{{systemDetail.network_prod_amount}}</td>
          <td>
            <span v-if="systemDetail.network_prod_usage=='100'">全部使用</span>
            <span v-if="systemDetail.network_prod_usage=='0'">全部未使用</span>
            <span v-if="systemDetail.network_prod_usage!='100' && systemDetail.network_prod_usage!='0'">部分使用 &nbsp;{{systemDetail.network_prod_usage}}%</span>
          </td>
        </tr>
        <tr v-if="systemDetail.os_info=='true'">
          <td>操作系统</td>
          <td>{{systemDetail.os_amount}}</td>
          <td>
            <span v-if="systemDetail.os_usage=='100'">全部使用</span>
            <span v-if="systemDetail.os_usage=='0'">全部未使用</span>
            <span v-if="systemDetail.os_usage!='100' && systemDetail.os_usage!='0'">部分使用 &nbsp;{{systemDetail.os_usage}}%</span>
          </td>
        </tr>
        <tr v-if="systemDetail.db_info=='true'">
          <td>数据库</td>
          <td>{{systemDetail.db_amount}}</td>
          <td>
            <span v-if="systemDetail.db_usage=='100'">全部使用</span>
            <span v-if="systemDetail.db_usage=='0'">全部未使用</span>
            <span v-if="systemDetail.db_usage!='100' && systemDetail.db_usage!='0'">部分使用 &nbsp;{{systemDetail.db_usage}}%</span>
          </td>
        </tr>
        <tr v-if="systemDetail.server_info=='true'">
          <td>服务器</td>
          <td>{{systemDetail.server_amount}}</td>
          <td>
            <span v-if="systemDetail.server_usage=='100'">全部使用</span>
            <span v-if="systemDetail.server_usage=='0'">全部未使用</span>
            <span v-if="systemDetail.server_usage!='100' && systemDetail.server_usage!='0'">部分使用 &nbsp;{{systemDetail.server_usage}}%</span>
          </td>
        </tr>
        <tr v-if="systemDetail.third_soft_info!=''">
          <td>{{systemDetail.third_soft_info}}</td>
          <td>{{systemDetail.third_soft_amount}}</td>
          <td>
            <span v-if="systemDetail.third_soft_usage =='100'">全部使用</span>
            <span v-if="systemDetail.third_soft_usage =='0'">全部未使用</span>
            <span v-if="systemDetail.third_soft_usage !='0' && systemDetail.third_soft_usage !='100'">部分使用 &nbsp;{{systemDetail.third_soft_usage}}%</span>
          </td>
        </tr>
      </table>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统采用服务器：</div>
      </el-col>
      <el-col :span="16">
      <table>
        <tr>
          <td width="50%" align="left">服务类型</td>
          <td width="50%" align="left">服务责任方类型</td>
        </tr>
        <tr v-if="systemDetail.rating !=''">
          <td>等级测评</td>
              <td align="left">
                <span v-if="systemDetail.rating =='1'">本行业(单位)</span>
                <span v-if="systemDetail.rating =='2'">国内其他服务商</span>
                <span v-if="systemDetail.rating =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.risk_assessment !=''">
          <td>风险评估</td>
              <td>
                <span v-if="systemDetail.risk_assessment =='1'">本行业(单位)</span>
                <span v-if="systemDetail.risk_assessment =='2'">国内其他服务商</span>
                <span v-if="systemDetail.risk_assessment =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.disaster_recovery !=''">
          <td>灾害恢复</td>
              <td>
                <span v-if="systemDetail.disaster_recovery =='1'">本行业(单位)</span>
                <span v-if="systemDetail.disaster_recovery =='2'">国内其他服务商</span>
                <span v-if="systemDetail.disaster_recovery =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.emergency_response !=''">
          <td>应急响应</td>
              <td>
                <span v-if="systemDetail.emergency_response =='1'">本行业(单位)</span>
                <span v-if="systemDetail.emergency_response =='2'">国内其他服务商</span>
                <span v-if="systemDetail.emergency_response =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.sys_integration !=''">
          <td>系统集成  </td>
              <td>
                <span v-if="systemDetail.sys_integration =='1'">本行业(单位)</span>
                <span v-if="systemDetail.sys_integration =='2'">国内其他服务商</span>
                <span v-if="systemDetail.sys_integration =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.safety_advice !=''">
          <td>安全咨询</td>
              <td>
                <span v-if="systemDetail.safety_advice =='1'">本行业(单位)</span>
                <span v-if="systemDetail.safety_advice =='2'">国内其他服务商</span>
                <span v-if="systemDetail.safety_advice =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.safety_training !=''">
          <td>安全培训</td>
              <td>
                <span v-if="systemDetail.safety_training =='1'">本行业(单位)</span>
                <span v-if="systemDetail.safety_training =='2'">国内其他服务商</span>
                <span v-if="systemDetail.safety_training =='3'">国外服务商</span>
              </td>
        </tr>
        <tr v-if="systemDetail.other_name !=''">
          <td>{{systemDetail.other_name}}</td>
              <td>
                <span v-if="systemDetail.other =='1'">本行业(单位)</span>
                <span v-if="systemDetail.other =='2'">国内其他服务商</span>
                <span v-if="systemDetail.other =='3'">国外服务商</span>
              </td>
        </tr>
      </table>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>等级评测单位：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.rating_unit}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>职务/投入运行时间：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.usage_time}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否分系统：</div>
      </el-col>
      <span v-if="systemDetail.is_sub_system =='1'">是</span>
      <span v-if="systemDetail.is_sub_system =='0'">否</span>
    </el-row>
  </div>
  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">信息系统定级情况</h4>
    </div>
    <el-row class="process-content" :gutter="20">
      <el-col :span="16">
        <div>业务信息等级：{{ configData.biz_level }}</div>
        <el-checkbox-group v-model="configData.biz_protect_level">
          <div><el-checkbox label="1-1" style="margin-left: 5px;" disabled>仅对公民、法人和其他组织的合法权益造成损害</el-checkbox></div>
          <div><el-checkbox label="2-2" style="margin-left: 5px;" disabled>对公民、法人和其他组织的合法权益造成严重损害</el-checkbox></div>
          <div><el-checkbox label="3-2" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成损害</el-checkbox></div>
          <div><el-checkbox label="4-3" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成严重损害</el-checkbox></div>
          <div><el-checkbox label="5-3" style="margin-left: 5px;" disabled>对国家安全造成损害</el-checkbox></div>
          <div><el-checkbox label="6-4" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成特别严重损害</el-checkbox></div>
          <div><el-checkbox label="7-4" style="margin-left: 5px;" disabled>对国家安全造成严重损害</el-checkbox></div>
          <div><el-checkbox label="8-5" style="margin-left: 5px;" disabled>对国家安全造成特别严重损害</el-checkbox></div>
        </el-checkbox-group>
        </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="16">
        <div>系统服务等级：{{ configData.sys_service_level }}</div>
      <el-checkbox-group v-model="configData.sys_service_proect_level">
        <div><el-checkbox label="1-1" style="margin-left: 5px;" disabled>仅对公民、法人和其他组织的合法权益造成损害</el-checkbox></div>
        <div><el-checkbox label="2-2" style="margin-left: 5px;" disabled>对公民、法人和其他组织的合法权益造成严重损害</el-checkbox></div>
        <div><el-checkbox label="3-2" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成损害</el-checkbox></div>
        <div><el-checkbox label="4-3" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成严重损害</el-checkbox></div>
        <div><el-checkbox label="5-3" style="margin-left: 5px;" disabled>对国家安全造成损害</el-checkbox></div>
        <div><el-checkbox label="6-4" style="margin-left: 5px;" disabled>对社会秩序和公共利益造成特别严重损害</el-checkbox></div>
        <div><el-checkbox label="7-4" style="margin-left: 5px;" disabled>对国家安全造成严重损害</el-checkbox></div>
        <div><el-checkbox label="8-5" style="margin-left: 5px;" disabled>对国家安全造成特别严重损害</el-checkbox></div>
      </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>信息系统等级：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.info_sys_protec_level}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>定级时间：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.grading_time}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>专家评审：</div>
      </el-col>
      <el-col :span="16">
      <div v-if="systemDetail.expert_review =='1'">已评审</div>
      <div v-if="systemDetail.expert_review =='0'">未评审</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>是否有主管部门：</div>
      </el-col>
      <el-col :span="16">
      <div v-if="systemDetail.has_admin =='1'">是</div>
      <div v-if="systemDetail.has_admin =='0'">无</div>
      </el-col>
    </el-row>
    <el-row v-if="systemDetail.has_admin =='1'">
      <el-col :span="4">
        <div>主管部门名称：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.admin_name}}</div>
      </el-col>
    </el-row>
    <el-row v-if="systemDetail.has_admin =='1'">
      <el-col :span="4">
        <div>主管部门审批定级情况：</div>
      </el-col>
      <el-col :span="16">
      <div v-if="systemDetail.approval_info =='1'">已审批</div>
      <div v-if="systemDetail.approval_info =='0'">未审批</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>系统定级报告：</div>
      </el-col>
      <el-col :span="16">
      <div v-if="systemDetail.is_sub_system =='1'">有</div>
      <div v-if="systemDetail.is_sub_system =='0'">无</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>填单人：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.informant}}</div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20">
      <el-col :span="4">
        <div>填单日期：</div>
      </el-col>
      <el-col :span="16">
        <div>{{systemDetail.filling_time}}</div>
      </el-col>
    </el-row>
  </div>

  <div class="el-sub-panel">
    <div class="el-sub-panel-heading">
      <h4 class="sub-title">信息系统提交材料</h4>
    </div>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath1 != null &&systemDetail.attachment_filepath1 != ''">
      <el-col :span="10">
        <div>系统拓扑结构及说明：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename1}}</a>
        <a v-show="systemDetail.attachment_filepath1 != null " @click="downloadFile(systemDetail.attachment_filename1,systemDetail.attachment_filepath1)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath2 != null &&systemDetail.attachment_filepath2 != ''">
      <el-col :span="10">
        <div>系统安全组织机构及管理制度：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename2}}</a>
        <a v-show="systemDetail.attachment_filepath2 != null " @click="downloadFile(systemDetail.attachment_filename2,systemDetail.attachment_filepath2)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath3 != null &&systemDetail.attachment_filepath3 != ''">
      <el-col :span="10">
        <div>系统安全保护设施设计实施方案或改建实施方案：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename3}}</a>
        <a v-show="systemDetail.attachment_filepath3 != null " @click="downloadFile(systemDetail.attachment_filename3,systemDetail.attachment_filepath3)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath4 != null &&systemDetail.attachment_filepath4 != ''">
      <el-col :span="10">
        <div>系统使用的安全产品清单及认证、销售许可证明：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename4}}</a>
        <a v-show="systemDetail.attachment_filepath4 != null " @click="downloadFile(systemDetail.attachment_filename4,systemDetail.attachment_filepath4)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath5 != null &&systemDetail.attachment_filepath5 != ''">
      <el-col :span="10">
        <div>系统等级测评报告：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename5}}</a>
        <a v-show="systemDetail.attachment_filepath5 != null " @click="downloadFile(systemDetail.attachment_filename5,systemDetail.attachment_filepath5)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath6 != null &&systemDetail.attachment_filepath6 != ''" >
      <el-col :span="10">
        <div>专家评审情况：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename6}}</a>
        <a v-show="systemDetail.attachment_filepath6 != null " @click="downloadFile(systemDetail.attachment_filename6,systemDetail.attachment_filepath6)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    <el-row class="process-content" :gutter="20"  v-if="systemDetail.attachment_filepath7 != null &&systemDetail.attachment_filepath7 != ''">
      <el-col :span="10">
        <div>上级主管部门审批意见：</div>
      </el-col>
      <el-col :span="10">
        <div><a class="file m-r-18">{{systemDetail.attachment_filename7}}</a>
        <a v-show="systemDetail.attachment_filepath7 != null " @click="downloadFile(systemDetail.attachment_filename7,systemDetail.attachment_filepath7)" class="download m-r-18">下载</a>
      </div>
      </el-col>
    </el-row>
    </div>
  <!-- <div class="el-sub-panel">
    <el-form v-if="this.$route.params.handle == 'view' ">
      <el-form-item>
      <el-button type="gray" @click="goBack">返回</el-button>
    </el-form-item>
    </el-form>
  </div> -->
  </div>
</template>

<script>
export default {

  data() {
    return {
      illegal_actions: [],
      systemDetail: {},
      configData: {
        biz_level: "",
        biz_protect_level: [],
        sys_service_level: "",
        sys_service_proect_level: [],
        biz_max: 0,
        sys_service_max: 0,
      },
    }
  },
  props: ["tkey"],

  methods: {
    downloadFile(fileName,filePath){
      var params={};
      params.fileName=fileName;
      params.filePath=filePath;
      this.$store.dispatch('downloadFile', [params]);
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
  },
  watch: {},
  created: function() {
    var sys_id = this.$route.params.sys_id;
    var params = {};
    params.sys_id = sys_id;
    this.utils.req("/ssa/classifiedP/getSystemForm.do", params, this).then(data => {
      this.systemDetail = data;
      if (this.systemDetail.biz_protect_level != null && this.systemDetail.biz_protect_level != "") {
        this.configData.biz_protect_level = this.systemDetail.biz_protect_level.split(";");
      }
      if (this.systemDetail.biz_protect_level != null && this.systemDetail.biz_protect_level != "") {
        this.configData.sys_service_proect_level = this.systemDetail.sys_service_proect_level.split(";");
      }
      this.getLevel("biz_protect_level","biz_level","biz_max");
      this.getLevel("sys_service_proect_level","sys_service_level","sys_service_max");
    });
  }
}
</script>

<style>

</style>
