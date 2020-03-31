import PDFImage from 'pdf-image'

import path = require('path');

export default class PdfToImage {
    private arquivo: string
    private PDFImage : PDFImage
    public constructor (arquivo: string) {
      this.arquivo = arquivo
      this.PDFImage = PDFImage.PDFImage
    }

    public extencaoArquivo (): string {
      return this.arquivo.split('.')[1]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async converteArquivo (): Promise<any[]> {
      try {
        let caminhoArquivo = path.join(process.env.CAMINHO_PASTA_DOC, this.arquivo)

        let pdfImage = new this.PDFImage(caminhoArquivo, {
          convertOptions: {
            '-resize': '600x600',
            '-quality': '75'
          }
        })
        let arrayImgs = await pdfImage.convertFile()
        return arrayImgs
      } catch (e) {
        throw new Error(e)
      }
    }
}
