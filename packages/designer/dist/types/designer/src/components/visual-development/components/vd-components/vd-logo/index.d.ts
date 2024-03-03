import { BaseDesignData } from '@/components';
import { Component } from 'vue';
export interface LogoDesignDataOptions {
    name?: string;
    color?: string;
    height?: string;
    fontSize?: string;
    suffixIcon?: string | Component;
}
export type LogoDesignData = BaseDesignData<LogoDesignDataOptions>;
