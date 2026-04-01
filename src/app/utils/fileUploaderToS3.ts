// ─── fileUploader.ts ──────────────────────────────────────────────────────────

import multer from "multer";
import path from "path";
import sharp from "sharp";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";
import dotenv from "dotenv";
import config from "../config/index";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// ─── S3 CLIENT SETUP ──────────────────────────────────────────────────────────

const s3Client = new S3Client({
  region: config.aws.s3.region as string,
  credentials: {
    accessKeyId: config.aws.account.access_key as string,
    secretAccessKey: config.aws.account.secret_key as string,
  },
});

const BUCKET_NAME = config.aws.s3.bucket_name as string;
const AWS_REGION = config.aws.s3.region as string;

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface S3UploadResult {
  url: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
}

// ─── MEMORY STORAGE ───────────────────────────────────────────────────────────

const storage = multer.memoryStorage();

// ─── FILE FILTER (UNCHANGED ACCEPTANCE TYPES) ─────────────────────────────────

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/avif",
  "image/gif",
  "image/webp",
  "image/svg+xml",

  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "video/mp4",
  "video/mpeg",
  "video/quicktime",

  "audio/mpeg",
  "audio/wav",
];

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        httpStatus.BAD_REQUEST,
        `File type "${file.mimetype}" is not allowed.`
      )
    );
  }
};

// ─── MULTER INSTANCE ──────────────────────────────────────────────────────────

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
    fieldSize: 20 * 1024 * 1024,
    files: 10,
    fields: 50,
    parts: 60,
  },
  fileFilter,
});

// ─── FILE SIZE VALIDATION ─────────────────────────────────────────────────────

const validateFileSize = (file: Express.Multer.File) => {
  const videoMimes = ["video/mp4", "video/mpeg", "video/quicktime"];

  const maxSize = videoMimes.includes(file.mimetype)
    ? 100 * 1024 * 1024
    : 10 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `File "${file.originalname}" exceeds ${maxSize / (1024 * 1024)}MB limit`
    );
  }
};

// ─── FILE PROCESSOR (IMAGE OPTIMIZATION) ──────────────────────────────────────

const processFile = async (
  file: Express.Multer.File
): Promise<{ buffer: Buffer; mimetype: string; extension: string }> => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!file.mimetype.startsWith("image/")) {
    return {
      buffer: file.buffer,
      mimetype: file.mimetype,
      extension: ext,
    };
  }

  try {
    const sharpInstance = sharp(file.buffer);

    if (file.size < 100 * 1024) {
      return {
        buffer: file.buffer,
        mimetype: file.mimetype,
        extension: ext,
      };
    }

    let buffer: Buffer;
    let mime = file.mimetype;
    let outExt = ext;

    switch (file.mimetype) {
      case "image/jpeg":
      case "image/jpg":
        buffer = await sharpInstance
          .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
        mime = "image/jpeg";
        outExt = ".jpg";
        break;

      case "image/png":
        buffer = await sharpInstance
          .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
          .png({ quality: 80, compressionLevel: 9 })
          .toBuffer();
        mime = "image/png";
        outExt = ".png";
        break;

      case "image/webp":
        buffer = await sharpInstance
          .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        mime = "image/webp";
        outExt = ".webp";
        break;

      case "image/gif":
        buffer = await sharpInstance
          .resize(800, 600, { fit: "inside", withoutEnlargement: true })
          .gif()
          .toBuffer();
        mime = "image/gif";
        outExt = ".gif";
        break;

      default:
        buffer = file.buffer;
    }

    return { buffer, mimetype: mime, extension: outExt };
  } catch {
    return {
      buffer: file.buffer,
      mimetype: file.mimetype,
      extension: ext,
    };
  }
};

// ─── FOLDER RESOLVER ──────────────────────────────────────────────────────────

const resolveFolder = (mimetype: string): string => {
  if (mimetype.startsWith("image/")) return "images";
  if (mimetype.startsWith("video/")) return "videos";
  if (mimetype.startsWith("audio/")) return "audio";
  if (mimetype === "application/pdf") return "pdf";
  return "documents";
};

// ─── SINGLE UPLOAD ────────────────────────────────────────────────────────────

export const uploadToS3 = async (
  file: Express.Multer.File,
  folder?: string
): Promise<S3UploadResult> => {
  validateFileSize(file);

  const processed = await processFile(file);

  const resolvedFolder = folder ?? resolveFolder(file.mimetype);

  const key = `${resolvedFolder}/${uuidv4()}${processed.extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: processed.buffer,
      ContentType: processed.mimetype,
      CacheControl: "public, max-age=31536000",
      ACL: "public-read",
    })
  );

  return {
    url: `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`,
    key,
    originalName: file.originalname,
    mimeType: processed.mimetype,
    size: processed.buffer.length,
  };
};

// ─── MULTIPLE UPLOAD (CONCURRENT SAFE) ────────────────────────────────────────

export const uploadManyToS3 = async (
  files: Express.Multer.File[],
  folder?: string
): Promise<S3UploadResult[]> => {
  if (!files?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No files provided.");
  }

  const MAX_CONCURRENT = 3;
  const results: S3UploadResult[] = [];

  try {
    for (let i = 0; i < files.length; i += MAX_CONCURRENT) {
      const batch = files.slice(i, i + MAX_CONCURRENT);

      const batchResults = await Promise.all(
        batch.map((file) => uploadToS3(file, folder))
      );

      results.push(...batchResults);
    }

    return results;
  } catch (error) {
    await cleanupUploadedFiles(results);
    throw error;
  }
};

// ─── DELETE FROM S3 ───────────────────────────────────────────────────────────

export const deleteFromS3 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
};

// ─── CLEANUP FAILED UPLOADS ───────────────────────────────────────────────────

const cleanupUploadedFiles = async (uploads: S3UploadResult[]) => {
  if (!uploads.length) return;

  await Promise.allSettled(
    uploads.map((u) => deleteFromS3(u.key).catch(() => null))
  );
};

// ─── REPLACE FILE ─────────────────────────────────────────────────────────────

export const replaceInS3 = async (
  newFile: Express.Multer.File,
  oldKey?: string | null,
  folder?: string
): Promise<S3UploadResult> => {
  const uploaded = await uploadToS3(newFile, folder);

  if (oldKey) {
    try {
      await deleteFromS3(oldKey);
    } catch {
      console.error(`Failed to delete old S3 file: ${oldKey}`);
    }
  }

  return uploaded;
};

// ─── EXPORT MULTER ────────────────────────────────────────────────────────────

export const fileUploader = {
  upload,
  single: (fieldName: string) => upload.single(fieldName),
  array: (fieldName: string, maxCount: number) =>
    upload.array(fieldName, maxCount),
  fields: (fields: multer.Field[]) => upload.fields(fields),
};