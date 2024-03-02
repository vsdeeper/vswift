import { BaseDesignData } from 'designer/src/components'

export interface ViewDesignDataOptions {
  name?: string
  components?: BaseDesignData<ViewDesignDataOptions>[]
}
export type ViewDesignData = BaseDesignData<ViewDesignDataOptions>