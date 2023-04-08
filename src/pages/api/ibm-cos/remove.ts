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

  const { key } = req.body;

  console.log(key);

  ibmCOS.deleteObject({
    Bucket: 'comunidade-plenitude-bucket',
    Key: key,
  }).promise().then(() => {
    res.json({ message: 'objeto removido' });
  })
  .catch((e) => {
    console.error(`ERROR: ${e.code} - ${e.message}\n`);
    res.status(500).json(e);
  });
}
