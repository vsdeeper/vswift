import { BaseDesignData } from '@/components'

export interface AsideDesignDataOptions {
  width ?: string
  components?: BaseDesignData<AsideDesignDataOptions>[]
}
export type AsideDesignData = BaseDesignData<AsideDesignDataOptions>