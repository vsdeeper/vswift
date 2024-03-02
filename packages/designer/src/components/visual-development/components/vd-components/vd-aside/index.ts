import { BaseDesignData } from 'designer/src/components'

export interface AsideDesignDataOptions {
  width ?: string
  components?: BaseDesignData<AsideDesignDataOptions>[]
}
export type AsideDesignData = BaseDesignData<AsideDesignDataOptions>