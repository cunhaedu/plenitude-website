import type { NextApiRequest, NextApiResponse } from 'next';
import { ibmCOS } from '@/lib/ibm-cos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');

    return;
  }

  const { imageName, prefix, imageType } = req.body;
  const key = `${prefix}_${imageName}`;

  const presignedUrl = await ibmCOS.getSignedUrlPromise('putObject', {
    Bucket: String(process.env.IBM_COS_BUCKET_NAME),
    Key: key,
    ContentType: imageType,
    ACL: 'public-read',
    Expires: 60 * 5, // 5 minutes
  });

  const url = `https://s3.us-south.cloud-object-storage.appdomain.cloud/comunidade-plenitude-bucket/${key}`

  res.json({ presignedUrl, url })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
