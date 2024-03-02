<script setup lang="ts">
import { ContainerDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants';

defineProps<{
  data: ContainerDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="[
      'vd-container',
      {
        'is-vertical': data.options?.direction === 'vertical',
        'is-horizontal': data.options?.direction === 'horizontal',
      },
    ]"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT"
  >
  </DesignSkeleton>
</template>
