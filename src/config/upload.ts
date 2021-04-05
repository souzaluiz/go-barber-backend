import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { format } from 'date-fns';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(15).toString('hex');
      const fileExtension = path.extname(file.originalname);
      const fileTime = format(new Date(), 'MM_dd_yyyy');

      const filename = `${fileHash}_${fileTime}${fileExtension}`;

      return callback(null, filename);
    },
  }),
};
