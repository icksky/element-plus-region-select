declare module 'element-plus-region-select' {
  import RegionSelect from './region-select.vue'
  export default RegionSelect
  export interface SelectOption {
    label: string
    value: number | string
    children?: SelectOption[]
  }
  export type RegionCodeValue = string | number
  export type Value = RegionCodeValue | RegionCodeValue[] | RegionCodeValue[][]
  export function getProvinces(): Record<RegionCodeValue, string>
  export function getCities(code: RegionCodeValue): Record<RegionCodeValue, string> | undefined
  export function getAreas(code: RegionCodeValue): Record<RegionCodeValue, string> | undefined
  export function getRegionOptions(depth = 3): SelectOption[]
  export function getParentCode(code: RegionCodeValue): string | undefined
  export function transferToArray(code: RegionCodeValue): RegionCodeValue[]
  export function getRegionLabel(code: RegionCodeValue, full = false, spliter = '/'): string
}
