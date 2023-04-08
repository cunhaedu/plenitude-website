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

  const { file, imageType, imageName } = req.body;
  const key = `${imageName}.${imageType.split('/')[1]}`;

  ibmCOS.putObject({
    Bucket: 'comunidade-plenitude-bucket',
    Key: key,
    Body: file,
  }).promise().then(() => {
    res.json({ url: `https://s3.us-south.cloud-object-storage.appdomain.cloud/comunidade-plenitude-bucket/${key}` });
  })
  .catch((e) => {
    console.error(`ERROR: ${e.code} - ${e.message}\n`);
    res.status(500).json(e);
  });
}
