<template>
  <el-dialog :title="infoConfig.title" :visible.sync="infoConfig.dialogTableVisible" width="85%" class="dialog-panel">
    <info :config = "infoConfig" ></info>
  </el-dialog>
</template>

<script>
import {
  mapState
} from 'vuex'
import info from "./Info.vue"
export default {
  components: {info},
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      infoConfig: state => state.infoDialog.infoConfig
    })
  },
  methods: {

  },
  created: function() {
  }
}
</script>

<style >
</style>
