<template>
<div>
  <header class="top-head">
      <div class="logo"><span>威胁情报中心</span></div>
      <div class="search">
        <el-input placeholder="IP／域名／URL／漏洞名称" v-model="qryId">
          <i @click="qryAll" slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
       <nav>
            <el-menu @select="handleSelect" :default-active="activeIndex" class="el-menu-demo navigation" mode="horizontal"  background-color="#000" text-color="#afafaf">
              <el-menu-item index="blackHomePage.html">首页</el-menu-item>
              <el-submenu index="2">
                  <template slot="title">恶意IP</template>
                  <el-menu-item index="blackIp_sceneView.html">场景视图</el-menu-item>
                  <el-menu-item index="blackIp.html">数据视图</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">恶意Domain</template>
                <el-menu-item index="blackDomain_sceneView.html">场景视图</el-menu-item>
                <el-menu-item index="blackDomain.html">数据视图</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">恶意Url</template>
                <el-menu-item index="blackURL_sceneView.html">场景视图</el-menu-item>
                <el-menu-item index="blackURL.html">数据视图</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">漏洞</template>
                <el-menu-item index="blackVulnerability_sceneView.html">场景视图</el-menu-item>
                <el-menu-item index="blackVulnerability.html">数据视图</el-menu-item>
              </el-submenu>
           </el-menu>
        </nav>
    </header>
    <div class="line"><div class="line-line"></div><div class="line-bar"></div></div>

    <section >
        <div class="container-fluid">
          <div class="wrapper">
              <div class="dd2">
                  <iframe id="blackiframe" src="blackIp.html"></iframe>
              </div>
          </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      qryId:'',
      activeIndex:'blackHomePage.html',
    }
  },
  methods: {


    qryAll(){
      $.hash("type",this.qryId)
      this.toUrl("blackSearch.html")
    },
    handleSelect(key, keyPath) {
      this.toUrl(key);
    },
    toUrl(key) {
      var path = key;
      if (!path) return;
      if (path.match("[\?]"))
        path = path + "&";
      else
        path = path + "?";
      if($.hash("url") == path)
        this.toUrlByHash();
      else
        $.hash("url", path);

      //this.toUrlByHash()
    },
    toUrlByHash() {
      var url = $.hash("url");
      var _iframe = document.getElementById("blackiframe");
      Vue.nextTick(() => {
        if (url.match("[\?]"))
          url = url + "&";
        else
          url = url + "?";
        url = url + "random_date=" + new Date().getTime();
        _iframe.contentWindow.location.replace(url);
      })
    },
    changeIndex(path){
      if(path.indexOf("?")==-1){this.activeIndex=path}else {
        this.activeIndex=path.substr(0,path.indexOf("?"))
      }
    },


  },

  mounted: function() {
      var url = $.hash("url");
      if(url)  this.toUrl(url);
      else this.toUrl("blackHomePage.html");
      var vm = this;
			window.onhashchange=function(){
					vm.toUrlByHash();
			 }
       this.changeIndex($.hash("url"))
       window.qryall=function(){
         return  $.hash("type");
       }
  }


}
</script>
<style type="text/css">
.dd1 {
  height: 200px;
  width: 200px;
  border: 1px solid;
}

.wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 20px;
  padding-top: 50px;
}

.dd2 {
  height: 100%;
}

iframe {
  height: 100%;
  width: 100%;
}

* {
  border: 0;
  margin: 0;
  padding: 0
}
</style>
