<script setup lang="ts">
import { RouterViewDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: RouterViewDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-router-view']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
