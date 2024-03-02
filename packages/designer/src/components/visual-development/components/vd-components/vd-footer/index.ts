import { BaseDesignData } from 'designer/src/components'

export interface FooterDesignDataOptions {
  height ?: string
  components?: BaseDesignData<FooterDesignDataOptions>[]
}
export type FooterDesignData = BaseDesignData<FooterDesignDataOptions>