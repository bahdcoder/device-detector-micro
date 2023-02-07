// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DeviceDetector from "device-detector-js"
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method !== 'POST') {
    return res.status(400).json({ message: "Please make a POST request with the window.navigator.userAgent value." })
  }
  
  if (! req.body['agent']) {
    return res.status(400).json({message: "Please provide the user agent in a field called agent."})
  }
  const deviceDetector = new DeviceDetector()

  res.status(200).json(deviceDetector.parse(req.body['agent']))
}
