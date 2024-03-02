<script setup lang="ts">
import { LogoDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: LogoDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-logo']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
