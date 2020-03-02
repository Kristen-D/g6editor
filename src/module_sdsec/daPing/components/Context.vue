<!--普通与高级搜索按钮-->
<template>

  <div>
    <section>
      <div class="container-fluid">
        <OperationOverviewDetail></OperationOverviewDetail>
      </div>
    </section>
  </div>

</template>

<script>
    import OperationOverviewDetail from './OperationOverviewDetail.vue'

    export default {
        components: {
            OperationOverviewDetail,
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        created: async function () {
        }
    }
</script>

<style scoped>
</style>
