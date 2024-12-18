import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

type GetTestimonialsResponse = {
  id: string;
  name: string;
  description: string;
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

    const { testimonials } = await hygraph.request<{ testimonials: GetTestimonialsResponse[] }>(
      `query Testimonials {
        testimonials {
          id
          name
          description
        }
      }`,
    );

    res.json({ testimonials });
  } catch (error) {
    res.status(500).json(error);
  }
}
