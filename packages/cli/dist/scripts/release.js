import { $ } from 'execa';
import { consola } from 'consola';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import prettier from 'prettier';
import { globSync } from 'glob';
import { camel } from 'radash';
export async function release(options) {
    const { pkg } = options;
    if (!pkg)
        throw new Error('Requires pkg parameter, optional value: cli | components | utils');
    let releasePackageJson;
    try {
        if (pkg === 'utils') {
            releasePackageJson = toReleasePackageJson(pkg);
        }
        if (pkg === 'cli') {
            // 格式化编译后的文件
            const jsfiles = globSync(path.resolve(process.cwd(), `packages/${pkg}/dist/**/*.js`));
            const formattedFilePath = path.resolve(process.cwd(), `packages/${pkg}/index.ts`);
            const formatOptions = await prettier.resolveConfig(formattedFilePath);
            for (const filePath of jsfiles) {
                const text = readFileSync(filePath, 'utf-8');
                const formatted = await prettier.format(text, formatOptions);
                writeFileSync(filePath, formatted);
            }
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
        parsePackage.main = 'dist/index.cjs';
        parsePackage.module = 'dist/index.js';
        parsePackage.types = 'dist/types/index.d.ts';
        const matchFiles = globSync(path.resolve(process.cwd(), 'packages/utils/core/*.ts'));
        const exportsFiles = matchFiles.map((filePath) => filePath.split(`/packages/${pkgName}/core/`)[1].replace('.ts', ''));
        parsePackage.exports = {};
        for (const fileName of exportsFiles) {
            if (fileName === 'index') {
                parsePackage.exports['.'] = {
                    import: `./dist/${fileName}.js`,
                    require: `./dist/${fileName}.cjs`,
                    types: `./dist/types/${fileName}.d.ts`
                };
            }
            else {
                parsePackage.exports[`./${camel(fileName)}`] = {
                    import: `./dist/${fileName}.js`,
                    require: `./dist/${fileName}.cjs`,
                    types: `./dist/types/${fileName}.d.ts`
                };
            }
        }
        writeFileSync(pkgPath, JSON.stringify(parsePackage, null, 2));
        return {
            revert: () => {
                writeFileSync(pkgPath, storePackage);
            }
        };
    }
    catch (error) {
        consola.error(error);
    }
}
