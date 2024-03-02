<script setup lang="ts">
import { FooterDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: FooterDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-footer']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
