<template>
  <div>
    <!--    <div class="el-panel-heading flexBetween">-->
    <!--    </div>-->
    <!--    <el-container>-->
    <!--      <el-header>您好，祝您开心每一天</el-header>-->
    <!--      <el-main>Main</el-main>-->
    <!--    </el-container>-->
    <div>
      <el-row :gutter="20">
        <el-col span="3" style="font-size: 30px">
          <img align="center"

               style="width: 100px; height: 100px; margin: 20px"
               src="/../static/img/secOverview/user.png"
               class="image"
          >
        </el-col>
        <el-col span="9" style="font-size: 30px">
          <el-row style=" margin: 20px">您好, 祝您开心每一天！</el-row>
          <div></div>
          <div></div>
          <el-row :span="10" style="font-size: 20px; color: #6c6b6c; margin: 20px"> 亚信云安全管理平台，灵活自如的为您提供一站式安全服务保障
          </el-row>
        </el-col>

        <div>
          <el-col span="12">
            <el-col :span="5" style="font-size: 20px; color: #6c6b6c ; margin: 20px" align="center">
              已购安全服务数量
              <div align="center" style=" margin: 20px; font-weight:700">56</div>
            </el-col>
            <el-divider></el-divider>
            <el-col :span="5" style="font-size: 20px; color: #6c6b6c ; margin: 20px" align="center">
              有效安全服务数量
              <div align="center" style=" margin: 20px; font-weight:700">8/56</div>
            </el-col>
            <el-divider></el-divider>
            <el-col :span="5" style="font-size: 20px; color: #6c6b6c ; margin: 20px" align="center">
              有效服务链数量
              <div align="center" style=" margin: 20px; font-weight:700">5/9</div>
            </el-col>
          </el-col>
        </div>
      </el-row>
    </div>


    <div class="el-panel"></div>

    <el-row style="font-size: 20px;" class="el-panel-title">已购安全服务
      <i style="font-size: 10px;">（统计每个已购买的安全服务数量及安全当前正在使用的安全服务数量）</i>
<!--      <el-button style="float: right; padding: 0 15px;" type="text"><i class="fa fa-bars" aria-hidden="true"></i>全部项目-->
<!--      </el-button>-->
    </el-row>
    <div>
      <el-row style="font-size: 24px;">
        <el-col span="4" style="margin-left: 4%">
          <img
            style="width:50%; height: 50%; margin: 20px; text-align:center"
            src="/../static/img/secOverview/fanghuoqiang.png"
            class="image"
          >
          <div style="width:50%;font-size: 13px; color: #6c6b6c ;margin: 20px;" align="center">下一代防护墙服务</div>
          <div style="width:50%;font-size: 15px; color: #6c6b6c ;margin: 20px;" align="center">1/1</div>
        </el-col>

        <el-col span="4">
          <img align="center"
               style="width:50%; height: 50%; margin: 20px; text-align:center"
               src="/../static/img//secOverview/vpnwangguan.png"
               class="image"
          >
          <div style="width:50%;font-size: 13px; color: #6c6b6c ; margin: 20px" align="center">Web应用防火墙服务</div>
          <div style="width:50%;font-size: 15px; color: #6c6b6c ; margin: 20px" align="center">1/2</div>
        </el-col>

        <el-col span="4">
          <img align="center"
               style="width:50%; height: 50%; margin: 20px; text-align:center"
               src="/../static/img/secOverview/webxWeb@2x.png"
               class="image"
          >
          <div :span="5" style="width:50%;font-size: 13px; color: #6c6b6c ; margin: 20px" align="center">入侵防护服务</div>
          <div :span="5" style="width:50%;font-size: 15px; color: #6c6b6c ; margin: 20px" align="center">1/1</div>
        </el-col>

        <el-col span="4" >
          <img align="center"
               style="width:50%; height: 50%; margin: 20px; text-align:center"
               src="/../static/img/secOverview/quyuruqin.png"
               class="image"
          >
          <div style="width:50%;font-size: 13px; color: #6c6b6c ; margin: 20px" align="center">防病毒网关</div>
          <div style="width:50%;font-size: 15px; color: #6c6b6c ; margin: 20px" align="center">1/4</div>
        </el-col>

        <el-col span="4">
          <img align="center"
               style="width:50%; height: 50%; margin: 20px; text-align:center"
               src="/../static/img/secOverview/zhujianquan.png"
               class="image"
          >
          <div style="width:50%;font-size: 13px; color: #6c6b6c ; margin: 20px" align="center">主机安全防护</div>
          <div style="width:50%;font-size: 15px; color: #6c6b6c ; margin: 20px" align="center">1/1</div>
        </el-col>
      </el-row>
    </div>

    <div class="el-panel"></div>

    <el-row style="font-size: 20px;" class="el-panel-title">
      <el-col span="8">账户余额概览
        <el-row style="font-size: 24px;">
          <div style="margin-left: 5%;width:90%">
            <el-row style="font-size: 20px;" class="el-panel-title">
              <el-card style="margin-left: 5%;width:90%;margin-top: 25px" class = "xxx">
                <div class="note" :style="note"></div>
                <div>
                  <el-col span="12">
                    <h3 style="color: #afafaf">当前可用余额</h3>
                    <span
                      style="color: black;font-size:35px; display: block; text-align:center; margin-top: 25px">500</span>
                  </el-col>

                  <el-divider></el-divider>

                  <el-card span="12" class="aaa">
                    <el-row style="margin-left: 5%;width:90% ; text-align:center; margin-top: 25px">现金：490</el-row>
                    <el-divider></el-divider>
                    <el-row style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">赠送金：10</el-row>
                  </el-card>
                  <el-button style="float: right; padding: 10px 50%; text-align:center;margin-top: 25px" type="text">充值
                  </el-button>
                </div>
              </el-card>
            </el-row>
          </div>
        </el-row>
      </el-col>

      <el-col span="8">帮助文档
        <div style="margin-top: 25px">
          <i class="fa fa-book" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">运营手册</span>
        </div>

        <div style="margin-top: 25px">
          <i class="fa fa-files-o" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">租户侧用户手册</span>
        </div>

        <div style="margin-top: 25px">
          <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">产品主打PPT</span>
        </div>

        <div style="margin-top: 25px">
          <i class="fa fa-check-square" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">平台运营流程规范</span>
        </div>
      </el-col>

      <el-col span="8">消息中心
        <el-button style="float: right; padding: 0 15px;" type="text"><i class="fa fa-bars" aria-hidden="true"></i>全部消息
        </el-button>
        <div style="margin-top: 25px">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">SQL注入漏洞</span>
          <div style="font-size: 10px;color: #afafaf">检测到SQL注入攻击，被攻击对象IP为192.198.33.215的MariaDB的3306端口...</div>
        </div>

        <div style="margin-top: 25px">
          <i class="fa fa-files-o" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">版本升级通知</span>
          <div style="font-size: 10px;color: #afafaf">系统升级通知2020/2/4，尊敬的用户金浩没关于本平台V1.0.2的根棍升级通知</div>
        </div>

        <div style="margin-top: 25px">
          <i class="fa fa-bars" aria-hidden="true"></i>
          <span style="margin-left: 5%;width:90%; text-align:center;margin-top: 25px">版本维护预告</span>
          <div style="font-size: 10px;color: #afafaf">为了给您提供更好的平台操作体验，SDSec平台将在3月15日进行版本更新维护，维护完成后...</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style scoped>
  .xxx{
    background-image: url("/../static/img/secOverview/background.png");
  }
  .aaa{
    background-image: url("/../static/img/secOverview/yuedise.png");
  }
</style>
