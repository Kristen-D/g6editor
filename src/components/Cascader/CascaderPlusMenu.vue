<template>
  <div class="el-cascader-menus" ref="popper" style="z-index:9999">

  <ul class="el-cascader-menu" v-for="lv in showMenuData" >
    <li class="el-cascader-menu__item "
    :class="[
    item.hasChild?'el-cascader-menu__item--extensible':'',
    item.isActive?'is-active':''
    ]"
    @click="handleMenItem(item,'click')" @mouseover ="handleMenItem(item,'hover')" v-for="item in lv">{{item[labelKey]}}</li>
  </ul>
</div>
</template>

<script type="text/babel">
  export default {
    name: 'ElSelectDropdown',

    componentName: 'ElSelectDropdown',

    props:["showMenuData","labelKey"],

    data() {
      return {
        minWidth: ''
      };
    },
    methods:{
      handleMenItem(item,type){
        this.$parent.handleMenItem(item,type);
      },

    },
    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;

    }
  };
</script>
