import chalk from 'chalk'

export function finalOutput(projectName: string) {
  console.log(
    `\n  Next, you can start the project like this: \n\n` +
      chalk.gray(
        `  ${`$ cd ${projectName}`}\n` + `  ${'$ pnpm install'}\n` + `  ${'$ pnpm dev'}\n`,
      ),
  )
}

export function genSpace(num: number) {
  let str = ''
  while (num-- > 0) {
    str += ' '
  }
  return str
}
