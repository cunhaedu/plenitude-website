import type { NextApiRequest, NextApiResponse } from 'next';
import * as jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const isEmailValid = email === String(process.env.AUTHENTICATION_EMAIL);

    const isPasswordValid = password === String(process.env.AUTHENTICATION_PASSWORD);

    if (isPasswordValid && isEmailValid) {
      const jwtSecret = String(process.env.JWT_SECRET)
      const jwtTokenExpiration = String(process.env.JWT_TOKEN_EXPIRATION)

      const token = jwt.sign({}, jwtSecret, {
        expiresIn: jwtTokenExpiration ?? '1d',
      });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Email or password is incorrect' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
