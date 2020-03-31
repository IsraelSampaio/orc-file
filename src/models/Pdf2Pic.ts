import PDF2Picjs = require('pdf2pic')
import path = require('path')
import fs = require('fs')
import pdf = require('pdf-parse')

export default class PDF2Pic {
    private pdf: string;
    public constructor (pdf: string) {
      this.pdf = pdf
    }
    private caminhoOutput (): string {
      return path.join(process.env.CAMINHO_PASTA_DOC, this.pdf.split('.')[0])
    }

    private caminhoArquivo (): string {
      return path.join(process.env.CAMINHO_PASTA_DOC, this.pdf)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async converte (): Promise<any> {
      try {
        let converter = new PDF2Picjs({
          density: 150,
          savename: this.pdf.split('.')[0],
          savedir: this.caminhoOutput(),
          format: 'jpg',
          size: 2400
        })
        let numPages = await this.tamanhoScann()
        let response = await converter.convertBulk(this.caminhoArquivo(), numPages)
        return response
      } catch (e) {
        throw new Error(e)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async tamanhoScann ():Promise<any> {
      let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      let dataBuffer = fs.readFileSync(path.join(process.env.CAMINHO_PASTA_DOC, this.pdf))
      let response = await pdf(dataBuffer)
      if (response.numpages > process.env.NUM_PAGES_SCANN) return array
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      else return array.filter(value => value <= response.numpages)
    }
}
