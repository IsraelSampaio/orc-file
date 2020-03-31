import Pdf2Pic from './Pdf2Pic'
import Tesseract from './Tesseract'
import path = require('path')
import fs = require('fs')
import rimraf = require('rimraf')

export default class Ocr {
    private tipoArquivo: string
    private arquivo:string
    private nomeArquivo:string
    public constructor (arquivo:string) {
      this.arquivo = arquivo
      this.tipoArquivo = arquivo.split('.')[1]
      this.nomeArquivo = arquivo.split('.')[0]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async geraArray ():Promise<any> {
      if (this.tipoArquivo === 'pdf') {
        let array = await this.geraImgs()
        return array
      } else if (this.tipoArquivo !== 'pdf' && this.tipoArquivo) {
        return [
          {
            path: path.join(process.env.CAMINHO_PASTA_DOC, `/${this.arquivo}`),
            page: 1
          }
        ]
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async geraImgs ():Promise<any> {
      let instancia = new Pdf2Pic(this.arquivo)
      let response = await instancia.converte()
      return response
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async build (array:any[]):Promise<any> {
      console.log(`PROCESSANDO ARQUIVO ${this.arquivo}`)
      let tesseract = new Tesseract(array)
      let response = await tesseract.getOcr()
      let msg = await this.saveTexto(response)
      console.log(msg)
      let msgRemove = await this.removePasta()
      console.log(msgRemove)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private saveTexto (texto:string):Promise<any> {
      return new Promise((resolve, reject):void => {
        fs.writeFile(path.join(process.env.CAMINHO_SALVAR_TXT, `/${this.nomeArquivo}.txt`), texto, function (err):void {
          if (err) reject(err)
          resolve('Arquivo salvo')
        })
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private removePasta ():Promise<any> {
      return new Promise((resolve):void => {
        rimraf(path.join(process.env.CAMINHO_PASTA_DOC, `/${this.nomeArquivo}`), function ():void {
          resolve('Limpando Pasta')
        })
      })
    }
}
