import { BaseDesignData } from 'designer/src/components';

export interface ProjectDesignDataOptions {
  name?: string;
  git?: string;
  description?: string;
  components?: BaseDesignData<ProjectDesignDataOptions>[];
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>;
