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
    const { name, description } = req.body;
    const url = String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL);
    const mutationToken = String(process.env.NEXT_HYGRAPH_MUTATION_API_ACCESS_TOKEN);

    const hygraph = new GraphQLClient(url, {
      headers: { "Authorization" : `Bearer ${mutationToken}` },
    });

    const { createTestimonial } = await hygraph.request(
      `mutation createTestimonial($name: String!, $description: String!) {
        createTestimonial(data: { name: $name, description: $description }) {
          id
        }
      }`,
      { name, description }
    );

    await hygraph.request(
      `mutation publishTestimonial($id: ID!) {
        publishTestimonial(where: { id: $id }) {
          id
        }
      }`,
      { id: createTestimonial.id }
    );

    res.status(201).json({ message: 'created' });
  } catch (error) {
    res.status(500).json(error);
  }
}
