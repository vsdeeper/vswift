import { BaseDesignData } from '@/components'

export interface ViewDesignDataOptions {
  name?: string
  components?: BaseDesignData<ViewDesignDataOptions>[]
}
export type ViewDesignData = BaseDesignData<ViewDesignDataOptions>