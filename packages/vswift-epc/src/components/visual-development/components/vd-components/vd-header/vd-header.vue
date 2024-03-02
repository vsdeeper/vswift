<script setup lang="ts">
import { HeaderDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: HeaderDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-header']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
