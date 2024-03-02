<script setup lang="ts">
import draggable from 'vuedraggable';
import { MergeDesignData, ShortcutKeyOperation, VdComponents } from '../..';
import { ShortcutKeyOptionItem } from '@/components';
import { isActiveDesign, isRowComponent, findIndexColInRow } from '../../util';
import { useGlobal } from '@/stores';
import RowCol from './components/row-col.vue';
import { genStyle } from './util';

defineProps<{
  data: MergeDesignData;
  classList?: unknown[];
  isActive?: boolean;
  shortcutKeyOptions: ShortcutKeyOptionItem[];
}>();

const skeletonRef = ref<HTMLDivElement>();

function mergeClass(classList?: unknown[], myClassList?: unknown[]) {
  let _class = [];
  if (classList) _class.push(classList);
  if (myClassList) _class.push(myClassList);
  return _class;
}

function toLabel(data: MergeDesignData) {
  if (data.type === 'Project') {
    return `${data.label} / ${data.options.name ?? ''}`;
  } else if (data.type === 'RowCol') {
    if (isRowComponent(data)) return `${data.label}-Row`;
    else {
      const { designData } = useGlobal();
      const findIndex = findIndexColInRow(data, designData);
      return `${data.label}-Col-${findIndex! + 1}`;
    }
  }
  return `${data.label}-${data.type}`;
}

function mouseoverSkeleton(e: MouseEvent) {
  e.stopPropagation();
  skeletonRef.value?.classList.add('hover');
}

function mouseoutSkeleton(e: MouseEvent) {
  e.stopPropagation();
  skeletonRef.value?.classList.remove('hover');
}
</script>

<template>
  <div
    ref="skeletonRef"
    class="design-skeleton"
    :class="mergeClass(classList, [{ 'is-active': isActive }])"
    @mouseover="mouseoverSkeleton"
    @mouseout="mouseoutSkeleton"
  >
    <div class="header">
      <label>{{ toLabel(data) }}</label>
    </div>
    <div class="main">
      <RowCol v-if="data.type === 'RowCol'" :data="data" :is-active="isActive"></RowCol>
      <draggable
        v-else
        :list="data.options?.components"
        :component-data="{
          type: 'transition-group',
        }"
        v-bind="{
          animation: 300,
          group: 'design-skeleton-draggable',
        }"
        item-key="id"
      >
        <template #item="{ element: item }">
          <div class="group-item" :style="genStyle(item)">
            <component
              :is="VdComponents[(item as MergeDesignData).type]"
              :data="item"
              :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
            ></component>
          </div>
        </template>
      </draggable>
    </div>
    <div class="footer">
      <ShortcutKeyOperation :options="shortcutKeyOptions" :data="data"></ShortcutKeyOperation>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  font-size: 10px;
  color: var(--el-text-color-secondary);
}

.design-skeleton {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  min-width: 200px;
  box-sizing: border-box;
  justify-content: space-between;
  border-width: 2px;
  border-style: solid;
  border-color: var(--el-text-color-placeholder);
  background-color: #fff;
  transition: border-color 0.2s ease-in-out 0s;

  &.hover {
    border-color: var(--el-color-warning);
  }

  .header {
    line-height: 1;

    label {
      font-size: 10px;
      margin-left: 5px;
      color: var(--el-text-color-secondary);
    }
  }

  .main {
    display: flex;
    flex: 1;
    overflow: auto;
    padding: 5px;

    .group-item {
      margin: 5px;
    }

    :deep(div[type='transition-group']) {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-height: 30px;

      :deep(.group-item) {
        display: inline-flex;
        flex: 1;
      }
    }

    :deep(.el-row) {
      flex: 1;
      margin: 0 !important;
      &.is-justify-space-between > div[type='transition-group'] {
        justify-content: space-between;
      }
      &.is-justify-end > div[type='transition-group'] {
        justify-content: flex-end;
      }
      &.is-justify-center > div[type='transition-group'] {
        justify-content: center;
      }
      &.is-justify-space-around > div[type='transition-group'] {
        justify-content: space-around;
      }
      &.is-justify-space-evenly > div[type='transition-group'] {
        justify-content: space-evenly;
      }
      & > div[type='transition-group'] {
        display: flex;
        flex-wrap: wrap;
        flex-direction: unset;
        flex: 1;

        .el-col {
          &.col-inline {
            max-width: unset;
            flex: unset;
          }
          & > .vd-row-col {
            border-style: dotted;
          }
        }
      }
    }
  }

  .footer {
    line-height: 1;
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-scrollbar__view) {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &.is-vertical {
    :deep {
      & > .header + .main > div[type='transition-group'] {
        flex-direction: column;
      }
    }
  }

  &.is-horizontal {
    :deep {
      & > .header + .main > div[type='transition-group'] {
        flex-direction: row;
      }
    }
  }

  &.vd-project {
    border-width: 3px;
    border-style: dashed;
  }

  &.vd-container,
  &.vd-aside,
  &.vd-header,
  &.vd-footer,
  &.vd-main {
    border-width: 4px;
  }

  &.vd-router-view,
  &.vd-view,
  &.vd-row-col {
    border-width: 3px;
  }

  &.is-active {
    border-color: var(--el-color-primary);

    & > .header label {
      color: var(--el-color-primary);
    }

    & > :deep(.footer .shortcut-key-operation .label) {
      color: var(--el-color-primary);
    }

    & > :deep(.footer .shortcut-key-operation .key) {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
