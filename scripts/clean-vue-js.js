import { readdir, unlink } from 'node:fs/promises'
import { join } from 'node:path'

async function cleanVueJsFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        await cleanVueJsFiles(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.vue.js')) {
        await unlink(fullPath)
        console.log(`Removido: ${fullPath}`)
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Erro ao limpar ${dir}:`, error.message)
    }
  }
}

const srcDir = join(process.cwd(), 'src')
cleanVueJsFiles(srcDir)
  .then(() => {
    console.log('Limpeza concluída!')
  })
  .catch((error) => {
    console.error('Erro durante a limpeza:', error)
    process.exit(1)
  })
