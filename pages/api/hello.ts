import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' })
}

export default handler
