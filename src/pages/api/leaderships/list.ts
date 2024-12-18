import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

type GetLeadershipsResponse = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  instagram: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');

    return;
  }

  try {
    const url = String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL);
    const mutationToken = String(process.env.NEXT_HYGRAPH_MUTATION_API_ACCESS_TOKEN)

    const hygraph = new GraphQLClient(url, {
      headers: { "Authorization" : `Bearer ${mutationToken}` },
    });

    const { leaderships } = await hygraph.request<{ leaderships: GetLeadershipsResponse[] }>(
      `query Leaderships {
        leaderships {
          id
          name
          bio
          avatar
          role
          instagram
        }
      }`,
    );

    res.json({ leaderships });
  } catch (error) {
    res.status(500).json(error);
  }
}
