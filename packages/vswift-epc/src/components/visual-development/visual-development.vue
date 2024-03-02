<script setup lang="ts">
import draggable from 'vuedraggable';
import { useGlobal } from '@/stores';
import { ActiveDesignData, DesignComponent, VdComponents, MergeDesignData, BaseDesignData } from '.';
import { AddComponent, AddComponentOptionItem, ShortcutKeyDescription } from '@/components';
import { IS_PAGE_DESIGN_MODE_SYMBOL, ADD_COMPONENT_REF_SYMBOL, DESIGN_COMPONENT_REF_SYMBOL } from '@/utils/constants';
import { deleteComponent, genId, isActiveDesign, isContainerComponent } from './util';
import { ADD_COMPONENT_OPTIONS } from './constants';
import { RowColDesignData, ShortcutKeyOperation } from './components';
import { nanoid } from 'nanoid';

export type AddComponentInstance = InstanceType<typeof AddComponent>;
export type DesignComponentInstance = InstanceType<typeof DesignComponent>;
export type ListOfShortcutKeysInstance = InstanceType<typeof ShortcutKeyDescription>;

console.log('VdComponents 可视化设计组件', VdComponents);

const { designData, setDesignData, setActiveDesignData, setDialogFullscreen } = useGlobal();
const addComponentRef = ref<AddComponentInstance>();
const designComponentRef = ref<DesignComponentInstance>();
const listOfShortcutKeysRef = ref<ListOfShortcutKeysInstance>();
const keyCodes = ref('');

// provide
provide(IS_PAGE_DESIGN_MODE_SYMBOL, ref(true));
provide(ADD_COMPONENT_REF_SYMBOL, addComponentRef);
provide(DESIGN_COMPONENT_REF_SYMBOL, designComponentRef);

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(e: KeyboardEvent) {
  const { designData, activeDesignData } = useGlobal();
  keyCodes.value += e.key.toUpperCase();
  if (keyCodes.value.includes('VA')) {
    // V+A 键，添加组件
    if (!activeDesignData || isContainerComponent(activeDesignData.type)) {
      // 当前不存在设计中的组件或当前设计组件是布局容器类组件，进行添加组件操作
      addComponentRef.value?.open();
      keyCodes.value = '';
    }
  } else if (keyCodes.value.includes('VD')) {
    if (!activeDesignData) return;
    // V+D 键，设计组件
    designComponentRef.value?.open();
    keyCodes.value = '';
    setDialogFullscreen(activeDesignData.type === 'Form');
  } else if (keyCodes.value.includes('DELETE')) {
    // Delete 键，删除组件
    deleteComponent(activeDesignData as ActiveDesignData, designData);
    keyCodes.value = '';
  }
}

function selectComponent(item: AddComponentOptionItem) {
  const data = createDesignData(item);
  const { activeDesignData } = useGlobal();
  if (!activeDesignData) {
    /**
     * 当前不存在设计中的组件，说明是初始设计
     * 此时需要设置最外层的设计数据
     */
    setDesignData(data);
    setActiveDesignData(data);
  } else {
    /**
     * 当前存在设计中的组件
     * 此时只需要设置活动组件的设计数据
     */
    if (isContainerComponent(activeDesignData.type)) {
      /**
       * 布局容器，可以挂载子组件
       * 子组件挂载后将活动设计数据设置为子组件
       */
      !activeDesignData.options!.components && (activeDesignData.options!.components = []);
      activeDesignData.options!.components!.push(data);
      setActiveDesignData(data);
    }
  }
}

/**
 * 创建初始设计数据
 */
