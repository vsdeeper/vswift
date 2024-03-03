import { BaseDesignData } from '@/components';

export interface ProjectDesignDataOptions {
  name?: string;
  git?: string;
  description?: string;
  components?: BaseDesignData<ProjectDesignDataOptions>[];
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>;
