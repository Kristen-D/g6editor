<template>
  <div ref="preview" class="json-preview">

  </div>
</template>

<script>
  import axios from 'axios';
  import TwaverNode from '../common/TwaverNode';
  import TwaverHandle from '../common/TwaverHandle';

  let handle;
  
  export default {
    async mounted () {
      let id = this.$route.query.id;
      handle = new TwaverHandle();
      this.$refs.preview.appendChild(handle.network.getView());
      handle.network.adjustBounds({x: 0, y: 0, width: 1440, height: 780});
      // handle.network.setZoom(0.5);
      // 图标初始化
      axios.get('/ssa/topology/image/list.do', {params: {topologyId: id, t: Date.now()}}).then((result) => {
        if (result.data.data && result.data.data.length > 0) {
          TwaverNode.registerImages(result.data.data, id).then(() => {
            handle.network.invalidateElementUIs();
          });
        }
      });
      // 拓扑数据结构
      const infoRes = await axios.get('/ssa/topology/info.do', {params: {id: id, t: Date.now()}});
      let info = infoRes.data.data;
      if (info && info.json) {
        new twaver.JsonSerializer(handle.box).deserialize(info.json);
        
        const groupRes = await axios.get('/ssa/topology/servicer/list.do', {params: {topologyId: id, t: Date.now()}})
        let groups = groupRes.data.data;
        console.log(groups)
        groups.map(async group => {
          if (group.domain) {
            const domainRes = await axios.get('/ssa/topology/domain/list.do', {params: {domain: group.domain, t: Date.now()}})

            handle.createDomain(group, domainRes.data.data);
          }
        })
      } else {
        alert('没有数据');
      }

      handle.handleNodeClick();

      if (this.$route.query.alarmId) {
        let refAssetRes = await axios.get('/ssa/topology/alarm/ref.do', {params: {id: this.$route.query.alarmId}})
        let refAsset = refAssetRes.data.data;
        handle.setNewAlarmCount(refAsset.srcAssetId);
        handle.setNewAlarmCount(refAsset.dstAssetId);
        handle.setRefs(refAsset.ref, refAsset.srcAssetId, refAsset.dstAssetId);
      }

    }
  }
</script>

