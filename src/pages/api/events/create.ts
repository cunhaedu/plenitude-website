import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');

    return;
  }

  try {
    const { title, link, cover, initialDate, endDate } = req.body;

    const url = String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL);
    const mutationToken = String(process.env.NEXT_HYGRAPH_MUTATION_API_ACCESS_TOKEN);

    const hygraph = new GraphQLClient(url, {
      headers: { "Authorization" : `Bearer ${mutationToken}` },
    });

    await hygraph.request(
      `mutation createAndPublishEvent($title: String!, $link: String!, $cover: String!, $initialDate: Date!, $endDate: Date!) {
        createEvent(data: {
          title: $title,
          link: $link,
          cover: $cover,
          initialDate: $initialDate,
          endDate: $endDate
        }) {
          id
        }

        publishEvent(where: { title: $title }) {
          title
        }
      }`,
      { title, link, cover, initialDate, endDate }
    );

    res.status(201).json({ message: 'created' });
  } catch (error) {
    res.status(500).json(error);
  }
}
