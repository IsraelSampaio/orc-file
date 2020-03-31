import Ocr from './models/Ocr'
import fs = require('fs')

require('dotenv').config()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
fs.readdir(process.env.CAMINHO_PASTA_DOC, async (_err, files): Promise<any> => {
  if (_err) {
    return console.log('Unable to scan directory: ' + _err)
  }
  const dataInicio = new Date()
  for (const file of files) {
    let instancia = new Ocr(file)
    let array = await instancia.geraArray()
    await instancia.build(array)
  }
  let diffMilissegundos = new Date() - dataInicio
  console.log(`${diffMilissegundos / 1000} segundos`)
})
