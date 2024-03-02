<script setup lang="ts">
import { SHORTCUT_KEYS_OPTIONS } from './constants';

const show = ref(false);

function open() {
  show.value = true;
}

defineExpose({
  open,
});
</script>

<template>
  <el-dialog title="快捷键" v-model="show">
    <template v-for="item in SHORTCUT_KEYS_OPTIONS" :key="item.des">
      <div class="key-note">
        <div v-for="key in item.keys" :key="key" class="key">{{ key }}</div>
        <div class="note">{{ item.des }}</div>
      </div>
      <el-divider></el-divider>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.key-note {
  display: flex;
  align-items: center;

  .key {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    line-height: 1;
    height: 22px;
    padding: 0 7px;
    border-radius: 4px;
    color: #fff;
    background-color: var(--el-color-primary);

    & + .key {
      margin-left: 2px;
    }
  }

  .note {
    margin-left: 15px;
    font-size: 14px;
  }
}
</style>
