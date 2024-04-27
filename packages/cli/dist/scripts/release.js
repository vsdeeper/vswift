import { $ } from 'execa';
import { consola } from 'consola';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
export async function release(options) {
    const { pkg } = options;
    if (!pkg)
        throw new Error('Requires pkg parameter, optional value: cli | components | utils');
    let releasePackageJson;
    try {
        if (pkg === 'utils') {
            releasePackageJson = toReleasePackageJson(pkg);
        }
        const cwd = process.cwd();
        const dir = path.resolve(cwd, `packages/${pkg}`);
        await $({ stdio: 'inherit' }) `pnpm --dir ${dir} release`;
        if (pkg === 'utils') {
            releasePackageJson?.revert();
        }
    }
    catch (error) {
        if (pkg === 'utils') {
            releasePackageJson?.revert();
        }
        consola.error(error);
    }
}
function toReleasePackageJson(pkgName) {
    try {
        const pkgPath = path.resolve(process.cwd(), `packages/${pkgName}/package.json`);
        const storePackage = readFileSync(pkgPath);
        const parsePackage = JSON.parse(readFileSync(pkgPath).toString());
        parsePackage.main = 'dist/index.umd.cjs';
        parsePackage.module = 'dist/index.js';
        parsePackage.types = 'dist/types/index.d.ts';
        writeFileSync(pkgPath, JSON.stringify(parsePackage, null, 2));
        return {
            revert: () => {
                writeFileSync(pkgPath, storePackage);
            },
        };
    }
    catch (error) {
        consola.error(error);
    }
}
