# element-plus-region-select

[element-plus](https://github.com/element-plus/element-plus) 的地区选择器.

地区数据来自 [china-area-data](https://github.com/airyland/china-area-data).

## 安装

```bash
yarn add element-plus-region-select
# or npm
# npm install element-plus-region-select
```

## 属性

除了 `ElCascader` 和 `ElCascaderPanel` 的全部属性/方法/事件外, 还支持以下属性:

| 属性 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| modelValue / v-model | string \| number \| array | - | 绑定值 |
| panel | boolean | - | 是否使用 `ElCascaderPanel` |
| useArrayValue | boolean | - | 默认 `modelValue` 返回最后一级的字符串结果, 为 `true` 时返回数组结果 |
| depth | 1 \| 2 \| 3 | 3 | 选择到哪一级, 分别为省/市/区 |

## 使用

```html
<!-- 省市区 -->
<region-select v-model="region" />
<!-- '130105' -->

<!-- 省市区, 返回数组结果 -->
<region-select v-model="region" use-array-value />
<!-- ['13000', '130100', '130105'] -->

<!-- 省市, 返回数组结果 -->
<region-select v-model="region" use-array-value :depth="2" />
<!-- ['13000', '130100'] -->
```
