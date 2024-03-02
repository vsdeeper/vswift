import { BaseDesignData } from 'designer/src/components'

export interface ContainerDesignDataOptions {
  direction?: 'horizontal' | 'vertical'
  components?: BaseDesignData<ContainerDesignDataOptions>[]
}
export type ContainerDesignData = BaseDesignData<ContainerDesignDataOptions>