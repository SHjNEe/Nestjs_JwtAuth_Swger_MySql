import { Logger } from "@nestjs/common";
import { diskStorage } from "multer";

const fs = require('fs');

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeTypes: validMimeType[] = [
    'image/jpeg',
    'image/jpg',
    'image/png'
];

export const uploadImage = (folder: string)  => {
   return {
       storage: diskStorage({
           destination: './public/images/' + folder,
           filename: (req, file, cb) => {
               const fileName: string = Date.now() + "_time_" + file.originalname;
               cb(null, fileName);
           }
       }),
   }
}

export const removeFile = (fullFilePath: string):void => {
    try {
        fs.unlinkSync(fullFilePath);
    } catch (err) {
        Logger.log(err);        
    }
}
