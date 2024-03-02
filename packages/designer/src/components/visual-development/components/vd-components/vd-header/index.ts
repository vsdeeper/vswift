import { BaseDesignData } from 'designer/src/components'

export interface HeaderDesignDataOptions {
  height ?: string
  components?: BaseDesignData<HeaderDesignDataOptions>[]
}
export type HeaderDesignData = BaseDesignData<HeaderDesignDataOptions>