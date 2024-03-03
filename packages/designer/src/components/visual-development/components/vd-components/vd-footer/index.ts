import { BaseDesignData } from '@/components'

export interface FooterDesignDataOptions {
  height ?: string
  components?: BaseDesignData<FooterDesignDataOptions>[]
}
export type FooterDesignData = BaseDesignData<FooterDesignDataOptions>