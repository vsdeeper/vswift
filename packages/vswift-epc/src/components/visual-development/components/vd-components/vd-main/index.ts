import { BaseDesignData } from '@/components'

export interface MainDesignDataOptions {
  components?: BaseDesignData<MainDesignDataOptions>[]
}
export type MainDesignData = BaseDesignData<MainDesignDataOptions>