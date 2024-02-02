declare namespace Express{
    export interface Request{
        usuario_id: string;
        file:Express.Multer.File;
    }
}