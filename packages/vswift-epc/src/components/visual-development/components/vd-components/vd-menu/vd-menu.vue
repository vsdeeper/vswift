<script setup lang="ts">
import { MenuDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: MenuDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-menu']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
