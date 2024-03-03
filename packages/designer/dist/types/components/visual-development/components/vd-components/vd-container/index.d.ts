import { BaseDesignData } from '@/components';
export interface ContainerDesignDataOptions {
    direction?: 'horizontal' | 'vertical';
    components?: BaseDesignData<ContainerDesignDataOptions>[];
}
export type ContainerDesignData = BaseDesignData<ContainerDesignDataOptions>;
