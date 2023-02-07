
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NextCors from 'nextjs-cors'
import DeviceDetector from "device-detector-js"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 })
  
  if (req.method !== 'POST') {
    return res.status(400).json({ message: "Please make a POST request with the window.navigator.userAgent value." })
  }
  
  if (! req.body['agent']) {
    return res.status(400).json({message: "Please provide the user agent in a field called agent."})
  }
  const deviceDetector = new DeviceDetector()

  res.status(200).json(deviceDetector.parse(req.body['agent']))
}
