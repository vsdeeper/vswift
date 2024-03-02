<script setup lang="ts">
import { MainDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: MainDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-main']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
