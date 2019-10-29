<template>
  <big-screen-header
    title="被攻击网站排行">
    <div class="website-attack">
      <ul class="list">
        <li v-for="(website, i) in websites">
          <span class="square">{{i+1}}</span>
          <span class="">{{website.name}}</span>
          <span class="float-r">{{website.count}}</span>
        </li>
      </ul>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";

  export default {
    components: {BigScreenHeader},
    name: "website-attack",
    computed: {
      websites() {
        return this.$store.state.websites;
      }
    }
  }
</script>

<style scoped>

</style>
