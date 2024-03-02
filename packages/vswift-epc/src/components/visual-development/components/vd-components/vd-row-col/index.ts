import { BaseDesignData } from '@/components'

export interface RowColDesignDataOptions {
  rowGutter?: number
  rowJustify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  rowAlign?: 'top' | 'middle' | 'bottom'
  inline?: boolean
  colSpan?: number
  colXs?: number
  colSm?: number
  colMd?: number
  colLg?: number
  colXl?: number
  components?: BaseDesignData<RowColDesignDataOptions>[]
}
export type RowColDesignData = BaseDesignData<RowColDesignDataOptions>