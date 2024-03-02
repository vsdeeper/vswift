<script setup lang="ts">
import { TableDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: TableDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-table']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
