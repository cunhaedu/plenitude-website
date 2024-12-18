import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

type GetChurchesResponse = {
  churches: Array<{
    id: string;
    slug: string;
    name: string;
    city: string;
    state: string;
    street: string;
    number: string;
    district: string;
    serviceTimes: string;
    cover: string;
    cityImageURL: string;
    description: string;
  }>
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

    const { churches } = await hygraph.request<{ churches: GetChurchesResponse[] }>(
      `query Churches {
        churches {
          id
          slug
          name
          city
          state
          street
          number
          district
          serviceTimes
          cover
          cityImageURL
          description
        }
      }`,
    );

    res.json({ churches });
  } catch (error) {
    res.status(500).json(error);
  }
}
