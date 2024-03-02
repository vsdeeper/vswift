<script setup lang="ts">
import { FormDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: FormDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-form']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
