import Tesseractjs from 'tesseract.js'
import path = require('path')

export default class Tesseract {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private arquivos: any[]
    private texto:string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor (arquivos:any[]) {
      this.arquivos = arquivos
      Tesseractjs.create({
        langPath: path.join(__dirname, '/../config/lang')
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getOcr (): Promise<any> {
      for (const value of this.arquivos) {
        console.log(`PROCESSANDO A PAGINA ${value.page}`)
        const response = await Tesseractjs.recognize(value.path, { lang: 'por' }).progress(function (p):void {
          console.log('progress', (parseFloat(p.progress) * 100).toFixed(0) + '%')
        })
        this.texto += response.text
        console.log(`PAGINA ${value.page} FINALIZADA`)
      }
      return this.texto
    }
}
