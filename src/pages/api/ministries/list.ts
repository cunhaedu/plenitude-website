import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

type GetMinistriesResponse = {
  ministries: {
    id: string;
    name: string;
    description: string;
    slug: string;
    cover: string;
    video: string;
    book: string;
    phrase: string;
    chapter: string;
    verseNumber: string;
    mainColor: string;
    leaderships: {
      id: string;
      slug: string;
      name: string;
      avatar: string;
    }[];
  }[];
};

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

    const { ministries } = await hygraph.request<{ ministries: GetMinistriesResponse[] }>(
      `query Ministries {
        ministries {
          id
          name
          description
          slug
          cover
          video
          book
          phrase
          chapter
          verseNumber
          mainColor
          leaderships {
            id
            slug
            name
            avatar
          }
        }
      }`,
    );

    res.json({ ministries });
  } catch (error) {
    res.status(500).json(error);
  }
}
