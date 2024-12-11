import type { S3Handler } from 'aws-lambda';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Jimp, JimpMime } from "jimp";

const s3Client = new S3Client();
const THUMBNAIL_WIDTH = 100; // You can adjust this size
const THUMBNAIL_HEIGHT = 100;
const IMAGES_PREFIX = 'originals'
const THUMBNAIL_PREFIX = 'thumbs'

export const handler: S3Handler = async (event) => {

    try {
        const bucketName = event.Records[0].s3.bucket.name
        const objectKeys = event.Records.map((record) => record.s3.object.key);

        for (const key of objectKeys) {
            if (key.startsWith(THUMBNAIL_PREFIX)) {
                continue;
            }

            const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: key
            })

            const imageObject = await s3Client.send(getObjectCommand)

            if (!imageObject.Body) {
                throw new Error('No image data received from S3');
            }

            // Convert the image body to buffer
            const imageBuffer: Buffer = Buffer.from(await imageObject.Body.transformToByteArray())

            // Generate thumbnail
            const thumbnailBuffer = await resizeImage(imageBuffer, key);

            // remove the prefix from the key
            const keyWithoutPrefix = key.replace(`${IMAGES_PREFIX}/`, '');

            const thumbnailKey = `${THUMBNAIL_PREFIX}/${keyWithoutPrefix}`;

            // Upload the thumbnail to S3
            const putObjectCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: thumbnailKey,
                Body: thumbnailBuffer,
                ContentType: 'image/jpeg' // Adjust content type as needed
            });

            await s3Client.send(putObjectCommand)

            console.log(`Successfully created thumbnail for ${keyWithoutPrefix}`);

        }
    } catch (error) {
        console.error('Error processing image:', error);
    }
};

export async function resizeImage(imageBuffer: Buffer, key: string): Promise<Buffer> {
    const image = await Jimp.read(imageBuffer)
    const resized = await image.resize({ w: THUMBNAIL_WIDTH }).getBuffer(getMimeType(key));
    return resized;
}

function getMimeType(key: string) {
    const extension = key.split('.').pop();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return JimpMime.jpeg;
        case 'png':
            return JimpMime.png;
        case 'bmp':
            return JimpMime.bmp;
        case 'tiff':
            return JimpMime.tiff;
        case 'gif':
            return JimpMime.gif;
        default:
            throw new Error(`Unsupported image type: ${extension}`);
    }
}