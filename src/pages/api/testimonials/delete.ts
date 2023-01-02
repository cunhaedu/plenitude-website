import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    try {
      const hygraph = new GraphQLClient(
        String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL),
        {
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_ACCESS_TOKEN}`,
          },
        }
      );
    } catch (error) {
      res.status(500)
    }
  }
  else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
