'use server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImageToCloudinary = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'clinica' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result!.secure_url);
            }
        );

        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};
