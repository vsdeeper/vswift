<script setup lang="ts">
import { SearchDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: SearchDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-search']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
