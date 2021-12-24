<template>
  <el-cascader-panel
    v-if="panel"
    v-model="value"
    :options="options"
    :filterable="$attrs.filterable !== false"
  />
  <el-cascader v-else v-model="value" :options="options" />
</template>

<script lang="ts">
import { computed, defineComponent, useAttrs } from 'vue'
import type { PropType } from 'vue'
import { CascaderOption, ElCascader, ElCascaderPanel } from 'element-plus'
import { EMIT_MODEL_VALUE_EVENT } from './constant'
import { getRegionOptions, transferToArray } from './utils'
import type { Value } from 'element-plus-region-select'
import 'element-plus/es/components/cascader/style/css.mjs'
import 'element-plus/es/components/cascader-panel/style/css.mjs'

export default defineComponent({
  name: 'RegionSelect',
  components: { ElCascader, ElCascaderPanel },
  props: {
    modelValue: { type: [Number, String, Array] as PropType<Value>, required: true },
    panel: Boolean,
    /**
     * 是否使用组件原始的数组值
     * 默认使用字符串作为结果
     */
    useArrayValue: Boolean,
    // 1-3: 省/市/区
    depth: {
      type: Number as PropType<1 | 2 | 3>,
      default: 3,
      values: [1, 2, 3],
      validator: (value: number) => {
        return [1, 2, 3].indexOf(value) !== -1
      },
    },
  },
  emits: [EMIT_MODEL_VALUE_EVENT],
  setup(props, { emit }) {
    const attrs: InstanceType<typeof ElCascader>['$props'] = useAttrs()
    const value = computed({
      get: () => {
        const { useArrayValue, modelValue } = props
        if (useArrayValue) return modelValue
        if (attrs.props?.multiple) {
          return (modelValue as string[]).map((val) => transferToArray(val))
        }
        return transferToArray(modelValue as string)
      },
      set: (val: Value) => {
        const { useArrayValue } = props
        if (useArrayValue) {
          emit(EMIT_MODEL_VALUE_EVENT, val)
          return
        }
        if (attrs.props?.multiple) {
          emit(
            EMIT_MODEL_VALUE_EVENT,
            (val as string[][]).map((val) => val[val.length - 1])
          )
          return
        }
        emit(EMIT_MODEL_VALUE_EVENT, (val as string[])[(val as string[]).length - 1])
      },
    })
    const options = computed(() => getRegionOptions(props.depth) as CascaderOption[])

    return {
      value,
      options,
    }
  },
})
</script>