function createDesignData(item: AddComponentOptionItem): ActiveDesignData {
  switch (item.value) {
    case 'Project': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          name: 'my-project',
        },
      } as BaseDesignData;
    }
    case 'RowCol': {
      return {
        id: genId(`${item.value}row`),
        type: item.value,
        label: item.label,
        options: {
          rowGutter: 0,
          rowJustify: 'start',
          components: [
            {
              id: genId(`${item.value}col`),
              type: item.value,
              label: item.label,
              options: {
                components: [],
                colSpan: 24,
              },
            },
          ],
        },
      } as RowColDesignData;
    }
    case 'Menu': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          apiMethod: 'GET',
          mode: 'vertical',
          router: false,
          popperEffect: 'dark',
          method: 'GET',
        },
      };
    }
    case 'Search': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          apiMethod: 'GET',
          searchConditionItems: [{ id: nanoid(5) }],
        },
      };
    }
    case 'Table': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          apiMethod: 'GET',
          tableLayout: 'fixed',
          showCheckbox: false,
          showPagination: true,
          highlightCurrentRow: true,
          autoCalcMaxHeight: true,
          flexible: false,
          virtualized: false,
          itemChildren: 'children',
          itemHasChildren: 'hasChildren',
          tableColumnItems: [{ id: nanoid(5) }],
        },
      };
    }
    default: {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: isContainerComponent(item.value) ? { components: [] } : {},
      } as BaseDesignData;
    }
  }
}

function showMoreShortcutKey() {
  listOfShortcutKeysRef.value?.open();
}
</script>

<template>
  <div
    id="visual-development"
    :class="{
      'has-design-content': designData.length,
      active: !designData.length || !useGlobal().activeDesignData,
    }"
  >
    <div class="version">Visual Development 1.0.0</div>
    <el-scrollbar>
      <draggable
        class="transition-group-in-visual-development"
        :list="designData"
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
          <div class="group-item">
            <component
              :key="item.name"
              :is="VdComponents[(item as MergeDesignData).type]"
              :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
              :data="item"
            ></component>
          </div>
        </template>
      </draggable>
    </el-scrollbar>
    <ShortcutKeyOperation
      :options="designData.length ? [{ keys: ['V', 'A'] }] : [{ label: '添加组件', keys: ['V', 'A'] }]"
      show-more
      used-in-root-component
      @show-more="showMoreShortcutKey"
    />
  </div>
  <AddComponent ref="addComponentRef" :options="ADD_COMPONENT_OPTIONS" @select="selectComponent"></AddComponent>
  <DesignComponent
    ref="designComponentRef"
    :form-data="useGlobal().activeDesignData as ActiveDesignData"
    :fullscreen="useGlobal().dialogFullscreen"
  ></DesignComponent>
  <ShortcutKeyDescription ref="listOfShortcutKeysRef"></ShortcutKeyDescription>
</template>

<style lang="scss" scoped>
#visual-development {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px 0;
  overflow: hidden;
  box-sizing: border-box;

  .version {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-100% - 40px));
    font-size: 11px;
    font-weight: bold;
    color: var(--el-color-primary);
  }

  .transition-group-in-visual-development {
    padding: 0 10px;

    & > .design-skeleton {
      margin: 0;
    }
  }

  &.active {
    & > .shortcut-key-operation {
      :deep(.label) {
        color: var(--el-color-primary);
      }

      :deep(.key) {
        background-color: var(--el-color-primary);
      }
    }
  }

  &.has-design-content {
    .version {
      position: fixed;
      left: unset;
      left: 10px;
      top: unset;
      top: 7px;
      color: var(--el-text-color-secondary);
      transform: unset;
    }

    & > .shortcut-key-operation {
      position: fixed;
      left: unset;
      right: 5px;
      top: unset;
      bottom: 0;
      transform: unset;

      :deep(.label) {
        font-size: 12px;
      }

      :deep(.key) {
        font-size: 10px;
        height: 18px;
        padding: 0 6px;
      }
    }
  }

  & > .shortcut-key-operation {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);

    :deep(.label) {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-placeholder);
    }

    :deep(.key) {
      font-size: 11px;
      height: 22px;
      padding: 0 8px;
      background-color: var(--el-text-color-placeholder);
    }
  }

  .vd-container {
    &.active {
      border: 5px solid var(--el-color-primary);
    }
  }
}
</style>

<style lang="scss">
.el-dialog.is-fullscreen {
  .el-dialog__body {
    height: calc(100vh - 54px);
    box-sizing: border-box;
    & > .design-component {
      height: 100%;
      & > .el-form {
        height: 100%;
        & > .el-container {
          height: 100%;
        }
      }
    }
  }
}
</style>
