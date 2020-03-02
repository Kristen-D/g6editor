<template>
  <div>
    <el-tabs v-model="activeName" class="noBottom">
      <el-tab-pane v-for="(item, index) in sceneData" :key="index" :name="item.value">
        <div slot="label">
          <label>{{item.name}}</label>
          <el-tooltip class="item tippppppp" effect="dark" :content="index===0?item.name:'系统预设的场景模板'" placement="bottom-start">
            <span class="el-icon-info icon"></span>
          </el-tooltip>
        </div>
        <div class="add-scene" v-if="item.value==='0'&&item.list.length<1">
          <img src="/static/static_web/images/add-scene.png" alt="添加场景">
          <p class="add-scene-label">
            <a @click="$emit('openSceneGuide')" style="cursor: pointer;">使用模版</a>
            <span class="ver-line">|</span>
            <a href="/dataflow/begin.do#model">添加空白</a>
          </p>
        </div>
        <SceneTabsContent :contentData="item" :src="item.remark"></SceneTabsContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SceneTabsContent from "./SceneTabs-Content.vue"
export default {
  components: {
    SceneTabsContent,
  },
  props: ['sceneData'],
  data() {
    return {
      activeName: '0',

    };
  },
  methods: {
  }
};
</script>
<style scoped>
.icon {
  margin-left: 6px;
  color: #c7d7e0;
}
.icon:hover {
  color: #a9b7bf;
}
.ver-line {
  color: #e1e3e4;
  font-weight: bold;
  font-size: 1.2em;
  margin: auto 8px;
}
.add-scene {
  text-align: center;
  margin-top: 4%;
}
.add-scene-label {
  margin-top: 10px;
  color: #007be8;
  font-size: 12px;
  font-weight: 600;
}
.add-scene-label a:hover {
  text-decoration: underline;
}
</style>
