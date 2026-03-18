
import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Multer storage configuration - Keep local storage temporarily for Cloudinary upload
const uploadPath = path.join(process.cwd(), 'public', 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB file size limit
    fieldSize: 20 * 1024 * 1024, // 20MB field size limit
    files: 10, // Maximum 10 files per request
    fields: 50, // Maximum 50 fields per request
    parts: 60, // Maximum 60 parts (files + fields)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'audio/mpeg',
      'audio/wav',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`));
    }
  },
});

// Export file uploader methods
export const fileUploader = {
  upload,
  single: (fieldName: string) => upload.single(fieldName),
  array: (fieldName: string, maxCount: number) => upload.array(fieldName, maxCount),
  fields: (fields: multer.Field[]) => upload.fields(fields),
};