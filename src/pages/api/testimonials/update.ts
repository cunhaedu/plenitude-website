import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('Method not allowed');

    return;
  }

  try {
    const { id, description, name } = req.body;
    const url = String(process.env.NEXT_PUBLIC_HYGRAPH_API_URL);
    const mutationToken = String(process.env.NEXT_HYGRAPH_MUTATION_API_ACCESS_TOKEN)

    const hygraph = new GraphQLClient(url, {
      headers: { "Authorization" : `Bearer ${mutationToken}` },
    });

    await hygraph.request(
      `mutation updateTestimonial($id: ID!, $name: String!, $description: String!) {
        updateTestimonial(where: { id: $id}, data: { name: $name, description: $description }) {
          id
        }
      }`,
      { id, name, description }
    );

    await hygraph.request(
      `mutation publishTestimonial($id: ID!) {
        publishTestimonial(where: { id: $id }) {
          id
        }
      }`,
      { id }
    );

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    res.status(500).json(error);
  }
}
