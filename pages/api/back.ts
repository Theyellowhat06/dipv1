import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: any,res: any) {
    if(req.method == 'GET'){
        res.status(200).json({ method: 'GET' })
    }else if(req.method == 'POST'){
        res.status(200).json({ method: 'POST' })
    }
    
  }