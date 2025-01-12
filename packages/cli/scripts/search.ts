import readline from 'readline'

export async function search() {
  // 创建readline接口实例
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // 提示用户输入搜索内容
  rl.question('请输入搜索内容: ', searchQuery => {
    // 根据用户输入执行搜索逻辑
    console.log(`搜索结果: ${searchQuery}`)

    // 关闭readline接口
    rl.close()
  })
}
