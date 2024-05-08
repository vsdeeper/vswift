import { Command } from 'commander';
import { parsePackage } from './utils/index.js';
import { buildTask, release, create } from './scripts/index.js';
const program = new Command();
program
    .name('vswift')
    .option('-v, --version', 'display version for vswift-build')
    .action((options) => {
    const { version } = options;
    if (version) {
        console.log(parsePackage('cli').version);
    }
});
program
    .command('build')
    .description('build, frame usage')
    .option('-p, --pkg <name>', 'package name to perform build, optional value: utils | components')
    .action((options) => {
    return buildTask(options);
});
program
    .command('release')
    .description('release, frame usage')
    .option('-p, --pkg <name>', 'package name to perform release, optional value: utils | components')
    .action((options) => {
    return release(options);
});
program
    .command('create')
    .description('create a project as needed')
    .action(() => {
    return create();
});
program.parse(process.argv);
