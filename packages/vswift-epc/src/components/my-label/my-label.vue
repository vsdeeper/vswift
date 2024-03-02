<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue';

withDefaults(
  defineProps<{
    label: string;
    tooltipEffect?: 'dark' | 'light';
    tooltipPlacement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end';
    tooltipIcon?: any;
    tooltipContent?: string;
  }>(),
  {
    tooltipPlacement: 'top',
    tooltipIcon: () => InfoFilled,
  },
);

const emit = defineEmits<{
  (e: 'click-tooltip-icon'): void;
}>();
</script>

<template>
  <div class="my-label">
    {{ label }}
    <el-tooltip v-if="tooltipContent" :effect="tooltipEffect" :placement="tooltipPlacement">
      <template #content>{{ tooltipContent }}</template>
      <el-icon>
        <component :is="tooltipIcon"></component>
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.my-label {
  display: inline-flex;
  align-items: center;
  .el-icon {
    margin-left: 3px;
  }
}
</style>
