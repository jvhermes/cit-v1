import { Request, Response } from "express";
import  {Dropbox}  from "dropbox";

export class DocPost {
    async read(req: Request, res: Response) {
      
        const dropbox = new Dropbox({
            accessToken: 'sl.BmE-wY-LUsmcNi6gdDEvHnv5Cj1edoCh3AokfXya0ftCMh9fy6PawYHdSKUtjrWrhlm-2kMaRe7AwTWA1zCCoRMHI_BNXh_Zr4lKPQCsEjfYX_SYHSUY4NEnq7VVYaDJQxhrMSOG5CXGNB0VzqJ9',
            clientId: '04bdubrihycqkob',
          });

        const pdfFile = req.file

        if(!pdfFile){
            return res.status(400).json({ message: 'Nenhum arquivo PDF enviado.' });
        }

        const fileName = `/${Date.now()}-${pdfFile.originalname}`;

        dropbox
        .filesUpload({path:fileName,contents:pdfFile.buffer})
        .then(() => {
          res.json(fileName);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Erro ao enviar o arquivo para o Dropbox.' });
        });
    }

    
}