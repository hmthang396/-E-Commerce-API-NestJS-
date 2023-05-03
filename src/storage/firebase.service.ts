import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

export class FirebaseService {
    private readonly bucket: Bucket;

    constructor() {
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: `gs://nestjs-5ffc0.appspot.com`,
        });
        this.bucket = admin.storage().bucket();
    }

    async upload(files: Express.Multer.File[]) {
        return await Promise.allSettled(
            files.map(async (file) => {
                const filepath = `${Date.now()}-${file.originalname}`;
                const fileRef = this.bucket.file(filepath);
                const metadata = {
                    contentType: file.mimetype,
                    metadata: {
                        originalname: file.originalname,
                    },
                };
                await fileRef.save(file.buffer, { metadata });
                const url = await fileRef.getSignedUrl({
                    action: 'read', expires: "03-17-2025"
                });
                return { url, originalname: file.originalname };
            })
        );
    }
}