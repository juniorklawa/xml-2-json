import { Request, Response, Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import xml2js from 'xml2js';

const parser = new xml2js.Parser({ attrkey: 'ATTR' });

const converterRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

converterRouter.post(
  '/xml',
  upload.single('fatura'),
  (request: Request, response: Response) => {
    try {
      const xml_string = fs.readFileSync(
        `uploads/${request.file.filename}`,
        'utf8',
      );

      parser.parseString(xml_string, (error: string, result: any) => {
        if (error === null) {
          return response.status(201).json(result);
        }
        console.log(error);
      });
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
);

export default converterRouter;
