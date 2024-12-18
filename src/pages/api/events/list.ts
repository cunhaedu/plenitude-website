import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

type GetEventsResponse = {
  id: string;
  title: string;
  link: string;
  initialDate: string;
  endDate: string;
  cover: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method not allowed');

    return;
  }

  try {
    const url = String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL);
    const mutationToken = String(process.env.NEXT_HYGRAPH_MUTATION_API_ACCESS_TOKEN)

    const hygraph = new GraphQLClient(url, {
      headers: { "Authorization" : `Bearer ${mutationToken}` },
    });

    const { events } = await hygraph.request<{ events: GetEventsResponse[] }>(
      `query Events {
        events(orderBy: initialDate_DESC) {
          id
          title
          link
          initialDate
          endDate
          cover
        }
      }`,
    );

    res.json({ events });
  } catch (error) {
    res.status(500).json(error);
  }
}
