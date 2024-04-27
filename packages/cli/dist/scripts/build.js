import { $ } from 'execa';
import { consola } from 'consola';
import { remove } from 'fs-extra';
import path from 'path';
import { buildOnly, typeEmit, typeCheck } from './index.js';
export async function buildTask(options) {
    const { pkg } = options;
    if (!pkg) {
        consola.error('Requires pkg parameter, optional value: cli | components | utils');
        return;
    }
    try {
        switch (pkg) {
            case 'cli': {
                if (!(await typeCheck(options)))
                    return;
                await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`));
                await $({
                    stdio: 'inherit',
                }) `pnpm tsc --project tsconfig.cli.json`;
                break;
            }
            case 'components': {
                await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`));
                await $({
                    stdio: 'inherit',
                }) `pnpm --dir ${path.resolve(process.cwd(), `./packages/${pkg}`)} build`;
                break;
            }
            case 'utils': {
                await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`));
                if (!(await typeEmit(options)))
                    return;
                await buildOnly(options);
                break;
            }
            default: {
                throw new Error('Uknown pkg parameter');
            }
        }
    }
    catch (error) {
        consola.error(error);
    }
}
