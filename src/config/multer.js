import 'dotenv/config';

import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => { // função que retorna onde será salvo localmente as imagens
            cb(null, resolve(__dirname, '..', '..', 'public', 'uploads'));
        },
        filename: (req, file, cb) => { // função que retorna o nome do arquivo
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    }),
}

export default {
    dest: resolve(__dirname, '..', '..', 'public', 'uploads'),
    storage: storageTypes['local'],
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid File type.'));
        }
    }
};