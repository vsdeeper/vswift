import { BaseDesignData } from 'designer/src/components'

export interface MainDesignDataOptions {
  components?: BaseDesignData<MainDesignDataOptions>[]
}
export type MainDesignData = BaseDesignData<MainDesignDataOptions>