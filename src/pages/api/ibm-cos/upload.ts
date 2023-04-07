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

  const { file, type } = req.body;

  // try {
  //   const url = await ibmCOS.getSignedUrlPromise('putObject', {
  //     Bucket: 'comunidade-plenitude-bucket',
  //     Key: 'settings1.json',
  //     Expires: 60 * 5, // 5 minutes,
  //   });

  //   res.json({ url })
  // } catch (error) {
  //   res.status(500).json(error);
  // }

  ibmCOS.putObject({
    Bucket: 'comunidade-plenitude-bucket',
    Key: 'settings.json',
    Body: file,
    ContentType: type
  }).promise().then((response) => {
    console.log(`Item created! ==> ${JSON.stringify(response)}`);
    res.json({ message: 'ok' });
  })
  .catch((e) => {
      console.error(`ERROR: ${e.code} - ${e.message}\n`);
      res.status(500).json(e);
  });
}
