<script setup lang="ts">
import { RowColDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: RowColDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-row-col']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
