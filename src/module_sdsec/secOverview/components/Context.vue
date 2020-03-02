<!--普通与高级搜索按钮-->
<template>

  <div>
    <section>
      <div class="container-fluid">
        <SecurityOverviewDetail></SecurityOverviewDetail>
      </div>
    </section>
  </div>

</template>

<script>
    import SecurityOverviewDetail from './SecurityOverviewDetail.vue'

    export default {
        components: {
            SecurityOverviewDetail,
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
