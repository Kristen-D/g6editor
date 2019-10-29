<template>
  <div>
    <template v-if="type ==='boolean'">
      <el-select :disabled="readonly" :size="size || 'medium'" v-model="current" placeholder="请选择">
        <el-option key="0" label="true" value="true"></el-option>
        <el-option key="1" label="false" value="false"></el-option>
      </el-select>
    </template>
    <template v-else-if="type === 'number'">
      <el-input-number  :disabled="readonly" :size="size || 'medium'" v-model="current"></el-input-number>
    </template>
    <template v-else-if="type === 'password'">
      <el-input :readonly="readonly" type="password" :size="size || 'medium'" v-model="current"></el-input>
    </template>
    <template v-else-if="type === 'sql'">
      <el-input :readonly="readonly" :autofocus="{minRows: 2}" type="textarea" :size="size || 'medium'" v-model="current"></el-input>
    </template>
    <template v-else-if="type === 'readonly'">
      <el-input readonly :size="size || 'medium'" v-model="current"></el-input>
    </template>
    <template v-else>
      <el-input :readonly="readonly" :size="size || 'medium'" v-model="current"></el-input>
    </template>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['type', 'parent', 'size', 'readonly'],
  data() {
    return {
      current: this.parent
    }
  },
  watch: {
    current() {
      this.$emit('input', this.current);
    },
    parent() {
      this.current = this.parent
    }
  }
}
</script>
