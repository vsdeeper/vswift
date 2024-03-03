import { BaseDesignData } from '@/components'

export interface HeaderDesignDataOptions {
  height ?: string
  components?: BaseDesignData<HeaderDesignDataOptions>[]
}
export type HeaderDesignData = BaseDesignData<HeaderDesignDataOptions>