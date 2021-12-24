import { CHINA_CODE } from './constant'
import regionData from './region-data'
import type { RegionCodeValue, SelectOption } from 'element-plus-region-select'

export function getRegionChildren(code: RegionCodeValue) {
  return regionData[code]
}

export function getProvinces() {
  return getRegionChildren(CHINA_CODE)
}

export const getCities = getRegionChildren

export const getAreas = getRegionChildren

function buildOptions(options: SelectOption[], parent: Record<string, string>, depth: number) {
  for (const key in parent) {
    if (Object.prototype.hasOwnProperty.call(parent, key)) {
      const value = parent[key]
      const item: SelectOption = { value: key, label: value }
      options.push(item)
      const children = regionData[key]
      if (children && depth) {
        item.children = []
        buildOptions(item.children, children, depth - 1)
      }
    }
  }
}

export function getRegionOptions(depth = 3) {
  const options: SelectOption[] = []
  buildOptions(options, getProvinces(), depth - 1)
  return options
}

export function getParentCode(code: RegionCodeValue) {
  if (!code) return undefined
  code = String(code).replaceAll('00', '')
  // 省份上级是中国
  if (code.length === 2) return CHINA_CODE
  return code.slice(0, -2).padEnd(6, '0')
}

export function transferToArray(code: RegionCodeValue) {
  const array: RegionCodeValue[] = [String(code)]
  let parent: RegionCodeValue | undefined = code
  do {
    parent = getParentCode(parent)
    if (!parent || parent === CHINA_CODE) break
    array.unshift(parent)
  } while (parent)
  return array
}

export function getRegionLabel(code: RegionCodeValue, full = false, spliter = '/') {
  if (!code) return ''
  const fullPath = transferToArray(code)
  const result = []
  for (const value of fullPath) {
    const parentCode = getParentCode(value)
    const parent = parentCode && regionData[parentCode]
    const label = parent && parent[value]
    result.push(label || value)
  }
  if (full) return result.join(spliter)
  return result[result.length - 1]
}
