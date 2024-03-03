import { BaseDesignData, Method } from '@/components';
export interface MenuDesignDataOptions {
    mode?: 'horizontal' | 'vertical';
    router?: boolean;
    popperEffect?: 'dark' | 'light';
    apiMethod?: Extract<Method, 'GET'>;
    api?: string;
    apiParams?: Record<string, any>;
}
export type MenuDesignData = BaseDesignData<MenuDesignDataOptions>;
