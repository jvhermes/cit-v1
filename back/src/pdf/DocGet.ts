import { Request, Response } from "express";
import  {Dropbox}  from "dropbox";


export class DocRead {
    async read(req: Request, res: Response) {
        
        const id = req.query.id as string

        const dropbox = new Dropbox({
            accessToken: 'sl.Bl7qkAfpWVxh3sfqbvoStKin5MV-VamAjszzQTUVcj0CRZ8gJSuEiPauD2OgTiEpJbbnmnpxpYKBX_8vSjb8O9rLJg9lksZAZ2AkvqRmUy7R2UfJBgml-OhghPt-gkGM4_ZSSO20Ic2wVhSgREAz',
            clientId: '04bdubrihycqkob',
          });

        try {
     
        
            // Solicitar o download do arquivo do Dropbox
            const response = await dropbox.sharingCreateSharedLinkWithSettings({path: id });
            
            const sharedLink = response.result.url.replace('dl=0', 'raw=1');
            // Enviar o arquivo 
            res.redirect(sharedLink)
            
          } catch (error) {
            console.error('Erro ao baixar o documento:', error);
            res.status(500).json({ message: 'Erro ao baixar o documento.' });
          }
    
    }
}