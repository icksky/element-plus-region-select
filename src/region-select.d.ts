declare module 'element-plus-region-select' {
  import RegionSelect from 'element-plus-region-select/src/region-select.vue'
  export default RegionSelect
  export interface SelectOption {
    label: string
    value: number | string
    children?: SelectOption[]
  }
  export type RegionCodeValue = string | number
  export type Value = RegionCodeValue | RegionCodeValue[] | RegionCodeValue[][] | null
  export function getProvinces(): Record<RegionCodeValue, string>
  export function getCities(code: RegionCodeValue): Record<RegionCodeValue, string> | undefined
  export function getAreas(code: RegionCodeValue): Record<RegionCodeValue, string> | undefined
  export function getRegionOptions(depth?: number): SelectOption[]
  export function getParentCode(code: RegionCodeValue): string | undefined
  export function transferToArray(code: RegionCodeValue): RegionCodeValue[]
  export function getRegionLabel(code: RegionCodeValue, full?: boolean, spliter?: string): string
}
